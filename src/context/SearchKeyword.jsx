import { createContext, useContext, useState } from "react"

const SearchKeywordContext = createContext()

export function SearchKeywordProvider({ children }) {
  const [keyword, setKeyword] = useState('')
  return (
    <SearchKeywordContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchKeywordContext.Provider>
  )
}

export function useSearchKeyword() {
  return useContext(SearchKeywordContext)
}