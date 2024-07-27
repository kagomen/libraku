import { cors } from 'hono/cors'

export const corsMiddleware = cors({
	origin: (origin, c) => {
		if (origin == c.env.CLIENT_URL) {
			return origin
		} else if (origin == c.env.DEVELOP_CLIENT_URL) {
			return origin
		} else {
			return null
		}
	},
})
