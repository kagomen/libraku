import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signUpSchema } from './signUpSchema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { signUp } from '@/lib/api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '../ui/alert'
import { useUserContext } from '@/context/UserContext'

function SignUpForm() {
  const nav = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)
  const { setUserId } = useUserContext()

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordForConfirmation: '',
    },
  })

  async function onSubmit(data) {
    try {
      const response = await signUp(data)
      setUserId(response.data.userId)
      toast.success('アカウントを作成しました')
      nav('/')
    } catch (e) {
      setErrorMessage(e.response.data.error)
    }
  }

  const [showPassword, setShowPassword] = useState(false)

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
                  <Input {...field} />
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
                    <Input {...field} type={showPassword ? 'text' : 'password'} />
                    <TogglePasswordVisibilityButton />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordForConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード（確認用）</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input {...field} type={showPassword ? 'text' : 'password'} />
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
          {form.formState.isSubmitting ? 'アカウント作成中...' : '上記の内容で登録する'}
        </Button>
      </form>
    </Form>
  )
}

export default SignUpForm
