import Heading from '@/components/elements/Heading'
import { Button } from '@/components/chadcn-ui/button'
import { useUserContext } from '@/contexts/UserContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignInForm from './components/SignInForm'

function SignInPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()

  useEffect(() => {
    if (userId) {
      nav('/')
    }
  }, [nav, userId])

  return (
    <div className="container space-y-8 py-12">
      <Heading>ログイン</Heading>
      <SignInForm />
      <Button variant="link" className="mx-auto block w-fit">
        <Link to="/sign-up">ユーザー登録はこちら</Link>
      </Button>
    </div>
  )
}

export default SignInPage
