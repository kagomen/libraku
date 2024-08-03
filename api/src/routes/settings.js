import { Hono } from 'hono'
import { luciaMiddleware } from '../middleware/lucia'
import { sessionMiddleware } from '../middleware/auth'
import { drizzle } from 'drizzle-orm/d1'
import { zValidator } from '@hono/zod-validator'
import { cardNumberSchema } from '../lib/schema'
import { cardNumbers } from '../db/schema'
import { v4 as uuidv4 } from 'uuid'
import { and, eq } from 'drizzle-orm'

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
		.from(cardNumbers)
		.where(and(eq(cardNumbers.userId, user.id)))
		.get()

	console.log(cardNumber)
	return c.json({ cardNumber })
})

// 利用者番号の登録
router.post('/cardNumber', zValidator('json', cardNumberSchema), async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const { cardNumber } = c.req.valid('json')

	// 登録済みか確認
	const existingCardNumber = await db
		.select()
		.from(cardNumbers)
		.where(and(eq(cardNumbers.userId, user.id)))
		.get()

	if (existingCardNumber) {
		return c.json({ error: 'すでに登録されています。変更を希望する場合は変更手続きを行なってください。' }, 400)
	}

	await db.insert(cardNumbers).values({
		id: uuidv4(),
		userId: user.id,
		cardNumber,
	})

	return c.json({ message: '利用者番号を登録しました' }, 201)
})

// 利用者番号の変更
router.put('/cardNumber', zValidator('json', cardNumberSchema), async (c) => {
	const db = drizzle(c.env.DB)
	const user = c.get('user')

	if (!user) {
		return c.json({ error: '認証が必要です' }, 401)
	}

	const { cardNumber } = c.req.valid('json')

	// 登録済みか確認
	const existingCardNumber = await db
		.select()
		.from(cardNumbers)
		.where(and(eq(cardNumbers.userId, user.id)))
		.get()

	if (!existingCardNumber) {
		return c.json({ error: '登録されている利用者番号が見つかりません' }, 404)
	}

	const result = await db.update(cardNumbers).set({ cardNumber }).where(eq(cardNumbers.userId, user.id))

	if (result.changes == 0) {
		return c.json({ error: '利用者番号の更新に失敗しました' }, 500)
	}

	return c.json({ message: '利用者番号を変更しました' }, 201)
})

export default router
