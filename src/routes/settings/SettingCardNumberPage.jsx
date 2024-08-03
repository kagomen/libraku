import Content from '@/components/book-detail-page/Content'
import Title from '@/components/book-detail-page/Title'
import ColumnTitle from '@/components/ColumnTitle'
import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import SettingUserNumberForm from '@/components/setting-user-number-form/SettingUserNumberForm'
import { Card, CardContent } from '@/components/ui/card'
import { useUserContext } from '@/context/UserContext'

function SettingCardNumberPage() {
  const { cardNumber } = useUserContext()
  return (
    <div className="bg-background">
      <ResponsiveWrapper className="space-y-12 py-12">
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
                リクエストカードを記入すると、図書館に本の購入をリクエストすることができます。
                <br />
                利用者番号を登録すると、図書館でのリクエストカードの記入がよりスムーズになります！
              </div>
              <div>
                <Title>利用者番号</Title>
                <Content>例：123-456-7890</Content>
              </div>
            </CardContent>
          </Card>
        </section>
      </ResponsiveWrapper>
    </div>
  )
}

export default SettingCardNumberPage
