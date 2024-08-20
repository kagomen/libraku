import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import { Alert } from '@/components/chadcn-ui/alert'
import VerifyVerificationCodeForm from '@/components/verify-verification-code-form/VerifyVerificationCodeForm'
import { verifyCodeForChangeEmail } from '@/api/api'

function VerifyCodeForChangeEmailPage() {
  return (
    <div className="py-12">
      <ResponsiveWrapper className="space-y-6">
        <Heading>メールアドレスの変更</Heading>
        <div>
          <p>ご入力いただいたメールアドレスに検証コードを送信しました。</p>
          <p>以下のフォームに検証コードを入力し、メールアドレスの変更を完了させてください。</p>
        </div>
        <VerifyVerificationCodeForm fn={verifyCodeForChangeEmail} />
        <Alert>
          <p>検証コードの有効期限は発行から30分です。期限切れの場合は、お手数ですが初めからやり直してください。</p>
        </Alert>
      </ResponsiveWrapper>
    </div>
  )
}

export default VerifyCodeForChangeEmailPage
