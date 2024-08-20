import { Lightbulb } from 'lucide-react'

function ColumnTitle({ children }) {
  return (
    <div className="space-y-3">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-center text-white">
        <Lightbulb size="26" />
      </div>
      <p className="text-sm font-semibold text-primary">{children}</p>
      <hr className="w-24 border" />
    </div>
  )
}

export default ColumnTitle
