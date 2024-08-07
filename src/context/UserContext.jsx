import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState(null)
  const [cardNumber, setCardNumber] = useState(null)
  return (
    <UserContext.Provider value={{ userId, setUserId, cardNumber, setCardNumber }}>{children}</UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  return useContext(UserContext)
}
