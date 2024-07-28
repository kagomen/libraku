import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { signUpSchema } from '../lib/schema'
import { drizzle } from 'drizzle-orm/d1'
import { users } from '../db/schema'

const router = new Hono()

// ユーザー情報の一覧取得
router.get('/users', async (c) => {
	const db = drizzle(c.env.DB)
	const result = await db.select().from(users).all()
	return c.json(result)
})

// ユーザー新規登録
router.post('/signup', zValidator('json', signUpSchema), async (c) => {
	const { email, password } = c.req.valid('json')
	const db = drizzle(c.env.DB)
	const result = await db.insert(users).values({
		email,
		password,
	})
	return c.json(result)
})

// ログイン

// ログアウト

export default router
