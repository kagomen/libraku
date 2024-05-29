import { useNavigate } from "react-router-dom"

const BackBtn = () => {
  const nav = useNavigate()
  return (
    <button
      type="button"
      onClick={() => nav(-1)}
      className="block w-fit mx-auto rounded font-medium bg-emerald-500 px-3 py-1.5 my-8 text-white"
    >
      もどる
    </button>
  )
}

export default BackBtn