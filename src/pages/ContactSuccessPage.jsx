import Heading from "@/components/Heading"
import ResponsiveWrapper from "@/components/ResponsiveWrapper"
import { Link } from "react-router-dom"
import { Check, ChevronsLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSuccessPage = () => {
  return (
    <ResponsiveWrapper>
      <Heading>
        <Check size="22" className="-translate-y-[1px]" />
        お問い合わせが完了しました
      </Heading>
      <Button
        variant="ghost"
        className="block mx-auto my-8">
        <Link to="/">
          <ChevronsLeft size="24" className="inline -translate-y-[2px] pr-1" />
          トップページに戻る
        </Link>

      </Button>
    </ResponsiveWrapper>
  )
}

export default ContactSuccessPage