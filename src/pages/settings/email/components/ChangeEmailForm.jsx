import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/chadcn-ui/form'
import { Input } from '@/components/chadcn-ui/input'
import { useState } from 'react'
import { Alert, AlertDescription } from '@/components/chadcn-ui/alert'
import { Button } from '@/components/chadcn-ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { changeEmail } from '@/api'
import { toast } from 'sonner'
import { changeEmailSchema } from '@/utils/formValidationSchema'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@/contexts/UserContext'

function ChangeEmailForm() {
  const form = useForm({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      newEmail: '',
      newEmailForConfirmation: '',
    },
  })
  const nav = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null)
  const { email } = useUserContext()

  async function onSubmit(data) {
    try {
      setErrorMessage(null)
      const response = await changeEmail(data)
      toast.success(response.message)
      form.reset()
      nav('/settings/email/verify-code')
    } catch (e) {
      setErrorMessage(e.response.data.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-5">
          <FormItem>
            <FormLabel className="text-border">現在のメールアドレス</FormLabel>
            <FormControl>
              <div className="relative flex items-center">
                <Input placeholder={email} disabled />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="newEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新しいメールアドレス</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newEmailForConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新しいメールアドレス（確認用）</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input {...field} />
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
          {form.formState.isSubmitting ? '確認メールを送信中...' : '確認メールを送信する'}
        </Button>
      </form>
    </Form>
  )
}

export default ChangeEmailForm
