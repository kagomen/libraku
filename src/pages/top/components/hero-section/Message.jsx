import { Card, CardContent, CardTitle } from '@/components/shadcn-ui/card'

function Message({ className }) {
  return (
    <Card className={className}>
      <CardTitle>/ Message</CardTitle>
      <CardContent>
        <p>本の予約はネットでできるけど、お取り寄せや購入リクエストは紙に記入しないといけない……。</p>
        <p>リブラクは、そんな図書館での面倒な作業を少しだけ楽にする、図書館ユーザーの方のために作られたアプリです。</p>
        <p>
          読みたい本をお気に入りに登録しておくだけで、リクエストカードを記入するときに必要な情報が一目でわかり、スムーズに手続きができるようになります。
        </p>
      </CardContent>
    </Card>
  )
}

export default Message
