import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'
import { Button } from '@/components/shadcn-ui/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useUserContext } from '@/contexts/UserContext'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/shadcn-ui/alert'
import { signIn } from '@/api'
import { signInSchema } from '@/utils/formValidationSchema'

function SignInForm() {
  const { setUserId, setEmail, setCardNumber } = useUserContext()
  const [errorMessage, setErrorMessage] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  async function onSubmit(data) {
    try {
      const { userId, email, cardNumber } = await signIn(data)
      setUserId(userId)
      setCardNumber(cardNumber)
      setEmail(email)
      toast.success('ログインしました')
    } catch (e) {
      setErrorMessage(e.response.data.error)
    }
  }

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function TogglePasswordVisibilityButton() {
    return (
      <Button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-1 h-[1.5rem] px-2"
        variant="ghost"
      >
        {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
      </Button>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input {...field} name="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input {...field} type={showPassword ? 'text' : 'password'} name="password" />
                    <TogglePasswordVisibilityButton />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {errorMessage && (
          <Alert variant="destructive">
            {/* <AlertTitle>/ Error</AlertTitle> */}
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <Button className="relative w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'ログイン中...' : 'ログインする'}
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
