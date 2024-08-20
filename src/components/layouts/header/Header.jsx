import { Library, Search, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/chadcn-ui/button'
import SearchBar from '@/components/elements/SearchBar'
import { useEffect, useState } from 'react'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import { motion } from 'framer-motion'
import { useUserInfo } from '@/api/api'
import { useUserContext } from '@/contexts/UserContext'
import NavMenuForLoggedInUser from './NavMenuForLoggedInUser'
import NavMenuForGeneralUser from './NavMenuForGeneralUser'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { userId, setUserId, setCardNumber } = useUserContext()

  const { data, isLoading } = useUserInfo()

  useEffect(() => {
    if (!isLoading && data) {
      setUserId(data.userId)
      setCardNumber(data.cardNumber)
    } else {
      setUserId(null)
      setCardNumber(null)
    }
  }, [data, isLoading, setCardNumber, setUserId])

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
          {userId ? <NavMenuForLoggedInUser /> : <NavMenuForGeneralUser />}
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
