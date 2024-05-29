import { useRef } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const nav = useNavigate()
  const keywordRef = useRef()
  function handleSubmit(e) {
    e.preventDefault()
    nav(`/search/${keywordRef.current.value}`)
  }
  return (
    <div className="my-4">
      <label htmlFor="keyword" className="mb-1 block text-xs pl-1">
        本をさがす
      </label>
      <form onSubmit={handleSubmit} className="relative flex">
        <input
          type="text"
          name="keyword"
          ref={keywordRef}
          placeholder="タイトル・著者名など"
          className="h-full w-full min-w-0 rounded border border-emerald-500 px-2 py-1 text-lg focus:outline-none"
        />
        <button
          className="absolute right-0 top-0 h-full rounded-r bg-emerald-500 px-3 text-xl text-white"
        >
          <IoSearchSharp />
        </button>
      </form>
    </div>
  )
}

export default Search
