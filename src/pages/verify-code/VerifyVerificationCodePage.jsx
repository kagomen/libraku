import Heading from '@/components/elements/Heading'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import { Alert } from '@/components/chadcn-ui/alert'
import { verifyCodeForSignUp } from '@/api/api'
import VerifyVerificationCodeForm from '@/components/elements/VerifyVerificationCodeForm'

function VerifyVerificationCodePage() {
  return (
    <div className="py-12">
      <ResponsiveWrapper className="space-y-6">
        <Heading>新規ユーザー登録</Heading>
        <div>
          <p>ご入力いただいたメールアドレスに検証コードを送信しました。</p>
          <p>以下のフォームに検証コードを入力し、ユーザー登録を完了させてください。</p>
        </div>
        <VerifyVerificationCodeForm fn={verifyCodeForSignUp} />
        <Alert>
          <p>検証コードの有効期限は発行から30分です。期限切れの場合は、お手数ですが初めからやり直してください。</p>
        </Alert>
      </ResponsiveWrapper>
    </div>
  )
}

export default VerifyVerificationCodePage