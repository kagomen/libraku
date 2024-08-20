import Heading from '@/components/elements/Heading'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/chadcn-ui/button'
import { Player } from '@lottiefiles/react-lottie-player'
import Animation from '@/assets/send-animation.json'

const ContactSuccessPage = () => {
  return (
    <div className="containerpy-12">
      <Heading>お問い合わせが完了しました</Heading>
      <Player autoplay loop src={Animation} className="h-[240px] w-[240px]" />
      <Link to="/">
        <Button variant="link" className="mx-auto flex w-fit items-center justify-center gap-2">
          <ChevronLeft size="24" strokeWidth="1.6" className="translate-y-[1px]" />
          ホームに戻る
        </Button>
      </Link>
    </div>
  )
}

export default ContactSuccessPage
