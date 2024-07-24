import { Library } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="sticky left-0 top-0 z-50 flex h-[64px] w-full items-center justify-between border-b bg-transparent px-5 py-4 text-primary backdrop-blur">
      <Link to={'/'} className="flex w-fit cursor-pointer items-center justify-center gap-1">
        <Library strokeWidth={3.5} size={22} />
        <p className="text-lg font-bold">リブラク</p>
      </Link>
    </div>
  )
}
