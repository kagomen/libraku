import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import { RouterProvider } from 'react-router-dom'
import { SearchDataProvider } from './context/SearchData.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './lib/rooter'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchDataProvider>
        <RouterProvider router={router} />
      </SearchDataProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
