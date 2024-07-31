import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signInSchema } from './signInSchema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useUserContext } from '@/context/UserContext'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Alert, AlertDescription } from '../ui/alert'
import { signIn } from '@/lib/api'

function SignInForm() {
  const { setUserId } = useUserContext()
  const nav = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)

  async function onSubmit(data) {
    try {
      const response = await signIn(data)
      setUserId(response.data.userId)
      toast.success('ログインしました')
      nav('/')
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
                  <Input {...field} name="email" autocomplete="email" />
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
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autocomplete="password"
                    />
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
        <Button className="relative w-full">ログインする</Button>
      </form>
    </Form>
  )
}

export default SignInForm
