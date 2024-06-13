import { createContext, useContext, useState } from 'react'

const SearchDataContext = createContext()

export function SearchDataProvider({ children }) {
  const [keyword, setKeyword] = useState('')
  const [count, setCount] = useState(null)
  return <SearchDataContext.Provider value={{ keyword, setKeyword, count, setCount }}>{children}</SearchDataContext.Provider>
}

export function useSearchData() {
  return useContext(SearchDataContext)
}
