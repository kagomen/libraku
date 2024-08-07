import { z } from 'zod'

export const cardNumberSchema = z.object({
  cardNumber: z
    .string()
    .trim()
    .min(1, { message: '利用者番号を入力してください' })
    .max(24, { message: '最大24文字までです' }),
})
