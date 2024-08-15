import { Hono } from 'hono'
import { luciaMiddleware } from '../middleware/lucia'
import { sessionMiddleware } from '../middleware/auth'
import { drizzle } from 'drizzle-orm/d1'
import { zValidator } from '@hono/zod-validator'
import { cardNumberSchema, changePasswordSchema } from '../lib/schema'
import { users } from '../db/schema'
import { and, eq } from 'drizzle-orm'
import * as bcrypt from 'bcryptjs'

const router = new Hono()

router.use('*', luciaMiddleware)

router.use('*', sessionMiddleware)

// 利用者番号の取得
router.get('/cardNumber', async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const { cardNumber } = await db
		.select()
		.from(users)
		.where(and(eq(users.id, user.id)))
		.get()

	return c.json({ cardNumber: cardNumber ?? null })
})

// 利用者番号の新規登録
router.post('/cardNumber', zValidator('json', cardNumberSchema), async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const { cardNumber } = c.req.valid('json')

	try {
		// 既存のカード番号をチェック
		const existingUser = await db.select().from(users).where(eq(users.id, user.id)).get()

		if (existingUser && existingUser.cardNumber) {
			return c.json({ error: 'すでに利用者番号が登録されています' }, 400)
		}

		// 新規登録
		const result = await db.update(users).set({ cardNumber }).where(eq(users.id, user.id))

		if (result.length == 0) {
			return c.json({ error: '利用者番号の登録に失敗しました' }, 500)
		}

		return c.json({ message: '利用者番号を登録しました' }, 201)
	} catch (e) {
		console.error('利用者番号の登録中にエラーが発生しました', e.message)
		return c.json({ error: '利用者番号の登録中にエラーが発生しました' }, 500)
	}
})

// 利用者番号の変更
router.put('/cardNumber', zValidator('json', cardNumberSchema), async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const { cardNumber } = c.req.valid('json')

	try {
		// 既存の利用者番号をチェック
		const existingUser = await db.select().from(users).where(eq(users.id, user.id)).get()

		if (!existingUser || !existingUser.cardNumber) {
			return c.json({ error: '利用者番号が登録されていません。新規登録を行ってください。' }, 400)
		}

		// 更新
		const result = await db.update(users).set({ cardNumber }).where(eq(users.id, user.id))

		if (result.length === 0) {
			return c.json({ error: '利用者番号の更新に失敗しました' }, 500)
		}

		return c.json({ message: '利用者番号を更新しました' }, 200)
	} catch (e) {
		console.error('利用者番号の更新中にエラーが発生しました', e.message)
		return c.json({ error: '利用者番号の更新中にエラーが発生しました' }, 500)
	}
})

// パスワードの変更
router.put('/password', zValidator('json', changePasswordSchema), async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const existingUser = await db.select().from(users).where(eq(users.id, user.id)).get()

	const { password, newPassword } = c.req.valid('json')

	const isPasswordValid = await bcrypt.compare(password, existingUser.password)
	if (!isPasswordValid) {
		return c.json({ error: 'パスワードが間違っています' }, 401)
	}

	const hashedPassword = await bcrypt.hash(newPassword, 8)

	try {
		// 更新
		const result = await db.update(users).set({ password: hashedPassword }).where(eq(users.id, user.id))

		if (result.length === 0) {
			return c.json({ error: 'パスワードの変更に失敗しました' }, 500)
		}

		return c.json({ message: 'パスワードを変更しました' }, 200)
	} catch (e) {
		console.error('パスワードの変更中にエラーが発生しました', e.message)
		return c.json({ error: 'パスワードの変更中にエラーが発生しました' }, 500)
	}
})

// メールアドレスの変更（検証コードの送信）
// router.post('/request-email-change', zValidator('json', changeEmailSchema), async (c) => {
// 	const db = drizzle(c.env.DB)
// 	const user = c.get('user')

// 	if (!user) {
// 		return c.json({ error: '認証が必要です' }, 401)
// 	}

// 	const { newEmail } = c.req.valid('json')

// 	const existingUser = await db.select().from(users).where(eq(users.id, user.id)).get()

//   if (newEmail == existingUser.email) {
// 			return c.json({ error: '現在のメールアドレスと異なるメールアドレスを入力してください' }, 400)
// 		}

// 	// 検証コードを生成
// 	// const verificationCode = await generateVerificationCode(session.user.userId, newEmail)
// 	await db.delete(emailVerificationCodes).where(eq(emailVerificationCodes.userId, user.id))

// 	// 新しいコードを生成
// 	const code = generateRandomString(8, alphabet('0-9'))

// 	await db
// 		.update(emailVerificationCodes)
// 		.set({ userId: user.id, expiresAt: createDate(new TimeSpan(15, 'm')) })
// 		.where(eq(users.id, user.id))

// 	await db.insert(emailVerificationCodes).values({
// 		userId: user.id,
// 		email: newEmail,
// 		code,
// 		expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
// 	})

// 	// メールを送信
//   await sendVerificationEmail(newEmail, verificationCode)

// 	return c.json({ message: '確認メールを送信しました' }, 200)
// })

// メールアドレスの変更（検証コードの確認）
// router.post('/confirm-email-change', async(c)=> {
// 	const db = drizzle(c.env.DB)
// 	const user = c.get('user')

// 	if (!user) {
// 		return c.json({ error: '認証が必要です' }, 401)
// 	}

// 	const { code, newEmail } = await c.req.json()

// 	const isValid = await verifyCode(user.id, code, newEmail)
// 	if (!isValid) {
// 		return c.json({ error: 'コードが間違っています' }, 401)
// 	}

// 	// メールアドレスの更新
// 	await db.update(users).set({ email: newEmail }).where(eq(users.id, user.id))

// 	// 全てのセッションを無効化

// 	// 新しいセッションを作成

// })

export default router
