const Search = ({ onSearch, keywordRef }) => {
  return (
    <div className="mx-5">
      <label htmlFor="keyword" className="block text-xs">書名・著者名など</label>
      <form onSubmit={onSearch} className="flex">
        <input type="text" name="keyword" ref={keywordRef} className="border rounded border-emerald-500 px-1 py-0.5 flex-1" />
        <button type="submit" className="ml-2 px-2 py-1 bg-emerald-500 text-white rounded">検索</button>
      </form>
    </div>
  )
}

export default Search
