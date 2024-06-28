import { Button } from "@/components/ui/button"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "@/components/contact-form/schema"
import Heading from "@/components/Heading"

const ContactPage = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      body: ''
    }
  })

  function Label(props) {
    return (
      <label htmlFor={props.htmlFor} className="text-sm">{props.children}</label>
    )
  }

  function Wrapper(props) {
    return (
      <div className="flex flex-col">{props.children}</div>
    )
  }

  return (
    <div className="mx-auto sm:w-[90%] lg:w-[60%]">
      <Heading>お問い合わせ</Heading>
      <form className="space-y-4">
        <div className="flex flex-col">
          <Label htmlFor="name">名前</Label>
          <input id="name" type="text" className="p-1" />
        </div>
        <Wrapper>
          <Label htmlFor="email">メールアドレス</Label>
          <input id="email" type="email" className="p-1" />
        </Wrapper>
        <div className="flex flex-col">
          <Label htmlFor="message">お問い合わせ内容</Label>
          <textarea id="message" className="p-1"></textarea>
        </div>
        <Button>送信</Button>
      </form>
      {/* <FormLabel>Username</FormLabel> */}
      <Input placeholder="shadcn" />
    </div>
  )
}

export default ContactPage
