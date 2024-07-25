import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import { Link } from 'react-router-dom'
import { ChevronsLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Player } from '@lottiefiles/react-lottie-player'
import Animation from '@/assets/send-animation.json'

const ContactSuccessPage = () => {
  return (
    <div className="bg-background py-14">
      <ResponsiveWrapper>
        <Heading>お問い合わせが完了しました</Heading>
        <Player autoplay loop src={Animation} className="h-[240px] w-[240px]" />
        <Link to="/">
          <Button variant="link" className="mx-auto flex w-fit items-center justify-center gap-2">
            <ChevronsLeft size="24" className="translate-y-[1px]" />
            トップページに戻る
          </Button>
        </Link>
      </ResponsiveWrapper>
    </div>
  )
}

export default ContactSuccessPage
