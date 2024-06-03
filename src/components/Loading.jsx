import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className="animate-spin text-4xl w-fit mx-auto my-14 text-emerald-500">
      <CgSpinner />
    </div>
  )
}