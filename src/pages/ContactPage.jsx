import Heading from "@/components/Heading"
import ResponsiveWrapper from "@/components/ResponsiveWrapper"
import ContactForm from "@/components/contact-form/ContactForm"
import { Mail } from "lucide-react"

const ContactPage = () => {
  return (
    <ResponsiveWrapper>
      <Heading>
        <Mail size="22" className="-translate-y-[0.8px]" />
        お問い合わせ
      </Heading>
      <ContactForm />
    </ResponsiveWrapper>
  )
}

export default ContactPage
