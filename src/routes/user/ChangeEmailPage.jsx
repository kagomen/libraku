import ChangeEmailForm from '@/components/forms/ChangeEmailForm'
import Heading from '@/components/elements/Heading'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'

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
