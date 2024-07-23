import { Card, CardContent, CardTitle } from '@/components/ui/card'
import SearchBar from '../SearchBar'

function HeroSection() {
  return (
    <div className="flex flex-col gap-8 bg-white px-5 py-12">
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
  )
}

export default HeroSection
