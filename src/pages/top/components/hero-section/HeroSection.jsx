import UpMotion from '@/components/motions/UpMotion'
import SearchBar from '@/components/elements/SearchBar'
import BookEmoji from './BookEmoji'
import Message from './Message'

function HeroSection() {
  return (
    <div className="container pb-14">
      <div className="relative z-10 flex flex-col gap-12 pt-56">
        <UpMotion delay="0">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-primary">図書館をもっと便利に。</h2>
            <p>図書館ユーザーのための書籍検索アプリ</p>
          </div>
        </UpMotion>
        <UpMotion delay="0.4">
          <div>
            <label htmlFor="searchKeyword" className="mb-1 block pl-1 text-sm">
              本をさがす
            </label>
            <SearchBar className="bg-white/50 py-6 backdrop-blur" />
          </div>
        </UpMotion>
        <UpMotion delay="0.8">
          <Message className="bg-white/50 backdrop-blur" />
        </UpMotion>
      </div>
      <BookEmoji />
    </div>
  )
}

export default HeroSection
