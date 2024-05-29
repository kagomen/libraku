import { CgSpinner } from "react-icons/cg";
import { FaBook } from "react-icons/fa";

const Loading = () => {
  return (
    <div>        <div className="animate-spin text-4xl w-fit mx-auto my-14 text-emerald-500">
      <CgSpinner />
    </div>
      <div className="flex items-center justify-center gap-3 mt-14">
        <div className=" animate-bounce text-2xl w-fit  text-emerald-500">
          <FaBook />
        </div>
        <p className="text-md font-semibold text-emerald-700">ロード中...</p>
      </div></div>
  )
}

export default Loading