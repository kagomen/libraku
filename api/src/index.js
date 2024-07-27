import { Hono } from 'hono'

import { corsMiddleware } from './middleware/cors'
import booksRouter from './routes/books'
import contactRouter from './routes/contact'
// import authRouter from './routes/auth'

const app = new Hono()

app.use('*', corsMiddleware)

app.get('/', (c) => {
	return c.redirect('https://libraku.pages.dev')
})

app.route('/search', booksRouter)
app.route('/book', booksRouter)
app.route('/', contactRouter)
// app.route('/auth', authRouter)

export default app
