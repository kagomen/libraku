import { Check } from "lucide-react";

export default function MessageShowAllItems() {
  return (
    <div className="flex mx-auto mt-12 w-fit text-emerald-500">
      <Check size="20" className="mr-2 -translate-y-[0.5px]" />
      <p className="text-sm font-medium">すべてのアイテムを表示しました</p>
    </div>
  )
}
