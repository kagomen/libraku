import { CgSpinner } from 'react-icons/cg'

export default function Loading() {
  return (
    <div className="mx-auto my-14 w-fit animate-spin text-4xl text-emerald-500">
      <CgSpinner />
    </div>
  )
}
