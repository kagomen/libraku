import { ImBooks } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const nav = useNavigate()
  return (
    <div className="">
      <div
        onClick={() => {
          nav('/')
        }}
        className="flex w-fit cursor-pointer py-3 text-xl font-bold text-emerald-500"
      >
        <div className="pl-5 pr-1 text-2xl">
          <ImBooks />
        </div>
        <p>リブラク</p>
      </div>
    </div>
  )
}
