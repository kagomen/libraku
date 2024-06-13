import src from '/hero-img.webp'
import SearchBar from '../components/SearchBar'
import { useSearchData } from '../context/SearchData'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function Hero() {
  // トップページに遷移したらkeywordコンテキストを空にする
  const location = useLocation()
  const { setKeyword } = useSearchData()

  useEffect(() => {
    if (location.pathname == '/') {
      setKeyword('')
    }
  }, [location.pathname, setKeyword])

  return (
    <div className="mx-5">
      <img src={src} width="300" height="242.64" className="mx-auto mb-8 mt-10" />
      <h2 className="bg-emerald-500 px-3 py-2 text-2xl font-semibold text-white">図書館予約カードの記入をラクにする</h2>
      <p className="mb-8 mt-4 px-1">図書館で予約・リクエストカードを記入する際に必要な書籍情報を表示します</p>
      <SearchBar />
    </div>
  )
}
