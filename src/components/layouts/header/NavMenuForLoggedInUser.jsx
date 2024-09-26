import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/shadcn-ui/button'
import { Heart, LogOut, Settings, UserRound } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu'
import { signOut } from '@/api'
import { useUserContext } from '@/contexts/UserContext'
import { useEffect, useState } from 'react'

function NavMenuForLoggedInUser() {
  const { setUserId, setCardNumber, setIsTestAccount } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)
  const nav = useNavigate()

  function MenuWrapper(props) {
    return (
      <div>
        <Button variant="ghost" className="flex h-fit items-center p-0" onClick={props.onClick}>
          <span className="mr-4 translate-y-[1px] text-primary">{props.icon}</span>
          <span>{props.title}</span>
        </Button>
      </div>
    )
  }

  async function clickHandler() {
    await signOut()
    setUserId(null)
    setCardNumber(null)
    setIsTestAccount(false)
    nav('/')
  }

  // ページ遷移したらドロップダウンメニューを閉じる
  const location = useLocation()
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* お気に入り一覧 */}
      <Button variant="ghost" asChild className="p-0">
        <Link to="/favorites" aria-label="お気に入り一覧ページへ行く">
          <Heart />
        </Link>
      </Button>
      {/* ユーザー設定 */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <Button variant="ghost" asChild className="p-0" aria-label="メニューを開く">
          <DropdownMenuTrigger>
            <UserRound />
          </DropdownMenuTrigger>
        </Button>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex items-center gap-2">
            <div className="h-2 w-2 translate-y-[1px] rounded-full bg-primary" />
            ログイン中
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to="/settings">
              <MenuWrapper title="アカウント設定" icon={<Settings />} />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MenuWrapper title="ログアウト" icon={<LogOut />} onClick={clickHandler} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default NavMenuForLoggedInUser
