import { z } from 'zod'

export const changeEmailSchema = z
  .object({
    newEmail: z
      .string()
      .min(1, { message: 'メールアドレスを入力してください' })
      .email({ message: 'メールアドレスの形式で入力してください' })
      .max(254, { message: '最大254文字までです' })
      .trim(),
    newEmailForConfirmation: z.string().trim().min(1, { message: '確認のためメールアドレスを入力してください' }),
  })
  .refine((data) => data.newEmail === data.newEmailForConfirmation, {
    message: 'メールアドレスが一致しません',
    path: ['newEmailForConfirmation'],
  })
