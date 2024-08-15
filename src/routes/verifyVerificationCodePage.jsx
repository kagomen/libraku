import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import VerifyVerificationCodeForm from '@/components/verify-verification-code-form/VerifyVerificationCodeForm'

function VerifyVerificationCodePage() {
  return (
    <div className="py-12">
      <ResponsiveWrapper>
        <Heading>検証コードの確認</Heading>
        <VerifyVerificationCodeForm />
      </ResponsiveWrapper>
    </div>
  )
}

export default VerifyVerificationCodePage
