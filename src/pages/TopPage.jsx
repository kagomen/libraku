import heroImage from '../assets/hero-img.png'
import SearchBar from '../components/SearchBar'

function Hero() {
  return (
    <div className='mx-5'>
      <img src={heroImage} alt="ヒーローイメージ" className="mx-auto mt-10 mb-8 block w-[300px]" />
      <h2 className="bg-emerald-500 px-3 py-2 text-2xl font-semibold text-white">
        図書館予約カードの記入をラクにする
      </h2>
      <p className="mt-4 mb-8 px-1">図書館で予約・リクエストカードを記入する際に必要な書籍情報を表示します</p>
      <SearchBar />
    </div>
  )
}

export default Hero
