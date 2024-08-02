import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(null)
  const [userCardNumber, setUserCardNumber] = useState(null)
  return (
    <UserContext.Provider value={{ userId, setUserId, userCardNumber, setUserCardNumber }}>
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  return useContext(UserContext)
}
