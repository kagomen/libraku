import Heading from '@/components/elements/Heading'
import { Alert } from '@/components/shadcn-ui/alert'
import { verifyCodeForChangeEmail } from '@/api'
import VerifyVerificationCodeForm from '@/components/elements/VerifyVerificationCodeForm'
import { useUserContext } from '@/contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/elements/Loading'

function VerifyCodeForChangeEmailPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()

  if (userId === null) {
    nav('/')
  }

  if (userId === undefined) {
    return <Loading />
  }
  return (
    <div className="container space-y-6 py-12">
      <Heading>メールアドレスの変更</Heading>
      <div>
        <p>ご入力いただいたメールアドレスに検証コードを送信しました。</p>
        <p>以下のフォームに検証コードを入力し、メールアドレスの変更を完了させてください。</p>
      </div>
      <VerifyVerificationCodeForm fn={verifyCodeForChangeEmail} />
      <Alert>
        <p>検証コードの有効期限は発行から30分です。期限切れの場合は、お手数ですが初めからやり直してください。</p>
      </Alert>
    </div>
  )
}

export default VerifyCodeForChangeEmailPage
