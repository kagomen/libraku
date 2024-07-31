import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { RouterProvider } from 'react-router-dom'
import { SearchDataProvider } from './context/SearchData.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './lib/rooter'
import { UserContextProvider } from './context/UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SearchDataProvider>
          <RouterProvider router={router} />
        </SearchDataProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
