import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Footer() {
  const location = useLocation()
  const bgColor = location.pathname == '/' ? null : 'bg-foreground/10'
  return (
    <div
      className={`sticky top-full flex h-[140px] w-full flex-col items-center justify-center gap-y-5 backdrop-blur ${bgColor}`}
    >
      <div className="flex items-center justify-center gap-3 text-foreground/70">
        <Button variant="link" className="text-foreground/70">
          <Link to={'/contact'}>お問い合わせ</Link>
        </Button>
        <span>|</span>
        <Button variant="link" className="text-foreground/70">
          <Link to={'/about'}>このサイトについて</Link>
        </Button>
      </div>
      <p className="text-center text-xs text-foreground/40">Copyright © 2024 リブラク All Rights Reserved</p>
    </div>
  )
}
