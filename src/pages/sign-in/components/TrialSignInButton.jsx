import { signIn } from '@/api'
import { Button } from '@/components/shadcn-ui/button'
import { useUserContext } from '@/contexts/UserContext'
import { toast } from 'sonner'

function TrialSignInButton() {
  const trialAccountData = {
    email: 'magya508@ruru.be',
    password: 'password',
  }
  const { setUserId, setEmail, setCardNumber } = useUserContext()
  async function handleTrialLogin() {
    try {
      const { userId, cardNumber, email } = await signIn(trialAccountData)
      setUserId(userId)
      setCardNumber(cardNumber)
      setEmail(email)
      toast.success('ログインしました')
    } catch (e) {
      toast.error(e.response.data.error)
    }
  }
  return (
    <Button className="relative w-full" variant="outline" onClick={handleTrialLogin}>
      テストユーザーとしてログインする
    </Button>
  )
}

export default TrialSignInButton
