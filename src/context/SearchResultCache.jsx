import { createContext, useContext, useState } from "react";

const SearchResultCacheContext = createContext()

export function SearchResultCacheProvider({ children }) {
  const [searchResultCache, setSearchResultCache] = useState({})

  return (
    <SearchResultCacheContext.Provider value={{ searchResultCache, setSearchResultCache }}>
      {children}
    </SearchResultCacheContext.Provider>
  )
}

export function useSearchResultCache() {
  return useContext(SearchResultCacheContext)
}
