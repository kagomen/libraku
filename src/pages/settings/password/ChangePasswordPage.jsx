import Heading from '@/components/elements/Heading'
import ChangePasswordForm from './components/ChangePasswordForm'
import { useUserContext } from '@/contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/elements/Loading'

function ChangePasswordPage() {
  const { userId } = useUserContext()
  const nav = useNavigate()

  if (userId === null) {
    nav('/')
  }

  if (userId === undefined) {
    return <Loading />
  }
  return (
    <div className="container space-y-8 py-12">
      <Heading>パスワードの変更</Heading>
      <ChangePasswordForm />
    </div>
  )
}

export default ChangePasswordPage
