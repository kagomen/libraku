import Heading from '@/components/elements/Heading'
import ResponsiveWrapper from '@/components/elements/ResponsiveWrapper'
import { Button } from '@/components/chadcn-ui/button'
import { useUserContext } from '@/contexts/UserContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SignUpForm from './components/SignUpForm'

function SignUpPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()

  useEffect(() => {
    if (userId) {
      nav('/')
    }
  }, [nav, userId])

  return (
    <div className="py-12">
      <ResponsiveWrapper className="space-y-8">
        <Heading>新規ユーザー登録</Heading>
        <SignUpForm />
        <Button variant="link" className="mx-auto block w-fit">
          <Link to="/sign-in">ログインはこちら</Link>
        </Button>
      </ResponsiveWrapper>
    </div>
  )
}

export default SignUpPage