'use client'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '../../../../../public/assets/images/logo-black.png'
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from '@/lib/zodSchema'
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { z } from 'zod'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import Link from 'next/link'
import { WEBSITE_LOGIN, WEBSITE_REGISTER } from '@/routes/WebsiteRoute'

const RegisterPage = () => {
    const [loading, setLoading] = useState(false)
    const [isTypePassword, setIsTypePassword] = useState(true)
    const formSchema = zSchema.pick({
        name: true, email: true, password: true
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Password and confirm password must be same.',
        path: ['confirmPassword']
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const handleRegisterSubmit = async () => {

    }

    return (
        <Card className='w-[450px] '>
            <CardContent>
                <div className='flex justify-center'>
                    <Image src={Logo.src} width={Logo.width} height={Logo.height} alt='logo'
                        className='max-w-[100px]' />
                </div>
                <div className='text-center'>
                    <h1 className='text-2xl font-semibold text-center'>Register Account</h1>
                    <p>Login into your account by filling out the form below</p>
                </div>
                <div className='mt-1'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className='space-y-8'>
                            <div className='mb-0'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input type='text' placeholder='Full name' {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-0'>
                                <FormField
                                    control={form.control}
                                    name='email'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type='email' placeholder='abc@gmail.com' {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-0'>
                                <FormField
                                    control={form.control}
                                    name='password'
                                    render={({ field }) => (
                                        <FormItem className='relative'>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type={isTypePassword ? 'password' : 'text'} placeholder='*******' {...field} />
                                            </FormControl>
                                            <button type='button' className='absolute top-1/2 right-2 cursor-pointer'
                                                onClick={() => setIsTypePassword(!isTypePassword)}>
                                                {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-0'>
                                <FormField
                                    control={form.control}
                                    name='confirmPassword'
                                    render={({ field }) => (
                                        <FormItem className='relative'>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input type={isTypePassword ? 'password' : 'text'} placeholder='*******' {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mt-1'>
                                <ButtonLoading type='submit' text='Register' className='w-full bg-purple-600 text-white' loading={loading}/>
                            </div>
                            <div className='text-center'>
                                <div className='flex justify-center items-center gap-1'>
                                    <p>Already have account?</p>
                                    <Link href={WEBSITE_LOGIN} className='text-primary underline'>Login!</Link>
                                </div>
                       
                            </div>
                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card>
    )
}

export default RegisterPage