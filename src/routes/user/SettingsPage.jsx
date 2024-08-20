import ButtonIconWrapper from '@/components/elements/ButtonIconWrapper'
import Heading from '@/components/elements/Heading'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import { Alert, AlertDescription } from '@/components/chadcn-ui/alert'
import { Button } from '@/components/chadcn-ui/button'
import { useUserContext } from '@/contexts/UserContext'
import { KeyRound, Mail, UserRound } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SettingsPage() {
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
      <ResponsiveWrapper className="space-y-10 py-12">
        <Heading>アカウント設定</Heading>
        <div>
          <Button variant="outline" asChild className="relative mt-4 flex w-full">
            <Link to="/settings/user-number">
              <ButtonIconWrapper side="left">
                <UserRound />
              </ButtonIconWrapper>
              利用者番号の{cardNumber ? '変更' : '登録'}
            </Link>
          </Button>
          <Button variant="outline" asChild className="relative mt-4 flex w-full">
            <Link to="/settings/email">
              <ButtonIconWrapper side="left">
                <Mail />
              </ButtonIconWrapper>
              メールアドレスの変更
            </Link>
          </Button>
          <Button variant="outline" asChild className="relative mt-4 flex w-full">
            <Link to="/settings/password">
              <ButtonIconWrapper side="left">
                <KeyRound />
              </ButtonIconWrapper>
              パスワードの変更
            </Link>
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertDescription>
            ※ 上記の操作で問題が解決しない場合は、お手数ですが
            <Button variant="link" asChild className="mx-1 h-fit p-0 text-destructive">
              <Link to="/contact">お問い合わせページ</Link>
            </Button>
            よりお問い合わせください。
          </AlertDescription>
        </Alert>
      </ResponsiveWrapper>
    </div>
  )
}

export default SettingsPage
