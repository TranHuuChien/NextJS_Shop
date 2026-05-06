'use client'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { resendOtpAuth, resendForgotPasswordOtp, verifyOtpAuth } from '@/api/auth'
import { toast } from 'react-toastify'
import { WEBSITE_LOGIN, WEBSITE_RESETPASSWORD } from '@/routes/WebsiteRoute'

const VerifyEmailPage = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') ?? ''
  const type = searchParams.get('type') ?? 'REGISTER' // REGISTER | FORGOT_PASSWORD

  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  const handleVerify = async (e) => {
    e.preventDefault()
    if (!otp) return toast.error('Please enter the OTP')
    try {
      setLoading(true)
      await verifyOtpAuth({ email, otp, type })
      toast.success('Email verified successfully!')
      if (type === 'FORGOT_PASSWORD') {
        router.push(`${WEBSITE_RESETPASSWORD}?email=${encodeURIComponent(email)}`)
      } else {
        router.push(WEBSITE_LOGIN)
      }
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      setResending(true)
      if (type === 'FORGOT_PASSWORD') {
        await resendForgotPasswordOtp({ email })
      } else {
        await resendOtpAuth({ email })
      }
      toast.success('OTP resent to your email')
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Failed to resend OTP')
    } finally {
      setResending(false)
    }
  }

  return (
    <Card className="w-[420px]">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Verify your email</h1>
          <p className="text-sm text-muted-foreground mt-1">
            We sent a 6-digit OTP to <span className="font-medium">{email}</span>
          </p>
        </div>
        <form onSubmit={handleVerify} className="space-y-4">
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            className="text-center text-lg tracking-widest"
          />
          <ButtonLoading type="submit" text="Verify" className="w-full bg-purple-600 text-white" loading={loading} />
          <div className="text-center text-sm">
            <span>Didn't receive it? </span>
            <button type="button" onClick={handleResend} disabled={resending}
              className="text-primary underline disabled:opacity-50">
              {resending ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default VerifyEmailPage
