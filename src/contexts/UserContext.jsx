import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserContextProvider({ children }) {
  const [userId, setUserId] = useState()
  const [cardNumber, setCardNumber] = useState()
  const [email, setEmail] = useState()
  const [isTestAccount, setIsTestAccount] = useState(false)
  return (
    <UserContext.Provider
      value={{ userId, setUserId, cardNumber, setCardNumber, email, setEmail, isTestAccount, setIsTestAccount }}
    >
      {children}
    </UserContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext() {
  return useContext(UserContext)
}
