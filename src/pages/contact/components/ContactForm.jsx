import { Button } from '@/components/chadcn-ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/chadcn-ui/form'
import { Input } from '@/components/chadcn-ui/input'
import { Textarea } from '@/components/chadcn-ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizontal } from 'lucide-react'
import { sendMail } from '@/api/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import ButtonIconWrapper from '@/components/elements/ButtonIconWrapper'
import { contactSchema } from '@/utils/formValidationSchema'

const ContactForm = () => {
  const nav = useNavigate()
  const [turnstileToken, setTurnstileToken] = useState()

  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      body: '',
    },
  })

  async function onSubmit(data) {
    try {
      await sendMail(data, turnstileToken)
      // メール送信せずに試す
      // await new Promise(resolve => setTimeout(resolve, 1000))
      form.reset()
      nav('/contact/success')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>お名前</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="body"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>お問い合わせ内容</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Turnstile
          siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
          onSuccess={setTurnstileToken}
          options={{ theme: 'light' }}
          className="mx-auto"
        />

        <Button className="relative w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? '送信中...' : '上記の内容で送信する'}
          <ButtonIconWrapper>
            <SendHorizontal size="20" className="-translate-y-[0.8px]" />
          </ButtonIconWrapper>
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
