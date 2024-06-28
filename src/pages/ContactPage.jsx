import { Separator } from "@/components/ui/separator"
import ResponsiveWrapper from "@/components/ResponsiveWrapper"
import ContactForm from "@/components/contact-form/ContactForm"

const ContactPage = () => {
  return (
    <ResponsiveWrapper>
      <h2 className="text-emerald-500 font-semibold text-xl mt-6">お問い合わせ</h2>
      <p className="my-2 text-sm leading-relaxed">
        ご意見やご要望などがありましたら、下記のフォームよりお気軽にお問い合わせください。
      </p>
      <Separator className="text-emerald-500 my-6" />
      <ContactForm />
    </ResponsiveWrapper>
  )
}

export default ContactPage

