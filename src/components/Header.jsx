import { ImBooks } from "react-icons/im";

export default function Header({ goHome }) {
  return (
    <div className="bg-emerald-500">
      <div onClick={goHome} className="cursor-pointer flex w-fit text-xl font-bold text-white py-3">
        <div className="text-2xl pl-5 pr-1">
          <ImBooks />
        </div>
        <p>リブラク</p>
      </div>
    </div>
  )
}
