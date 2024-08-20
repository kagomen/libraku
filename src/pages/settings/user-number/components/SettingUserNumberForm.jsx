import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/chadcn-ui/form'
import { Input } from '@/components/chadcn-ui/input'
import { Button } from '@/components/chadcn-ui/button'
import { useState } from 'react'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/chadcn-ui/alert'
import { getCardNumber, registerCardNumber, updateCardNumber } from '@/api'
import { useUserContext } from '@/contexts/UserContext'
import { cardNumberSchema } from '@/utils/formValidationSchema'

function SettingUserNumberForm() {
  const [errorMessage, setErrorMessage] = useState(null)
  const { cardNumber, setCardNumber } = useUserContext()

  const form = useForm({
    resolver: zodResolver(cardNumberSchema),
    defaultValues: {
      cardNumber: '',
    },
  })

  async function onSubmit(data) {
    try {
      await (cardNumber ? updateCardNumber(data) : registerCardNumber(data))
      const response = await getCardNumber()
      setCardNumber(response.cardNumber)
      toast.success(cardNumber ? '利用者番号を変更しました' : '利用者番号を登録しました')
      form.reset()
    } catch (e) {
      setErrorMessage(e.response.data.error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
        <div className="space-y-5">
          {cardNumber && (
            <FormItem>
              <FormLabel className="text-border">登録中の利用者番号</FormLabel>
              <FormControl>
                <Input disabled placeholder={cardNumber} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{cardNumber && '新しい'}利用者番号</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="例：12345678" />
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
          {cardNumber ? '変更する' : form.formState.isSubmitting ? '登録中...' : '上記の内容で登録する'}
        </Button>
      </form>
    </Form>
  )
}

export default SettingUserNumberForm
