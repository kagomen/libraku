import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(null)
  return <UserContext.Provider value={{ userId, setUserId }}>{children}</UserContext.Provider>
}

export function useUserContext() {
  return useContext(UserContext)
}
