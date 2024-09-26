import Heading from '@/components/elements/Heading'
import { Button } from '@/components/shadcn-ui/button'
import { useUserContext } from '@/contexts/UserContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import TrialSignInButton from '../sign-in/components/TrialSignInButton'

function SignUpPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()

  useEffect(() => {
    if (userId) {
      nav('/')
    }
  }, [nav, userId])

  return (
    <div className="container space-y-8 py-12">
      <Heading>新規ユーザー登録</Heading>
      <SignUpForm />
      <div>
        <TrialSignInButton />
      </div>
      <Button variant="link" className="mx-auto block w-fit">
        <Link to="/sign-in">登録済みの方はこちら</Link>
      </Button>
    </div>
  )
}

export default SignUpPage
