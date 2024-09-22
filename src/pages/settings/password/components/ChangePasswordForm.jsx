import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn-ui/form'
import { Input } from '@/components/shadcn-ui/input'
import { useState } from 'react'
import TogglePasswordVisibilityButton from '@/components/elements/TogglePasswordVisibilityButton'
import { Alert, AlertDescription } from '@/components/shadcn-ui/alert'
import { Button } from '@/components/shadcn-ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '@/utils/formValidationSchema'
import { changePassword } from '@/api'
import { toast } from 'sonner'
import { useUserContext } from '@/contexts/UserContext'

function ChangePasswordForm() {
  const { isTestAccount } = useUserContext()
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordForConfirmation: '',
    },
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  async function onSubmit(data) {
    try {
      setErrorMessage(null)
      const response = await changePassword(data)
      toast.success(response.message)
      form.reset()
    } catch (e) {
      setErrorMessage(e.response.data.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>現在のパスワード</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input {...field} type={showPassword ? 'text' : 'password'} />
                    <TogglePasswordVisibilityButton showPassword={showPassword} setShowPassword={setShowPassword} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新しいパスワード</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input {...field} type={showPassword ? 'text' : 'password'} />
                    <TogglePasswordVisibilityButton showPassword={showPassword} setShowPassword={setShowPassword} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPasswordForConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新しいパスワード（確認用）</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input {...field} type={showPassword ? 'text' : 'password'} />
                    <TogglePasswordVisibilityButton showPassword={showPassword} setShowPassword={setShowPassword} />
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
        <Button className="relative w-full" disabled={form.formState.isSubmitting || isTestAccount}>
          {isTestAccount
            ? 'テストユーザーは変更できません'
            : form.formState.isSubmitting
              ? 'パスワードを変更中...'
              : 'パスワードを変更する'}
        </Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm
