import { z } from 'zod'

export const changePasswordSchema = z
  .object({
    password: z
      .string()
      .trim()
      .min(1, { message: 'パスワードを入力してください' })
      .min(8, { message: '8文字以上で入力してください' })
      .max(64, { message: '最大64文字までです' }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: 'パスワードを入力してください' })
      .min(8, { message: '8文字以上で入力してください' })
      .max(64, { message: '最大64文字までです' }),
    newPasswordForConfirmation: z.string().trim().min(1, { message: '確認のためパスワードを入力してください' }),
  })
  .refine((data) => data.newPassword === data.newPasswordForConfirmation, {
    message: 'パスワードが一致しません',
    path: ['newPasswordForConfirmation'],
  })
