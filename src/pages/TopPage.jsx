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
    <div className="relative mx-auto mb-12 w-full overflow-x-hidden overflow-y-visible px-3 sm:px-[24px] md:mb-0 md:h-screen">
      <img
        src={src}
        className="absolute -right-[48px] -top-[8px] z-0 opacity-85 md:-right-[60px] md:top-0 md:w-[85%] lg:w-[75%] xl:w-[65%]"
      />
      <div className="relative z-10 pt-[260px] md:pt-[100px] lg:mx-8">
        <h2 className="w-fit text-2xl font-semibold text-emerald-500 sm:text-3xl md:px-3 md:py-2 lg:bg-emerald-500 lg:px-4 lg:py-3 lg:text-4xl lg:text-white">
          図書館予約カードの記入をラクにする
        </h2>
        <div className="mb-8 mt-2 px-1 sm:mt-4 lg:text-lg">
          <p>図書館で書籍のリクエストカードを記入する際に必要な書籍情報を表示します</p>
        </div>
        <div className="sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
          <SearchBar />
        </div>
        <div className="mx-auto mt-12 w-full rounded border border-emerald-500 bg-white bg-opacity-50 px-6 py-4 backdrop-blur-sm sm:mx-0 sm:w-fit">
          <h3 className="mb-1 text-lg font-semibold text-emerald-500">💡 おすすめ機能</h3>
          <p>ユーザ登録をすると書籍情報の保存ができるようになります。</p>
          <button className="mr-3 mt-6 w-fit rounded bg-emerald-500 px-3 py-1.5 font-medium text-white">
            ログイン
          </button>
          <button className="mt-6 w-fit rounded border border-emerald-500 px-3 py-1.5 font-medium text-emerald-500">
            新規登録
          </button>
        </div>
      </div>
    </div>
  )
}
