import Heading from '@/components/elements/Heading'
import ChangeEmailForm from './components/ChangeEmailForm'
import { useUserContext } from '@/contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import Loading from '@/components/elements/Loading'

function ChangeEmailPage() {
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
      <Heading>メールアドレスの変更</Heading>
      <ChangeEmailForm />
    </div>
  )
}

export default ChangeEmailPage
