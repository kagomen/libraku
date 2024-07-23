import { Card, CardContent, CardTitle } from '@/components/ui/card'
import SearchBar from '../SearchBar'

function HeroSection() {
  return (
    <div className="bg-white ">
      <div className="relative z-10 flex flex-col gap-8 px-5 py-12 pt-56">
        <div className="text-center">
          <h2 className="text-xl font-medium text-primary">図書館をもっと便利に。</h2>
          <p>図書館ユーザーのための書籍検索アプリ</p>
        </div>
        <SearchBar />
        <Card>
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
        <span className="font-NotoColorEmoji animate-float-slow fixed -left-8 top-44 -rotate-[16deg] transform text-[220px] leading-[0]">
          📖
        </span>
        <span className="font-NotoColorEmoji animate-float-medium fixed right-0 top-[40%] rotate-[24deg] text-[120px]">
          📙
        </span>
        <span className="font-NotoColorEmoji animate-float-fast fixed -left-6 top-[70%] rotate-[-32deg] text-[180px]">
          📗
        </span>
      </div>
    </div>
  )
}

export default HeroSection
