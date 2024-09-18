import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/shadcn-ui/button'
import { Bell, CircleHelp, Mail } from 'lucide-react'

export default function Footer() {
  const location = useLocation()
  const bgColor = location.pathname == '/' ? null : 'bg-foreground/10'

  function MenuWrapper(props) {
    return (
      <div>
        <Button variant="ghost" asChild className="flex h-fit items-center p-0 text-foreground/70">
          <Link to={props.to}>
            <span className="mr-4 translate-y-[2px] text-primary">{props.icon}</span>
            <span>{props.title}</span>
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className={`sticky top-full flex h-auto w-full justify-center py-8 backdrop-blur ${bgColor}`}>
      <div className="space-y-5">
        <div className="flex flex-col items-start gap-2">
          <MenuWrapper title="お知らせ" to="/news" icon={<Bell />} />
          <MenuWrapper title="お問い合わせ" to="/contact" icon={<Mail />} />
          <MenuWrapper title="このサイトについて" to="/about" icon={<CircleHelp />} />
        </div>
        <p className="text-center text-xs text-foreground/40">Copyright © 2024 リブラク All Rights Reserved</p>
      </div>
    </div>
  )
}
