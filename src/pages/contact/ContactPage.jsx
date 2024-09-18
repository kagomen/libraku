import { Separator } from '@/components/shadcn-ui/separator'
import Heading from '@/components/elements/Heading'
import ContactForm from './components/ContactForm'

const ContactPage = () => {
  return (
    <div className="container py-12">
      <Heading>お問い合わせ</Heading>
      <p className="my-6 leading-loose">
        ご意見やご要望などがありましたら、下記のフォームよりお気軽にお問い合わせください。
      </p>
      <Separator className="my-8" />
      <ContactForm />
    </div>
  )
}

export default ContactPage
