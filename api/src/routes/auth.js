import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { signInSchema, signUpSchema } from '../lib/schema'
import { sessions, users } from '../db/schema'
import { drizzle } from 'drizzle-orm/d1'
import { eq } from 'drizzle-orm'
import * as bcrypt from 'bcryptjs'

const router = new Hono()

// 暗号学的に安全な乱数を使用して生成されるユニークな識別子
function generateSessionId() {
	return crypto.randomUUID()
}

// ユーザー情報の一覧取得
router.get('/users', async (c) => {
	const db = drizzle(c.env.DB)
	const result = await db.select().from(users).all()
	return c.json(result)
})

// セッション情報の一覧取得
router.get('/sessions', async (c) => {
	const db = drizzle(c.env.DB)
	const result = await db.select().from(sessions).all()
	return c.json(result)
})

// ユーザー新規登録
router.post('/signup', zValidator('json', signUpSchema), async (c) => {
	const { email, password } = c.req.valid('json')
	const db = drizzle(c.env.DB)

	// 登録済みユーザーをはじく
	const existingUser = await db.select().from(users).where(eq(users.email, email)).get()
	if (existingUser) {
		return c.json({ error: 'このメールアドレスは既に登録されています' }, 401)
	}

	const hashedPassword = await bcrypt.hash(password, 10)
	const result = await db.insert(users).values({
		email,
		password: hashedPassword,
	})
	return c.json({
		id: result.id,
		email: email,
	})
})

// ログイン
router.post('/signin', zValidator('json', signInSchema), async (c) => {
	const { email, password } = c.req.valid('json')
	const db = drizzle(c.env.DB)

	const user = await db.select().from(users).where(eq(users.email, email)).get()

	if (!user) {
		return c.json({ error: 'ログインに失敗しました' }, 401)
	}

	const isPasswordValid = await bcrypt.compare(password, user.password)

	if (!isPasswordValid) {
		return c.json({ error: 'ログインに失敗しました' }, 401)
	}

	const sessionId = generateSessionId()
	const expiresAt = Math.floor(Date.now() / 1000) + 3600 // 1時間後

	await db.insert(sessions).values({
		id: sessionId,
		userId: user.id,
		expiresAt,
	})

	setCookie(c, 'session', sessionId, {
		httpOnly: true,
		path: '/',
		maxAge: 3600,
		sameSite: 'Strict',
	})

	return c.json({
		id: user.id,
		email: user.email,
	})
})

// ログアウト
router.post('/signout', async (c) => {
	const sessionId = getCookie(c, 'session')
	const db = drizzle(c.env.DB)

	if (sessionId) {
		await db.delete(sessions).where(eq(sessions.id, sessionId))
		deleteCookie(c, 'session')
	}

	return c.redirect('https://libraku.pages.dev')
})

export default router
