import { z } from 'zod'

export const contactSchema = z.object({
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

export const signUpSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: 'メールアドレスを入力してください' })
			.email({ message: 'メールアドレスの形式で入力してください' })
			.max(254, { message: '最大254文字までです' })
			.trim(),
		password: z
			.string()
			.trim()
			.min(1, { message: 'パスワードを入力してください' })
			.min(8, { message: '8文字以上で入力してください' })
			.max(64, { message: '最大64文字までです' }),
		passwordForConfirmation: z.string().trim().min(1, { message: '確認のためパスワードを入力してください' }),
	})
	.refine((data) => data.password === data.passwordForConfirmation, {
		message: 'パスワードが一致しません',
		path: ['passwordForConfirmation'],
	})

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'メールアドレスを入力してください' })
		.email({ message: 'メールアドレスの形式で入力してください' })
		.max(254, { message: '最大254文字までです' })
		.trim(),
	password: z
		.string()
		.trim()
		.min(1, { message: 'パスワードを入力してください' })
		.min(8, { message: '8文字以上で入力してください' })
		.max(64, { message: '最大64文字までです' }),
})
