import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { API_ENDPOINTS } from '@/config/api'

type ForgotFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' })
})

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // Panggil API forgot password melalui Electron
      const response = await window.api.request(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: 'POST',
        data: {
          email: data.email,
          redirectTo: '/reset-password'
        }
      })

      if (response.status === true) {
        toast.success(
          'If the email exists in our database, an email will be sent to your inbox to reset your password.'
        )
        navigate({ to: '/sign-in' })
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      toast.error('An error occurred while processing your request')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" type="submit" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Continue'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
