import { Library, Search, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import SearchBar from '../SearchBar'
import { useEffect, useState } from 'react'
import ResponsiveWrapper from '../ResponsiveWrapper'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const path = location.pathname

  // ページ移動した際に検索窓を閉じる
  useEffect(() => {
    setIsOpen(false)
  }, [path])

  return (
    <>
      <div className="sticky left-0 top-0 z-50 flex h-[64px] w-full items-center justify-between border-b bg-white px-5 py-4 text-primary">
        <Link to={'/'} className="flex w-fit cursor-pointer items-center justify-center gap-1">
          <Library strokeWidth={3.5} size={22} />
          <p className="text-lg font-bold">リブラク</p>
        </Link>
        {path != '/' && (
          <div className="text-foreground">
            <Button variant="ghost" className="p-1" onClick={() => setIsOpen(!isOpen)}>
              <div className="relative h-6 w-6">
                <AnimatePresence>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <X />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Search />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Button>
          </div>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="sticky top-[64px] z-50 overflow-hidden border-b bg-white "
          >
            <ResponsiveWrapper className="py-1">
              <SearchBar />
            </ResponsiveWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
