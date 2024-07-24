import { Card, CardContent, CardTitle } from '@/components/ui/card'
import SearchBar from '../SearchBar'
import BookEmoji from './BookEmoji'

function HeroSection() {
  return (
    <div className="bg-white ">
      <div className="relative z-10 flex flex-col gap-8 px-5 py-12 pt-56">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-primary">図書館をもっと便利に。</h2>
          <p>図書館ユーザーのための書籍検索アプリ</p>
        </div>
        <SearchBar className="bg-white/50 backdrop-blur" />
        <Card className="bg-white/50 backdrop-blur">
          <CardTitle>/ Message</CardTitle>
          <CardContent>
            <p>本の予約はネットでできるけど、お取り寄せ・購入リクエストは紙に記入しないといけない……。</p>
            <p>
              リブラクは、そんな図書館での面倒な作業を少しだけ楽にする、図書館ヘビーユーザーの方のために作られたアプリです。
            </p>
          </CardContent>
        </Card>
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
    </div>
  )
}

export default HeroSection
