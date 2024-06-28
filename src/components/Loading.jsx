import { LoaderCircle } from 'lucide-react'

export default function Loading() {
  return (
    <div className="mx-auto my-14 w-fit animate-spin text-4xl text-emerald-500">
      <LoaderCircle />
    </div>
  )
}
