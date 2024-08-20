import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/main.css'
import { RouterProvider } from 'react-router-dom'
import { SearchDataProvider } from '@/contexts/SearchData.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from '@/pages/routers'
import { UserContextProvider } from '@/contexts/UserContext'

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
