import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { setCookie } from 'hono/cookie'
import { signInSchema, signUpSchema } from '../lib/schema'
import { sessions, users } from '../db/schema'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcryptjs'
import { getLucia } from '../db/lucia'
import { generateId } from 'lucia'
import { csrf } from 'hono/csrf'
import { sessionMiddleware } from '../middleware/auth'

const router = new Hono()

// ユーザー情報の一覧取得
// router.get('/users', async (c) => {
// 	const db = drizzle(c.env.DB)
// 	const result = await db.select().from(users).all()
// 	return c.json(result)
// })

// セッション情報の一覧取得
// router.get('/sessions', async (c) => {
// 	const db = drizzle(c.env.DB)
// 	const result = await db.select().from(sessions).all()
// 	return c.json(result)
// })

// CSRF middleware
router.use('*', csrf())

// Lucia middleware
router.use('*', async (c, next) => {
	c.set('lucia', getLucia(c))
	await next()
})

// ログイン済みか確認する
router.post('/validateSession', sessionMiddleware, async (c) => {
	const user = c.get('user')
	return c.json({ userId: user?.id ?? null })
})

// ユーザー新規登録
router.post('/signup', zValidator('json', signUpSchema), async (c) => {
	const { email, password } = c.req.valid('json')
	const db = drizzle(c.env.DB)
	const lucia = c.get('lucia')

	// 登録済みユーザーをはじく
	const existingUser = await db.select().from(users).where(eq(users.email, email)).get()
	if (existingUser) {
		return c.json({ error: 'このメールアドレスは既に登録されています' }, 401)
	}

	let userId, session, sessionCookie

	try {
		userId = generateId(15)
		const hashedPassword = await bcrypt.hash(password, 8)

		// ユーザー情報をDBに保存
		await db.insert(users).values({
			id: userId,
			email,
			password: hashedPassword,
		})

		// セッションを作成
		session = await lucia.createSession(userId, {})
		sessionCookie = lucia.createSessionCookie(session.id)

		// クッキーを送信
		setCookie(c, sessionCookie.serialize())

		return c.json({ userId }, 200)
	} catch (e) {
		// エラー回復処理
		try {
			if (session) {
				// セッションは作成されたが、ユーザ登録に失敗した場合、セッションを削除
				console.error('DBエラー')
				await lucia.deleteSession(session.id)
			} else if (userId) {
				// ユーザ登録はされたが、セッション作成に失敗した場合、ユーザーを削除
				console.error('セッションエラー')
				await db.delete(users).where(eq(users.id, userId))
			}
			console.error(`ユーザー登録エラー: ${e}`)
			return c.json({ message: `ユーザ登録に失敗しました: ${e}` }, 500)
		} catch (recoveryError) {
			console.error(`エラー回復中エラー: ${recoveryError}`)
			return c.json({ message: 'エラー回復中に問題が発生しました' }, 500)
		}
	}
})

// ログイン
router.post('/signin', zValidator('json', signInSchema), async (c) => {
	const { email, password } = c.req.valid('json')
	const db = drizzle(c.env.DB)
	const lucia = c.get('lucia')

	const user = await db.select().from(users).where(eq(users.email, email)).get()

	if (!user) {
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

		return c.json({ message: 'ログインに成功しました' }, 200)
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
