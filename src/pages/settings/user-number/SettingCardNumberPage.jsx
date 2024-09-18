import Content from '@/pages/book/components/Content'
import Title from '@/pages/book/components/Title'
import ColumnTitle from '@/components/elements/ColumnTitle'
import Heading from '@/components/elements/Heading'
import { Card, CardContent } from '@/components/chadcn-ui/card'
import { useUserContext } from '@/contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import SettingUserNumberForm from './components/SettingUserNumberForm'
import Loading from '@/components/elements/Loading'

function SettingCardNumberPage() {
  const { userId, cardNumber } = useUserContext()
  const nav = useNavigate()

  if (userId === null) {
    nav('/')
  }

  if (userId === undefined) {
    return <Loading />
  }
  return (
    <div className="container space-y-12 py-12">
      {/* フォームセクション */}
      <section className="space-y-6">
        <Heading>利用者番号の{cardNumber ? '変更' : '登録'}</Heading>
        <SettingUserNumberForm />
      </section>
      {/* アバウトセクション */}
      <section>
        <Card>
          <ColumnTitle>利用者番号とは？</ColumnTitle>
          <CardContent className="mt-6 space-y-6">
            <div>
              リクエストカードを記入して、図書館に本の購入をリクエストすることができます。
              <br />
              リブラクで利用者番号を登録しておくと、図書館でのリクエストカードの記入がよりスムーズになります！
            </div>
            <div>
              <Title>利用者番号</Title>
              <Content>例：123-456-7890</Content>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default SettingCardNumberPage
