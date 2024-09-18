import Header from '@/components/layouts/header/Header'
import Footer from '@/components/layouts/footer/Footer'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/shadcn-ui/sonner'
import { Suspense } from 'react'
import { useUserState } from './hooks'

export default function App() {
  const { pathname } = useLocation()
  useUserState()

  return (
    <AnimatePresence mode="wait">
      <div className="min-h-dvh">
        <ScrollRestoration />
        <Toaster position="top-center" richColors />
        <Suspense fallback={<div className="h-[64px] w-full bg-white" />}>
          <Header />
        </Suspense>
        <Suspense fallback={<div className="bg-background" />}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </Suspense>
        <Footer />
      </div>
    </AnimatePresence>
  )
}
