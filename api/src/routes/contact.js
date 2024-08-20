import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { Resend } from 'resend'
import { contactSchema } from '../lib/formValidationSchema'

const router = new Hono()

router.post('/turnstile', async (c) => {
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

router.post('/send-email', zValidator('json', contactSchema), async (c) => {
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

export default router
