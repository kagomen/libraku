import { cors } from 'hono/cors'

export const corsMiddleware = cors({
	origin: (_, c) => c.env.CLIENT_URL,
	credentials: true,
})
