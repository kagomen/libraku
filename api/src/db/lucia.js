import { Lucia } from 'lucia'
import { D1Adapter } from '@lucia-auth/adapter-sqlite'

// Luciaの初期化関数
export function initializeLucia(env) {
	const adapter = new D1Adapter(env.DB, {
		user: 'users',
		session: 'sessions',
	})

	const lucia = new Lucia(adapter, {
		sessionCookie: {
			attributes: {
				secure: true, // localhostでもこれで動く
				sameSite: 'strict',
			},
		},
		getUserAttributes: (attributes) => {
			return {
				email: attributes.email, // アプリ内で使用できるユーザ情報をemailとcardNumberのみに限定
				cardNumber: attributes.cardNumber,
			}
		},
	})

	return lucia
}

// Luciaインスタンスを取得するためのヘルパー関数
export function getLucia(c) {
	if (!c.lucia) {
		c.lucia = initializeLucia(c.env)
	}
	return c.lucia
}
