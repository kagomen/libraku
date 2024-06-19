import src from '/hero-img-reverse.webp'
import SearchBar from '../components/SearchBar'
import { useSearchData } from '../context/SearchData'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function TopPage() {
  // トップページに遷移したらkeywordコンテキストを空にする
  const location = useLocation()
  const { setKeyword } = useSearchData()

  useEffect(() => {
    if (location.pathname == '/') {
      setKeyword('')
    }
  }, [location.pathname, setKeyword])

  return (
    <div className="mx-auto sm:mb-[120px] px-3 w-full sm:px-[24px] md:px-0 md:max-w-[80%] relative overflow-hidden md:overflow-visible">
      <img src={src} className="absolute sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] -top-[8px] md:top-0 xl:-top-[40px] -right-[32px] opacity-85 z-0" />
      <div className='relative z-10 pt-[260px] sm:pt-[340px]'>
        <h2 className="text-emerald-500 w-fit sm:px-3 sm:py-2 lg:px-4 lg:py-3 text-2xl sm:text-3xl lg:text-4xl font-semibold sm:bg-emerald-500 sm:text-white">図書館予約カードの記入をラクにする</h2>
        <p className="mb-8 mt-2 sm:mt-4 px-1 lg:text-lg">図書館で予約・リクエストカードを記入する際に必要な書籍情報を表示します</p>
        <div className='sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]'>
          <SearchBar />
        </div>
      </div>
    </div>
  )
}
