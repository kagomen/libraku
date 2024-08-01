import { Heart, Library, LogOut, Search, Settings, UserRound, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react'
import ResponsiveWrapper from '../ResponsiveWrapper'
import { motion } from 'framer-motion'
import { useUserContext } from '@/context/UserContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { signOut } from '@/lib/api'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { userId, setUserId } = useUserContext()
  const nav = useNavigate()

  // ページ遷移した際に検索窓を閉じる
  // ページ遷移先が/user-pageの場合、検索窓を表示させる
  const location = useLocation()
  const path = location.pathname
  useEffect(() => {
    if (path == '/user-page') {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [path])

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
    nav('/')
  }

  return (
    <>
      <div className="sticky left-0 top-0 z-50 flex h-[64px] w-full items-center justify-between bg-white px-5 py-4 text-primary shadow-md shadow-foreground/5">
        {/* ロゴ */}
        <Link to={'/'} className="flex w-fit cursor-pointer items-center justify-center gap-1">
          <Library strokeWidth={3.5} size={22} />
          <p className="text-lg font-bold">リブラク</p>
        </Link>
        <div className="flex items-center space-x-3 text-foreground">
          {/* 検索 */}
          <Button variant="ghost" className="p-0" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <X />
              </motion.div>
            ) : (
              <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Search />
              </motion.div>
            )}
          </Button>
          {userId ? (
            <>
              {/* お気に入り一覧 */}
              <Button variant="ghost" className="p-0">
                <Link to="/favorite">
                  <Heart />
                </Link>
              </Button>
              {/* ユーザー設定 */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="p-0">
                    <Link to="/favorite">
                      <UserRound />
                    </Link>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>ログイン中</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <MenuWrapper title="アカウント設定" icon={<Settings />} />
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MenuWrapper title="ログアウト" icon={<LogOut />} onClick={clickHandler} />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button size="sm" className="text-sm">
              <Link to="/sign-in">ログイン</Link>
            </Button>
          )}
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ y: -160 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 right-0 top-[64px] z-40 overflow-hidden bg-white shadow-md shadow-foreground/5 "
        >
          <ResponsiveWrapper className="py-4">
            <SearchBar />
          </ResponsiveWrapper>
        </motion.div>
      )}
    </>
  )
}
