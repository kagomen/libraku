import heroImage from '../assets/hero-img.png'

function Hero() {
  return (
    <div>
      <img src={heroImage} alt="ヒーローイメージ" className="mx-auto mt-4 block w-[280px]" />
      <h2 className="mx-5 bg-emerald-500 px-3 py-2 text-2xl font-bold text-white">
        図書館予約カードの記入をラクにする
      </h2>
      <p className="mx-5 my-4">図書館で予約・リクエストカードを記入する際に必要な書籍情報を表示します</p>
    </div>
  )
}

export default Hero
