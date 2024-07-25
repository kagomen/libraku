import { CircleHelp, FolderHeart, LogOut, Mail, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { SheetClose, SheetContent } from './ui/sheet'
import { Link } from 'react-router-dom'

function SideNav() {
  function MenuWrapper(props) {
    return (
      <div>
        <Link to={props.to}>
          <SheetClose>
            <Button variant="ghost">
              <span className="mr-4 text-primary">{props.icon}</span>
              <span>{props.title}</span>
            </Button>
          </SheetClose>
        </Link>
      </div>
    )
  }

  return (
    <SheetContent side="right">
      <div className="mt-16 space-y-2">
        <MenuWrapper title="お気に入り一覧" to="/favorite" icon={<FolderHeart />} />
        <MenuWrapper title="ユーザー設定" to="/settings" icon={<Settings />} />
        <MenuWrapper title="ログアウト" to="/sign-out" icon={<LogOut />} />
        <MenuWrapper title="お問い合わせ" to="/contact" icon={<Mail />} />
        <MenuWrapper title="このサイトについて" to="/about" icon={<CircleHelp />} />
      </div>
    </SheetContent>
  )
}

export default SideNav
