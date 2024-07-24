import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export default function App() {
  return (
    <div className="bg-emerald-25 min-h-dvh text-zinc-700">
      <ScrollRestoration />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
