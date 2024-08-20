import ChangeEmailForm from '@/components/change-email-form/ChangeEmailForm'
import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'

function ChangeEmailPage() {
  return (
    <div className="py-12">
      <ResponsiveWrapper className="space-y-8">
        <Heading>メールアドレスの変更</Heading>
        <ChangeEmailForm />
      </ResponsiveWrapper>
    </div>
  )
}

export default ChangeEmailPage
