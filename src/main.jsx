import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { SearchResultCacheProvider } from './context/SearchResultCache.jsx'
import { BookDataCacheProvider } from './context/BookDataCache.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchResultCacheProvider>
      <BookDataCacheProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </BookDataCacheProvider>
    </SearchResultCacheProvider>
  </React.StrictMode>
)
