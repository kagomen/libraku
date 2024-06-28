import { CircleCheckBig } from "lucide-react";

export default function Check() {
  return (
    <div className="flex mx-auto my-14 w-fit text-emerald-500">
      <CircleCheckBig size="20" className="mr-2 -translate-y-[0.5px]" />
      <p className="text-sm font-medium">すべてのアイテムを表示しました</p>
    </div>
  )
}
