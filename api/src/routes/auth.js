import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { signUpSchema } from '../lib/schema'

const router = new Hono()

router.post('/signup', zValidator('json', signUpSchema), async (c) => {
	const { email, password } = c.req.valid('json')
	console.log('email', email)
	console.log('password', password)
})

export default router
