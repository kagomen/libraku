import Heading from '@/components/elements/Heading'
import { useUserContext } from '@/contexts/UserContext'
import { useUserInfo } from '@/hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangePasswordForm from './components/ChangePasswordForm'

function ChangePasswordPage() {
  const { data, isLoading } = useUserInfo()
  const { setUserId } = useUserContext()
  const nav = useNavigate()

  useEffect(() => {
    if (!isLoading && data) {
      setUserId(data.userId)
    } else {
      setUserId(null)
      nav('/')
    }
  }, [data, isLoading, setUserId, nav])

  return (
    <div className="container space-y-8 py-12">
      <Heading>パスワードの変更</Heading>
      <ChangePasswordForm />
    </div>
  )
}

export default ChangePasswordPage
