import ColumnTitle from '@/components/ColumnTitle'
import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import SettingUserNumberForm from '@/components/setting-user-number-form/SettingUserNumberForm'
import { Card, CardContent } from '@/components/ui/card'

function SettingUserNumberPage() {
  return (
    <div className="bg-background">
      <ResponsiveWrapper className="space-y-12 py-12">
        {/* フォームセクション */}
        <section className="space-y-6">
          <Heading>利用者番号の設定</Heading>
          <SettingUserNumberForm />
        </section>
        {/* アバウトセクション */}
        <section>
          <Card>
            <ColumnTitle>利用者番号とは？</ColumnTitle>
            <CardContent className="mt-6">
              希望の本が市内の図書館で扱っていない場合、リクエストカードを記入して、図書館に本の購入をリクエストすることができます。
              <br />
              利用者番号をリブラクに登録しておくと、書籍ページで利用者番号が表示されるようになり、図書館でのリクエストカードの記入がよりスムーズになります！
            </CardContent>
          </Card>
        </section>
      </ResponsiveWrapper>
    </div>
  )
}

export default SettingUserNumberPage
