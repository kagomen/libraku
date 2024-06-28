import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Resend } from 'resend'

const app = new Hono()

app.use(
	cors({
		origin: ['https://libraku.pages.dev'],
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

		const filteredBooks = data.Items.filter((item) => item.Item.isbn !== '')
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

app.post('/send-email', async (c) => {
	const resend = new Resend(c.env.RESEND_API_KEY);

	try {
		const { name, email, body } = await c.req.json()

		const { data, error } = await resend.emails.send({
			from: `リブラク <${c.env.MY_EMAIL_ADDRESS}>`,
			to: c.env.MY_EMAIL_ADDRESS,
			subject: `リブラクからお問い合わせが届きました`,
			html: `
        <p><strong>名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>お問い合わせ内容:</strong> ${body}</p>
      `,
		})

		return c.json({ data, error })
	} catch (error) {
		return c.json({ error: error.message }, 500)
	}
})

export default {
	async fetch(request, env, ctx) {
		return app.fetch(request, env, ctx)
	}
}
