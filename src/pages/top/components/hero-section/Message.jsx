import { Card, CardContent, CardTitle } from '@/components/shadcn-ui/card'

function Message({ className }) {
  return (
    <Card className={className}>
      <CardTitle>/ Message</CardTitle>
      <CardContent>
        <p>
          リブラクは、図書館でのリクエストカードを書く作業を少しだけ楽にする、図書館ユーザーの方のために作られたアプリです。
        </p>
        <p>
          読みたい本をお気に入りに登録しておくだけで、リクエストカード記入時に必要な情報が一目でわかり、スムーズに手続きができるようになります。
        </p>
      </CardContent>
    </Card>
  )
}

export default Message
