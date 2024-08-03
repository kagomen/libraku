import { Hono } from 'hono'

import { corsMiddleware } from './middleware/cors'
import booksRouter from './routes/books'
import contactRouter from './routes/contact'
import authRouter from './routes/auth'
import favoritesRouter from './routes/favorites'
import settingsRouter from './routes/settings'

const app = new Hono().basePath('/api')

app.use('*', corsMiddleware)

app.get('/', (c) => {
	return c.redirect('https://libraku.pages.dev')
})

app.route('/search', booksRouter)
app.route('/book', booksRouter)
app.route('/', contactRouter)
app.route('/auth', authRouter)
app.route('/favorites', favoritesRouter)
app.route('/settings', settingsRouter)

export default app
