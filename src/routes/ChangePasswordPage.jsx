import ChangePasswordForm from '@/components/change-password-form/ChangePasswordForm'
import Heading from '@/components/Heading'
import ResponsiveWrapper from '@/components/ResponsiveWrapper'
import { useUserContext } from '@/context/UserContext'
import { useUserInfo } from '@/lib/api'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <div className="py-12">
      <ResponsiveWrapper className="space-y-8">
        <Heading>パスワードの変更</Heading>
        <ChangePasswordForm />
      </ResponsiveWrapper>
    </div>
  )
}

export default ChangePasswordPage
