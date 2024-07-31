import { EllipsisVertical, FolderHeart, Library, LogIn, Search, UserRound, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react'
import ResponsiveWrapper from '../ResponsiveWrapper'
import { motion } from 'framer-motion'
import { Sheet, SheetTrigger } from '../ui/sheet'
import SideNav from '../SideNav'
import { useUserContext } from '@/context/UserContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const path = location.pathname
  const { userId } = useUserContext()

  // ページ遷移した際に検索窓を閉じる
  // ページ遷移先が/user-pageの場合、検索窓を表示させる
  useEffect(() => {
    if (path == '/user-page') {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [path])

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
                  <FolderHeart />
                </Link>
              </Button>
              {/* ユーザー設定 */}
              <Button variant="ghost" className="p-0">
                <Link to="/favorite">
                  <UserRound />
                </Link>
              </Button>
            </>
          ) : (
            <Button size="sm" className="text-sm">
              <Link to="/sign-in">ログイン</Link>
            </Button>
          )}
          {/* ハンバーガーメニュー */}
          {/* <Sheet>
            <SheetTrigger>
              <Button variant="ghost" className="p-0">
                <EllipsisVertical />
              </Button>
            </SheetTrigger>
            <SideNav />
          </Sheet> */}
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
