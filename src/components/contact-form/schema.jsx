import { z } from "zod"

export const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "名前は二文字以上で入力してください",
    }),
  email: z
    .string()
    .min(1, {
      message: "入力は必須です"
    })
    .email({
      message: "不正な形式です"
    }),
  body: z
    .string()
    .min(1, {
      message: "入力は必須です"
    })
})