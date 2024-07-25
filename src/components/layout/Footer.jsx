import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <div className="sticky top-full flex h-[140px] w-full flex-col items-center justify-center gap-y-5 backdrop-blur">
      <div className="flex items-center justify-center gap-3">
        <Button variant="link">
          <Link to={'/contact'}>お問い合わせ</Link>
        </Button>
        <span>|</span>
        <Button variant="link">
          <Link to={'/about'}>このサイトについて</Link>
        </Button>
      </div>
      <p className="text-center text-xs text-foreground/40">Copyright © 2024 リブラク All Rights Reserved</p>
    </div>
  )
}