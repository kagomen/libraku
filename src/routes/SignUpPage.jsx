import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import SignUpForm from '@/components/sign-up-form/SignUpForm'
import { Button } from '@/components/ui/button'
import { useUserContext } from '@/context/UserContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
        <Heading>新規アカウント作成</Heading>
        <SignUpForm />
        <Button variant="link" className="mx-auto block w-fit">
          <Link to="/sign-in">ログインはこちら</Link>
        </Button>
      </ResponsiveWrapper>
    </div>
  )
}

export default SignUpPage
