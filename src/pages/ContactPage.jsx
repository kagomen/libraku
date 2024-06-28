import Heading from "@/components/Heading"
import ResponsiveWrapper from "@/components/ResponsiveWrapper"
import ContactForm from "@/components/contact-form/ContactForm"

const ContactPage = () => {
  return (
    <ResponsiveWrapper>
      <Heading>お問い合わせ</Heading>
      <ContactForm />
    </ResponsiveWrapper>
  )
}

export default ContactPage
