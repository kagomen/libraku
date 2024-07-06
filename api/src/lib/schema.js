import { z } from 'zod'

export const schema = z.object({
	name: z
		.string()
		.min(1, { message: '名前を入力してください' })
		.max(60, { message: '最大60文字までです' })
		.trim()
		.transform((value) => value.normalize('NFKC')),
	email: z
		.string()
		.min(1, { message: 'メールアドレスを入力してください' })
		.email({ message: 'メールアドレスの形式で入力してください' })
		.max(254, { message: '最大254文字までです' })
		.trim(),
	body: z.string().min(1, { message: 'メッセージを入力してください' }).max(1000, { message: '最大1000文字までです' }),
})
