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

export default router
