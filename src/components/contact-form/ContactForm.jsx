import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from "@/components/contact-form/schema"
import { SendHorizontal } from "lucide-react"
import { sendMail } from "@/lib/api"
import { useNavigate } from "react-router-dom"

const ContactForm = () => {
  const nav = useNavigate()

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      body: ''
    }
  })

  async function onSubmit(data) {
    await sendMail(data)
    // await new Promise(resolve => setTimeout(resolve, 1000))
    form.reset()
    nav('/contact/success')
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>名前</FormLabel>
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

        <Button className="w-full flex gap-2" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? '送信中...' : '送信する'}
          <SendHorizontal size="20" className="-translate-y-[0.8px]" />
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm