import { createContext, useContext, useState } from "react";

const CacheContext = createContext()

export function CacheProvider({ children }) {
  const [cache, setCache] = useState({})
  return (
    <CacheContext.Provider value={{ cache: cache, setCache: setCache }}>
      {children}
    </CacheContext.Provider>
  )
}

export function useCache() {
  return useContext(CacheContext)
}
