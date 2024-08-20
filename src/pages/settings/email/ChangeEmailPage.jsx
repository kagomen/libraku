import Heading from '@/components/elements/Heading'
import ChangeEmailForm from './components/ChangeEmailForm'

function ChangeEmailPage() {
  return (
    <div className="container space-y-8 py-12">
      <Heading>メールアドレスの変更</Heading>
      <ChangeEmailForm />
    </div>
  )
}

export default ChangeEmailPage
