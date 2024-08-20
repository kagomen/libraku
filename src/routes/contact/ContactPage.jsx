import { Separator } from '@/components/chadcn-ui/separator'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import ContactForm from '@/components/forms/ContactForm'
import Heading from '@/components/elements/Heading'

const ContactPage = () => {
  return (
    <div className="bg-background py-12">
      <ResponsiveWrapper>
        <Heading>お問い合わせ</Heading>
        <p className="my-6 leading-loose">
          ご意見やご要望などがありましたら、下記のフォームよりお気軽にお問い合わせください。
        </p>
        <Separator className="my-8" />
        <ContactForm />
      </ResponsiveWrapper>
    </div>
  )
}

export default ContactPage
