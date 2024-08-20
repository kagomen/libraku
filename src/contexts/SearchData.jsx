import { createContext, useContext, useState } from 'react'

const SearchDataContext = createContext()

export function SearchDataProvider({ children }) {
  const [keyword, setKeyword] = useState('')
  return <SearchDataContext.Provider value={{ keyword, setKeyword }}>{children}</SearchDataContext.Provider>
}

export function useSearchData() {
  return useContext(SearchDataContext)
}
