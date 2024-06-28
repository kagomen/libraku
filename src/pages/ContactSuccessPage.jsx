import Heading from "@/components/Heading"
import ResponsiveWrapper from "@/components/ResponsiveWrapper"
import { Link } from "react-router-dom"
import { Check, ChevronsLeft } from "lucide-react";

const ContactSuccessPage = () => {
  return (
    <ResponsiveWrapper>
      <Heading>
        <Check size="22" className="-translate-y-[1px]" />
        お問い合わせが完了しました
      </Heading>
      <div className="underline text-md mx-auto w-fit">
        <Link to="/">
          <ChevronsLeft size="20" className="inline -translate-y-[1px]" />
          トップページに戻る</Link>
      </div>
    </ResponsiveWrapper>
  )
}

export default ContactSuccessPage