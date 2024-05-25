const Search = ({ onSearch, keywordRef }) => {
  return (
    <div className="mx-5 my-4">
      <label htmlFor="keyword" className="block text-xs">書名・著者名など</label>
      <form onSubmit={onSearch} className="flex gap-2 w-full">
        <input type="text" name="keyword" ref={keywordRef} className="flex-auto min-w-0 border rounded border-emerald-500 px-1 py-0.5" />
        <button type="submit" className="flex-none px-2 py-1 bg-emerald-500 text-white rounded">検索</button>
      </form>
    </div>
  )
}

export default Search
