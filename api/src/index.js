import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Resend } from 'resend'
import { schema } from './lib/schema'

const app = new Hono()

app.use(
	cors({
		origin: (origin, c) => {
			if (origin == c.env.CLIENT_URL) {
				return origin
			} else if (origin == c.env.DEVELOP_CLIENT_URL) {
				return origin
			} else {
				return null
			}
		},
	}),
)

app.get('/', (c) => {
	return c.text('📚 リブラクのURLはこちらです -> https://libraku.pages.dev')
})

app.get('/search/:keyword/:page', async (c) => {
	try {
		const keyword = c.req.param('keyword')
		const page = c.req.param('page')
		const url = `${c.env.API_URL}?format=json&keyword=${keyword}&booksGenreId=000&page=${page}&applicationId=${c.env.APP_ID}`
		const response = await fetch(url)
		const data = await response.json()

		const set = new Set()
		const filteredBooks = data.Items.filter((item) => {
			// trueの場合のみ、filteredBooksにitemが挿入される
			const isbn = item.Item.isbn
			if (isbn && !set.has(isbn)) {
				// isbnが存在かつisbnが重複しない場合にtrueを返す
				set.add(isbn)
				return true
			}
			return false
		})

		const filteredData = {
			...data,
			Items: filteredBooks,
		}

		return c.json(filteredData)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

app.get('/book/:isbn', async (c) => {
	try {
		const isbn = c.req.param('isbn')
		const url = `${c.env.API_URL}?format=json&isbnjan=${isbn}&applicationId=${c.env.APP_ID}`
		const response = await fetch(url)
		const data = await response.json()
		return c.json(data)
	} catch (e) {
		return c.json({ error: `Error: ${e.message}` }, 500)
	}
})

app.post('/turnstile', async (c) => {
	const { token } = await c.req.json()

	const formData = new FormData()
	formData.append('secret', c.env.TURNSTILE_SECRET_KEY)
	formData.append('response', token)

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	})

	const outcome = await result.json()

	return c.json(outcome)
})

app.post('/send-email', zValidator('json', schema), async (c) => {
	const resend = new Resend(c.env.RESEND_API_KEY)

	const { name, email, body } = c.req.valid('json')

	const res = await resend.emails.send({
		from: `リブラク <${c.env.MY_EMAIL_ADDRESS}>`,
		to: c.env.MY_EMAIL_ADDRESS,
		subject: `リブラクからお問い合わせが届きました`,
		html: `
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>お問い合わせ内容:</strong> ${body}</p>
      `,
	})

	return c.json(res)
})

export default {
	async fetch(request, env, ctx) {
		return app.fetch(request, env, ctx)
	},
}
