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
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
import { registerAuth } from '@/api/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
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

const RegisterPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  })

  const handleSubmit = async (values) => {
    try {
      setLoading(true)
      const res = await registerAuth({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })
      toast.success('Account created! Please verify your email.')
      router.push(`/auth/verify-email?email=${encodeURIComponent(values.email)}&type=REGISTER`)
    } catch (err) {
      toast.error(err?.response?.data?.message ?? 'Registration failed')
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
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="text-sm text-muted-foreground">Fill in the form to get started</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl><Input placeholder="John" {...field} /></FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )} />
              <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="your@email.com" {...field} /></FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <div className="flex items-center">
                  <FormControl>
                    <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                  </FormControl>
                  <button type="button" className="absolute right-3 top-9 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
                <FormMessage className="text-red-500" />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )} />
            <ButtonLoading type="submit" text="Register" className="w-full bg-purple-600 text-white" loading={loading} />
            <div className="text-center text-sm flex justify-center gap-1">
              <span>Already have an account?</span>
              <Link href={WEBSITE_LOGIN} className="text-primary underline">Login</Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default RegisterPage
