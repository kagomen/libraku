import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import SignUpForm from '@/components/sign-up-form/SignUpForm'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function SignUpPage() {
  return (
    <div className="bg-background py-12">
      <ResponsiveWrapper className="space-y-8">
        <Heading>ユーザー登録</Heading>
        <SignUpForm />
        <Button variant="link" className="mx-auto block w-fit">
          <Link to="/sign-in">ログインはこちら</Link>
        </Button>
      </ResponsiveWrapper>
    </div>
  )
}

export default SignUpPage
