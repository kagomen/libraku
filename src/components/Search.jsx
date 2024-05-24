const Search = ({ handleInputChange, searchBook }) => {
  return (
    <div>
      <form onSubmit={searchBook}>
        <label htmlFor="keyword">書名・著者名など</label>
        <input type="text" name="keyword" onChange={handleInputChange} />
        <button type="submit">検索</button>
      </form>
    </div>
  )
}

export default Search