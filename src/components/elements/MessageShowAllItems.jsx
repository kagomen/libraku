import { ListCheck } from 'lucide-react'

export default function MessageShowAllItems(props) {
  return (
    <div className="mx-auto mt-12 flex w-fit">
      {props.variant == 'nothing' ? (
        <>
          <p className="mt-8 text-sm font-medium">表示するアイテムがありません</p>
        </>
      ) : (
        <>
          <ListCheck size="20" className="mr-2 -translate-y-[0.5px]" />
          <p className="text-sm font-medium">すべてのアイテムを表示しました</p>
        </>
      )}
    </div>
  )
}
