import src from '/hero-img-reverse.webp'
import SearchBar from '../components/SearchBar'
import { useSearchData } from '../context/SearchData'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

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
    <div className="relative mx-auto overflow-x-hidden overflow-y-hidden px-3 sm:px-[24px] md:h-screen">
      <img
        src={src}
        className="absolute translate-y-[-72px] sm:translate-y-[-44px] scale-125 top-24 sm:scale-100 -right-[48px] z-0 opacity-85 md:-right-[60px] md:w-[85%] lg:w-[75%] xl:w-[65%]"
      />
      <div className="relative translate-y-[-44px] z-10 pt-[360px] md:pt-[140px] lg:mx-8">
        <h2 className="w-fit text-2xl font-semibold text-emerald-500 sm:text-3xl md:px-3 md:py-2 sm:bg-emerald-500 lg:px-4 lg:py-3 lg:text-4xl sm:text-white">
          図書館予約カードの記入をラクにする
        </h2>
        <div className="mb-5 mt-2 px-1 sm:mt-4 lg:text-lg">
          <p>図書館でリクエストカードを記入する際に必要な書籍情報を表示します</p>
        </div>
        <div className="md:w-[65%] lg:w-[55%] xl:w-[45%]">
          <SearchBar />
          <div className="mt-10 w-full rounded border border-emerald-500 bg-white bg-opacity-50 p-5 backdrop-blur-sm">
            <h3 className="mb-1 text-lg font-semibold text-emerald-500">ユーザー機能</h3>
            <ul className='list-inside list-disc'>
              <li>書籍情報の保存</li>
              <li>図書カードの利用者番号の保存</li>
            </ul>
            <button className="mr-3 mt-6 w-fit rounded bg-yellow-500 px-3 py-1.5 font-medium text-white">
              ログイン
            </button>
            <button className="mt-6 w-fit rounded border border-orange-600 px-3 py-1.5 font-medium text-orange-600">
              新規登録
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
