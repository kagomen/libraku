import { drizzle } from 'drizzle-orm/d1'
import { sessions } from '../db/schema'
import { eq } from 'drizzle-orm'
import { deleteCookie, getCookie } from 'hono/cookie'

// セッション状態を確認し、非ログインユーザーはログインページにリダイレクトさせる
export async function requireAuthMiddleware(c, next) {
	const sessionId = getCookie(c, 'session')
	const db = drizzle(c.env.DB)

	if (!sessionId) {
		return c.redirect('https://libraku.pages.dev/sign-in')
	}

	const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get()

	if (!session || session.expiresAt < Math.floor(Date.now() / 1000)) {
		if (session) {
			await db.delete(sessions).where(eq(sessions.id, sessionId))
		}
		deleteCookie(c, 'session')
		return c.redirect('https://libraku.pages.dev/sign-in')
	}

	c.set('userId', session.userId)

	await next()
}

// ログインユーザーをホームにリダイレクトさせる
export async function redirectIfAuthenticatedMiddleware(c, next) {
	const sessionId = getCookie(c, 'session')
	const db = drizzle(c.env.DB)

	if (sessionId) {
		const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get()
		const now = Math.floor(Date.now() / 1000)

		if (session && session.expiresAt > now) {
			// ユーザーが認証済みの場合、ホームにリダイレクト
			return c.redirect('https://libraku.pages.dev/user-page')
		} else {
			// セッションが無効または期限切れの場合、クリーンアップ
			if (session) {
				await db.delete(sessions).where(eq(sessions.id, sessionId))
			}
			deleteCookie(c, 'session')
		}
	}

	// 認証されていない場合は次のミドルウェアまたはハンドラーに進む
	await next()
}

// セッション状態を確認するだけ
export async function setUserStateMiddleware(c, next) {
	const sessionId = getCookie(c, 'session')
	const db = drizzle(c.env.DB)

	if (sessionId) {
		const session = await db.select().from(sessions).where(eq(sessions.id, sessionId)).get()
		if (session && session.expiresAt > Math.floor(Date.now() / 1000)) {
			c.set('user', { userId: session.userId, isLoggedIn: true })
		} else {
			if (session) {
				await db.delete(sessions).where(eq(sessions.id, sessionId))
			}
			deleteCookie(c, 'session')
			c.set('user', { isLoggedIn: false })
		}
	} else {
		deleteCookie(c, 'session')
		c.set('user', { isLoggedIn: false })
	}
	await next()
}
