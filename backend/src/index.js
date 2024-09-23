import { Hono } from 'hono'
import { corsMiddleware } from './middleware/cors'
import searchRouter from './routes/search'
import contactRouter from './routes/contact'
import authRouter from './routes/auth'
import favoritesRouter from './routes/favorites'
import settingsRouter from './routes/settings'
import { cronJob } from './utils/cronJob'

const app = new Hono().basePath('/api')

app.use('*', corsMiddleware)

app.get('/', (c) => {
	return c.redirect('https://libraku.pages.dev')
})

app.route('/search', searchRouter)
app.route('/book', searchRouter)
app.route('/', contactRouter)
app.route('/auth', authRouter)
app.route('/favorites', favoritesRouter)
app.route('/settings', settingsRouter)

async function scheduled(_event, env, ctx) {
	ctx.waitUntil(cronJob(env))
}

export default {
	fetch: app.fetch,
	scheduled: scheduled,
}
