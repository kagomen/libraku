import { IoSearchSharp } from "react-icons/io5";

const Search = ({ onSearch, keywordRef }) => {
  return (
    <div className="mx-5 my-4">
      <label htmlFor="keyword" className="block text-xs mb-1">書名・著者名など</label>
      <form onSubmit={onSearch} className="flex relative">
        <input type="text" name="keyword" ref={keywordRef} placeholder="検索ワードを入力してください" className="w-full h-full min-w-0 border rounded border-emerald-500 px-2 py-1.5 text-lg font-medium focus:outline-none" />
        <button type="submit" className="absolute top-0 right-0 px-3 bg-emerald-500 text-white rounded-r text-xl h-full"><IoSearchSharp /></button>
      </form>
    </div>
  )
}

export default Search
