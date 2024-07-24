import { Card, CardContent, CardTitle } from '@/components/ui/card'

function Message({ className }) {
  return (
    <Card className={className}>
      <CardTitle>/ Message</CardTitle>
      <CardContent>
        <p>本の予約はネットでできるけど、お取り寄せ・購入リクエストは紙に記入しないといけない……。</p>
        <p>
          リブラクは、そんな図書館での面倒な作業を少しだけ楽にする、図書館ヘビーユーザーの方のために作られたアプリです。
        </p>
      </CardContent>
    </Card>
  )
}

export default Message
