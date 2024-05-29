import { createContext, useContext, useState } from "react";

const BookDataCacheContext = createContext()

export function BookDataCacheProvider({ children }) {
  const [bookDataCache, setBookDataCache] = useState({})

  return (
    <BookDataCacheContext.Provider value={{ bookDataCache, setBookDataCache }}>
      {children}
    </BookDataCacheContext.Provider>
  )
}

export function useBookDataCache() {
  return useContext(BookDataCacheContext)
}