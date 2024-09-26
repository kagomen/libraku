import { signIn } from '@/api'
import { Button } from '@/components/shadcn-ui/button'
import { useUserContext } from '@/contexts/UserContext'
import { TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PASSWORD } from '@/utils/constants'
import { toast } from 'sonner'

function TrialSignInButton() {
  const trialAccountData = {
    email: TEST_ACCOUNT_EMAIL,
    password: TEST_ACCOUNT_PASSWORD,
  }
  const { setUserId, setEmail, setCardNumber, setIsTestAccount } = useUserContext()
  async function handleTrialLogin() {
    try {
      const { userId, cardNumber, email } = await signIn(trialAccountData)
      setUserId(userId)
      setCardNumber(cardNumber)
      setEmail(email)
      setIsTestAccount(true)
      toast.success('ログインしました')
    } catch (e) {
      toast.error(e.response.data.error)
    }
  }
  return (
    <div>
      <p className="mb-1 text-center">テスト用アカウントでログインできます</p>
      <Button className="relative w-full" variant="outline" onClick={handleTrialLogin}>
        まずは試してみる
      </Button>
    </div>
  )
}

export default TrialSignInButton
