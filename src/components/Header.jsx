import { ImBooks } from 'react-icons/im'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="fixed bg-transparent left-0 top-0 z-50 flex h-[64px] w-full items-center justify-between px-5 py-4 text-emerald-500 backdrop-blur-sm">
      <Link to={'/'} className="flex w-fit cursor-pointer gap-1 text-xl font-bold">
        <div className="text-2xl">
          <ImBooks />
        </div>
        <p>リブラク</p>
      </Link>
    </div>
  )
}
