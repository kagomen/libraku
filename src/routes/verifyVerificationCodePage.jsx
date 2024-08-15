import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import VerifyVerificationCodeForm from '@/components/verify-verification-code-form/VerifyVerificationCodeForm'
import { Link } from 'react-router-dom'

function VerifyVerificationCodePage() {
  return (
    <div className="py-12">
      <ResponsiveWrapper className="space-y-6">
        <Heading>検証コードの確認</Heading>
        <div>
          <p>ご入力いただいたメールアドレスに検証コードを送信しました。</p>
          <p>以下のフォームに検証コードを入力し、登録を完了させてください。</p>
        </div>
        <VerifyVerificationCodeForm />
        <Alert>
          <p>
            検証コードの有効期限は30分です。期限切れの場合は、再度
            <Button asChild variant="link" className="mx-1 h-[1rem]">
              <Link to="/sign-up">登録フォーム</Link>
            </Button>
            よりお手続きをお願いします。
          </p>
        </Alert>
      </ResponsiveWrapper>
    </div>
  )
}

export default VerifyVerificationCodePage
