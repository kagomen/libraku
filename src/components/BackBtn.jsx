import { useNavigate } from 'react-router-dom'

const BackBtn = () => {
  const nav = useNavigate()
  return (
    <button
      type="button"
      onClick={() => nav(-1)}
      className="mx-auto my-8 block w-fit rounded bg-emerald-500 px-3 py-1.5 font-medium text-white"
    >
      もどる
    </button>
  )
}

export default BackBtn
