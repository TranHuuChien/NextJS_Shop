'use client'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { forgotPasswordAuth, resetPasswordAuth } from '@/api/auth'
import { toast } from 'react-toastify'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import Link from 'next/link'

// Step 1: enter email → send OTP
const emailSchema = z.object({
  email: z.string().email('Invalid email'),
})

// Step 2: enter OTP + new password
const resetSchema = z.object({
  otp: z.string().min(1, 'OTP is required'),
  password: z
    .string()
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[0-9]/, 'Must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

const ResetPasswordPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  // If coming from verify-email flow, email is pre-filled
  const emailFromQuery = searchParams.get('email') ?? ''

  const [step, setStep] = useState(emailFromQuery ? 2 : 1)
  const [email, setEmail] = useState(emailFromQuery)
  const [loading, setLoading] = useState(false)

  const emailForm = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  })

  const resetForm = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: '', password: '', confirmPassword: '' },
  })

  const handleSendOtp = async (values) => {
    try {
      setLoading(true)
      await forgotPasswordAuth({ email: values.email })
      setEmail(values.email)
      toast.success('OTP sent to your email')
      router.push(`/auth/verify-email?email=${encodeURIComponent(values.email)}&type=FORGOT_PASSWORD`)
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async (values) => {
    try {
      setLoading(true)
      await resetPasswordAuth({ email, otp: values.otp, password: values.password })
      toast.success('Password reset successfully!')
      router.push(WEBSITE_LOGIN)
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[450px]">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">
            {step === 1 ? 'Forgot password' : 'Reset password'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {step === 1
              ? 'Enter your email to receive a reset OTP'
              : `Enter the OTP sent to ${email} and your new password`}
          </p>
        </div>

        {step === 1 ? (
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleSendOtp)} className="space-y-4">
              <FormField control={emailForm.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )} />
              <ButtonLoading type="submit" text="Send OTP" className="w-full bg-purple-600 text-white" loading={loading} />
              <div className="text-center text-sm">
                <Link href={WEBSITE_LOGIN} className="text-primary underline">Back to login</Link>
              </div>
            </form>
          </Form>
        ) : (
          <Form {...resetForm}>
            <form onSubmit={resetForm.handleSubmit(handleReset)} className="space-y-4">
              <FormField control={resetForm.control} name="otp" render={({ field }) => (
                <FormItem>
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="6-digit code" maxLength={6} className="tracking-widest text-center" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )} />
              <FormField control={resetForm.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )} />
              <FormField control={resetForm.control} name="confirmPassword" render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )} />
              <ButtonLoading type="submit" text="Reset Password" className="w-full bg-purple-600 text-white" loading={loading} />
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}

export default ResetPasswordPage
