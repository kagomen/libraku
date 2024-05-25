import heroImage from '../assets/hero-img.png'

function Hero() {
  return (
    <div>
      <section>
        <img src={heroImage} alt="ヒーローイメージ" className='block w-[280px] mx-auto mt-4' />
        <h2 className='mx-5 px-3 py-2 bg-emerald-500 text-white font-bold text-2xl'>図書館予約カードの記入をラクにする</h2>
        <p className='mx-5 my-4'>図書館で予約・リクエストカードを記入する際に必要な書籍情報を表示します</p>
      </section>
    </div>
  )
}

export default Hero
