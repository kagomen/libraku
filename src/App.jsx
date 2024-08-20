import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from '@/components/chadcn-ui/sonner'
import { Suspense } from 'react'

export default function App() {
  const { pathname } = useLocation()

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
