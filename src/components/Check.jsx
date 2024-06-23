import { HiOutlineCheckCircle } from "react-icons/hi";

export default function Check() {
  return (
    <div className="flex mx-auto my-14 w-fit text-emerald-500">
      <span className="text-2xl pr-2 -translate-y-[3px]"><HiOutlineCheckCircle /></span>
      <p className="text-sm font-medium">すべてのアイテムを表示しました</p>
    </div>
  )
}
