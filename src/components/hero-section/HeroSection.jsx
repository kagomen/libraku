import ResponsiveWrapper from '../ResponsiveWrapper'
import SearchBar from '../SearchBar'
import BookEmoji from './BookEmoji'
import Message from './Message'

function HeroSection() {
  return (
    <div className="bg-white pb-14">
      <ResponsiveWrapper>
        <div className="relative z-10 flex flex-col gap-8 pt-56">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-primary">図書館をもっと便利に。</h2>
            <p>図書館ユーザーのための書籍検索アプリ</p>
          </div>
          <SearchBar className="bg-white/50 backdrop-blur" />
          <Message className="bg-white/50 backdrop-blur" />
        </div>
        <div className="absolute">
          <span className="font-NotoColorEmoji animate-float-slow fixed -left-8 top-16 -rotate-[16deg] transform opacity-70">
            <BookEmoji book="3" width="240px" height="240px" />
          </span>
          <span className="font-NotoColorEmoji animate-float-medium fixed right-0 top-[400px] rotate-[24deg] opacity-50">
            <BookEmoji book="1" width="100px" height="100px" />
          </span>
          <span className="font-NotoColorEmoji animate-float-fast fixed -left-6 top-[560px] rotate-[-32deg] opacity-60">
            <BookEmoji book="4" width="180px" height="180px" />
          </span>
        </div>
      </ResponsiveWrapper>
    </div>
  )
}

export default HeroSection
