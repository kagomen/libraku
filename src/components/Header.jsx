import { ImBooks } from 'react-icons/im'
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div className="fixed left-0 top-0 z-10 w-full flex text-emerald-500 justify-between items-center h-[64px] px-5 py-4 backdrop-blur-sm">
      <Link to={'/'}
        className="flex w-fit gap-1 cursor-pointer text-xl font-bold"
      >
        <div className="text-2xl">
          <ImBooks />
        </div>
        <p>リブラク</p>
      </Link>
    </div>
  )
}
