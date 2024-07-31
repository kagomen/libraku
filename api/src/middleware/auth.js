import { getCookie, setCookie } from 'hono/cookie'

export async function sessionMiddleware(c, next) {
	const lucia = c.get('lucia')

	// クッキーからセッションIDを取得
	const sessionId = getCookie(c, lucia.sessionCookieName) ?? null

	// セッションIDがnullの場合
	if (!sessionId) {
		c.set('user', null)
		c.set('session', null)
		return next()
	}

	// セッションIDからセッション情報を検証
	const { session, user } = await lucia.validateSession(sessionId)
	if (session && session.fresh) {
		setCookie(c, lucia.createSessionCookie(session.id).serialize(), {
			append: true,
		})
	}
	if (!session) {
		setCookie(c, lucia.createBlankSessionCookie().serialize(), {
			append: true,
		})
	}
	c.set('user', user) // user = {email: 'test@gmail.com', id: 'vyfase84sdafljasod'} の形式
	c.set('session', session)
	return next()
}
