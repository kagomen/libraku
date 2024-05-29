import { ImBooks } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate()
  return (
    <div className="bg-emerald-500">
      <div onClick={() => { nav("/") }} className="cursor-pointer flex w-fit text-xl font-bold text-white py-3">
        <div className="text-2xl pl-5 pr-1">
          <ImBooks />
        </div>
        <p>リブラク</p>
      </div>
    </div>
  )
}
