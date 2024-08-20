import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { emailVerificationCodeSchema, signInSchema, signUpSchema } from '../utils/formValidationSchema'
import { users } from '../db/tableSchema'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcryptjs'
import { generateIdFromEntropySize } from 'lucia'
import { csrf } from 'hono/csrf'
import { sessionMiddleware } from '../middleware/auth'
import { luciaMiddleware } from '../middleware/lucia'
import {
	generateEmailVerificationCode,
	sendVerificationCode,
	verifyVerificationCode,
} from '../utils/verificationHelpers'

const router = new Hono()

// CSRF middleware
router.use('*', csrf())

// Lucia middleware
router.use('*', luciaMiddleware)

// ログイン済みか確認する
router.post('/validateSession', sessionMiddleware, async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user || !user.emailVerified) {
		return c.json({ userId: null, cardNumber: null })
	}
	const { email, cardNumber } = await db.select().from(users).where(eq(users.id, user.id)).get()
	return c.json({ userId: user?.id ?? null, email: email ?? null, cardNumber: cardNumber ?? null })
})

// ユーザー新規登録
router.post('/signup', zValidator('json', signUpSchema), async (c) => {
	const { email, password } = c.req.valid('json')
	const db = drizzle(c.env.DB)
	const lucia = c.get('lucia')

	const existingUser = await db.select().from(users).where(eq(users.email, email)).get()

	// 登録済みかつコード検証済みのユーザーをはじく
	if (existingUser?.emailVerified) {
		return c.json({ error: 'このメールアドレスは既に登録されています' }, 401)
	}

	let userId

	// 未登録ユーザーの情報をDBに保存
	if (!existingUser) {
		userId = generateIdFromEntropySize(10)
		const hashedPassword = await bcrypt.hash(password, 8)

		await db.insert(users).values({
			id: userId,
			email,
			password: hashedPassword,
			emailVerified: false,
		})
	} else {
		// 登録済みかつコード未検証のユーザー
		userId = existingUser.id
	}

	// 検証コードを生成
	const verificationCode = await generateEmailVerificationCode(userId, email, db)

	if (!verificationCode) {
		return c.json({ error: '検証コードを作成できませんでした' }, 500)
	}

	// 検証コードをメールで送信
	await sendVerificationCode(email, verificationCode, c)

	// セッションを作成
	const session = await lucia.createSession(userId, {})
	const sessionCookie = lucia.createSessionCookie(session.id)

	// クッキーを送信
	setCookie(c, sessionCookie.serialize())

	return c.json({ message: '確認用メールを送信しました' }, 200)
})

// 検証コードの確認
router.post('/email-verification', sessionMiddleware, zValidator('json', emailVerificationCodeSchema), async (c) => {
	const db = drizzle(c.env.DB)
	const lucia = c.get('lucia')
	const user = c.get('user')

	const { code } = c.req.valid('json')

	if (!user) {
		return c.json({ error: '不正なリクエストです' }, 400)
	}

	const { validCode } = await verifyVerificationCode(user, code, db)

	if (!validCode) {
		return c.json({ error: 'コードが間違っています' }, 400)
	}

	await lucia.invalidateUserSessions(user.id)
	await db.update(users).set({ emailVerified: true }).where(eq(users.id, user.id))

	// セッションを作成
	const session = await lucia.createSession(user.id, {})
	// セッションクッキーを作成・送信
	const sessionCookie = lucia.createSessionCookie(session.id)
	setCookie(c, sessionCookie.serialize())

	return c.json({ userId: user?.id ?? null, message: 'ユーザー登録が完了しました' }, 200)
})

// ログイン
router.post('/signin', zValidator('json', signInSchema), async (c) => {
	const { email, password } = c.req.valid('json')
	const db = drizzle(c.env.DB)
	const lucia = c.get('lucia')

	const user = await db.select().from(users).where(eq(users.email, email)).get()

	if (!user || !user.emailVerified) {
		return c.json({ error: 'ログインに失敗しました' }, 401)
	}

	const isPasswordValid = await bcrypt.compare(password, user.password)

	if (!isPasswordValid) {
		return c.json({ error: 'ログインに失敗しました' }, 401)
	}

	try {
		// セッションを作成
		const session = await lucia.createSession(user.id, {})

		// セッションクッキーを作成・送信
		const sessionCookie = lucia.createSessionCookie(session.id)
		setCookie(c, sessionCookie.serialize())

		return c.json({ userId: user?.id ?? null }, 200)
	} catch (e) {
		console.error(`ログアウトエラー: ${e}`)
		return c.json({ message: 'ログインに失敗しました' }, 500)
	}
})

// ログアウト
router.post('/signout', sessionMiddleware, async (c) => {
	const lucia = c.get('lucia')
	const session = c.get('session')

	try {
		// セッションを無効にする
		await lucia.invalidateSession(session.id)

		// セッションクッキーを削除する
		const sessionCookie = lucia.createBlankSessionCookie()
		setCookie(c, sessionCookie.serialize())

		return c.json({ message: 'ログアウトに成功しました' }, 200)
	} catch (e) {
		console.error(`ログアウトエラー: ${e}`)
		return c.json({ message: 'ログアウトに失敗しました' }, 500)
	}
})

export default router
