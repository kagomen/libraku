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
				email: attributes.email,
				cardNumber: attributes.cardNumber,
				emailVerified: attributes.email_verified,
			}
		},
	})

	return lucia
}

// Luciaインスタンスを取得するためのヘルパー関数
export function getLucia(c) {
	if (c.lucia) return c.lucia

	// cronJob()からもgetLucia()を参照できるようにするため、OR演算子を使っている
	const env = c.env || c
	const lucia = initializeLucia(env)

	return lucia
}
