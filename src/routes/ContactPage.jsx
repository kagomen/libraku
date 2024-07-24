import { Separator } from '@/components/ui/separator'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import ContactForm from '@/components/contact-form/ContactForm'
import Heading from '@/components/Heading'

const ContactPage = () => {
  return (
    <div className="bg-background py-10">
      <ResponsiveWrapper>
        <Heading>お問い合わせ</Heading>
        <p className="my-6 text-sm leading-relaxed">
          ご意見やご要望などがありましたら、下記のフォームよりお気軽にお問い合わせください。
        </p>
        <Separator className="my-8" />
        <ContactForm />
      </ResponsiveWrapper>
    </div>
  )
}

export default ContactPage
