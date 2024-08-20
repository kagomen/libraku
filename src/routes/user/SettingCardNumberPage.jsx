import Content from '@/components/book-detail-page/Content'
import Title from '@/components/book-detail-page/Title'
import ColumnTitle from '@/components/elements/ColumnTitle'
import Heading from '@/components/elements/Heading'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import SettingUserNumberForm from '@/components/forms/SettingUserNumberForm'
import { Card, CardContent } from '@/components/chadcn-ui/card'
import { useUserContext } from '@/contexts/UserContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SettingCardNumberPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()

  useEffect(() => {
    if (!userId) {
      nav('/')
    }
  }, [nav, userId])

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
      </ResponsiveWrapper>
    </div>
  )
}

export default SettingCardNumberPage
