import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(
	cors({
		origin: 'https://libraku.pages.dev'
	})
)

app.get('/search/:keyword', async (c) => {
	try {
		const keyword = c.req.param('keyword')
		const url = `${c.env.API_URL}?format=json&keyword=${keyword}&booksGenreId=000&applicationId=${c.env.APP_ID}`
		const response = await fetch(url)
		const data = await response.json()
		return c.json(data)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

export default app
