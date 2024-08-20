import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/chadcn-ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/chadcn-ui/input'
import { useState } from 'react'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/chadcn-ui/alert'
import { Button } from '@/components/chadcn-ui/button'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '@/contexts/UserContext'
import { emailVerificationCodeSchema } from '@/utils/formValidationSchema'

function VerifyVerificationCodeForm(props) {
  const [errorMessage, setErrorMessage] = useState(null)
  const nav = useNavigate()
  const { setUserId, setEmail } = useUserContext()

  const form = useForm({
    resolver: zodResolver(emailVerificationCodeSchema),
    defaultValues: {
      code: '',
    },
  })

  async function onSubmit(data) {
    try {
      const response = await props.fn(data)
      setUserId(response.userId)
      setEmail(response.newEmail)
      toast.success(response.message)
      form.reset()
      nav('/')
    } catch (e) {
      setErrorMessage(e.response.data.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>検証コード</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {errorMessage && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <Button className="relative w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? '確認中...' : '送信する'}
        </Button>
      </form>
    </Form>
  )
}

export default VerifyVerificationCodeForm