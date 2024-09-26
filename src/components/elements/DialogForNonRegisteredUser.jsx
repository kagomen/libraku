import { Link } from 'react-router-dom'
import { Button } from '@/components/shadcn-ui/button'
import { Dialog, DialogContent, DialogTitle } from '@/components/shadcn-ui/dialog'
import src from '@/assets/bird-emoji/emoji_u1f54a.svg'
import ButtonIconWrapper from './ButtonIconWrapper'
import { ChevronRight } from 'lucide-react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

function DialogForNonRegisteredUser(props) {
  return (
    <Dialog>
      {props.children}
      <DialogContent aria-describedby={undefined}>
        <VisuallyHidden asChild>
          <DialogTitle>アカウントが必要です</DialogTitle>
        </VisuallyHidden>
        <img src={src} width="72" height="72" className="mx-auto" alt="" />
        <p className="text-center">この機能を使うには、アカウントの作成が必要です。</p>
        <Button asChild className="relative w-full">
          <Link to="/sign-up">
            <ButtonIconWrapper side="right">
              <ChevronRight />
            </ButtonIconWrapper>
            アカウントを作成する
          </Link>
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DialogForNonRegisteredUser
