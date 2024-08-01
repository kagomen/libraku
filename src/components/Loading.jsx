import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="mx-auto my-14 w-fit animate-spin text-4xl text-primary">
      <Loader />
    </div>
  )
}
