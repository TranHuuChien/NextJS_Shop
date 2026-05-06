'use client'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '../../../../../public/assets/images/logo-black.png'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import Link from 'next/link'
import { WEBSITE_REGISTER, WEBSITE_RESETPASSWORD } from '@/routes/WebsiteRoute'
import useAuth from '@/hooks/useAuth'

const formSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

const LoginPage = () => {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { username: '', password: '' },
  })

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      await login(values)
    } catch {
      // error toast handled in AuthContext
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[450px]">
      <CardContent>
        <div className="flex justify-center pt-4">
          <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="logo" className="max-w-[100px]" />
        </div>
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold">Login to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials below</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username / Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <div className="flex items-center">
                    <FormControl>
                      <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                    </FormControl>
                    <button
                      type="button"
                      className="absolute right-3 top-9 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <ButtonLoading type="submit" text="Login" className="w-full bg-purple-600 text-white" loading={loading} />
            <div className="flex justify-between text-sm">
              <div className="flex gap-1">
                <span>No account?</span>
                <Link href={WEBSITE_REGISTER} className="text-primary underline">Register</Link>
              </div>
              <Link href={WEBSITE_RESETPASSWORD} className="text-primary underline">Forgot password?</Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default LoginPage
