import { z } from 'zod'

export const emailVerificationCodeSchema = z.object({
  code: z.string().min(1, { message: 'コードを入力してください' }).max(24, { message: '最大24文字までです' }).trim(),
})
