import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/ui/sonner'
import { useUserContext } from './context/UserContext'
import { useEffect } from 'react'
import axios from 'axios'

export default function App() {
  const { pathname } = useLocation()
  const { setUserId } = useUserContext()

  console.log('VITE_SERVER_URL', import.meta.env.VITE_SERVER_URL)

  useEffect(() => {
    async function validate() {
      const response = await axios.post('/api/auth/validateSession')
      setUserId(response.data.userId)
    }

    validate()
  }, [setUserId])

  return (
    <AnimatePresence mode="wait">
      <div className="min-h-dvh">
        <ScrollRestoration />
        <Toaster position="top-center" richColors />
        <Header />
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
