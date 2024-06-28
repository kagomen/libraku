import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from "@/components/contact-form/schema"
import { Send } from "lucide-react"
import { sendMail } from "@/lib/api"

const ContactForm = () => {

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      body: ''
    }
  })

  async function onSubmit(data) {
    console.log(data)
    await sendMail(data)
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <FormField
          name="name"
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
          送信する
          <Send size="16" className="-translate-y-[0.8px]" />
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm