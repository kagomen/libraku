// import { CgSpinner } from "react-icons/cg";
import { FaBook } from "react-icons/fa";

export default function BookList({ searchedBooks, onSelect, isLoading }) {
  return (
    isLoading ?
      // <div className="animate-spin text-4xl w-fit mx-auto my-14 text-emerald-500">
      //   <CgSpinner />
      // </div>
      <div className="flex items-center justify-center gap-3 mt-14">
        <div className=" animate-bounce text-2xl w-fit  text-emerald-500">
          <FaBook />
        </div>
        <p className="text-md font-semibold text-emerald-700">ロード中...</p>
      </div>
      : searchedBooks &&
      <div className="mx-auto w-[90%]">
        <p>検索結果 :</p>
        {searchedBooks.map((book) => {
          return (
            <div
              key={book.id}
              onClick={() => onSelect(book)}
              className="mt-4 flex gap-4 rounded border border-emerald-500 bg-white p-4"
            >
              <img src={book.volumeInfo?.imageLinks?.thumbnail} className="w-[85px]" />
              <div>
                <h2 className="mb-1 text-sm font-semibold">{book.volumeInfo?.title}</h2>
                <p className="text-xs">{book.volumeInfo?.authors?.join(' / ')}</p>
              </div>
            </div>
          )
        })}
      </div>
  )
}
