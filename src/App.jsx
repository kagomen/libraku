import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { useUserContext } from './context/UserContext'
import { Suspense, useEffect } from 'react'
import { validate } from './lib/api'
import { useSuspenseQuery } from '@tanstack/react-query'

// 初回ロード時にセッション情報を確認
// HeaderにSuspenseを使用するため、コンポーネント化
function ValidateUser() {
  const { setUserId } = useUserContext()
  const { data } = useSuspenseQuery({
    queryKey: ['validate'],
    queryFn: validate,
  })

  useEffect(() => {
    if (data) {
      setUserId(data.data.userId)
    }
  }, [data, setUserId])

  return null
}

export default function App() {
  const { pathname } = useLocation()

  return (
    <AnimatePresence mode="wait">
      <div className="min-h-dvh">
        <ScrollRestoration />
        <Toaster position="top-center" richColors />
        <Suspense fallback={<div className="h-[64px] w-full bg-white"></div>}>
          <ValidateUser />
          <Header />
        </Suspense>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
        <Footer />
      </div>
    </AnimatePresence>
  )
}
