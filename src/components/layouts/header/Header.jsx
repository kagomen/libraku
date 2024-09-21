import { Library, Search, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/shadcn-ui/button'
import SearchBar from '@/components/elements/SearchBar'
import { useEffect, useState } from 'react'
import { useUserContext } from '@/contexts/UserContext'
import NavMenuForLoggedInUser from './NavMenuForLoggedInUser'
import NavMenuForGeneralUser from './NavMenuForGeneralUser'
import { Sheet, SheetContent, SheetTrigger } from '@/components/shadcn-ui/sheet'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { userId } = useUserContext()

  // ページ遷移した際に検索窓を閉じる
  const location = useLocation()
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <div className="sticky left-0 top-0 z-50 flex h-[64px] w-full items-center justify-between bg-white px-5 py-4 text-primary shadow-md shadow-foreground/5">
        {/* ロゴ */}
        <Button variant="ghost" asChild className="flex items-center justify-center gap-1 p-0">
          <Link to={'/'}>
            <Library strokeWidth={3.5} size={22} />
            <p className="text-lg font-bold">リブラク</p>
          </Link>
        </Button>
        <div className="flex items-center space-x-5 text-foreground">
          {/* 検索 */}
          <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? '検索窓を閉じる' : '検索窓を開く'}
              >
                {isOpen ? <X /> : <Search />}
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="fixed left-0 right-0 top-[64px] z-40 overflow-hidden">
              <div className="container">
                <SearchBar />
              </div>
            </SheetContent>
          </Sheet>
          {/* ログインボタン or お気に入り一覧/設定 */}
          {userId === null ? <NavMenuForGeneralUser /> : <NavMenuForLoggedInUser />}
        </div>
      </div>
    </>
  )
}
