import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { signInSchema } from './signInSchema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data) {
    console.log('data', data)
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
        <Button className="relative w-full">ログインする</Button>
      </form>
    </Form>
  )
}

export default SignInForm
