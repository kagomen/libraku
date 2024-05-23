const Search = ({ handleInputChange, searchBook }) => {
  return (
    <div>
      <form onSubmit={searchBook}>
        <p>書名・著者名など</p>
        <input type="text" onChange={handleInputChange} />
        <button type="submit">検索</button>
      </form>
    </div>
  )
}

export default Search