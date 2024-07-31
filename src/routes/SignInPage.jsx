import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import SignInForm from '@/components/sign-in-form/SignInForm'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

function SignInPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()
  if (userId) {
    nav('/')
  }

  return (
    <div className="bg-background py-12">
      <ResponsiveWrapper className="space-y-8">
        <Heading>ログイン</Heading>
        <SignInForm />
        <Button variant="link" className="mx-auto block w-fit">
          <Link to="/sign-up">ユーザー登録はこちら</Link>
        </Button>
      </ResponsiveWrapper>
    </div>
  )
}

export default SignInPage
