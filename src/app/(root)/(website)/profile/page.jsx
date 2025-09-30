'use client'
import UserPanelLayout from '@/components/Application/Website/UserPanelLayout'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { zSchema } from '@/lib/zodSchema'
import { USER_PROFILE } from '@/routes/WebsiteRoute'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingBag } from 'react-icons/hi2'
import { IoCartOutline } from 'react-icons/io5'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/Application/ButtonLoading'
import Select from '@/components/Application/Admin/Select'
import Dropzone from 'react-dropzone'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import userIcon from '@public/assets/images/user.png'
import { FaCamera } from 'react-icons/fa'
import { fi } from 'zod/v4/locales'
import { showToast } from '@/lib/showToast'

const breadcrumb = {
    title: 'Profile',
    links: [
        { label: "Profile", href: USER_PROFILE },
    ]
}
const ProfilePage = () => {
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState()
    const [file, setFile] = useState()
    const formSchema = zSchema.pick({
        name: true,
        phone: true,
        address: true
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: '',
            address: '',

        }
    })
    const user = null
    useEffect(() => {
        if (user && user.success) {
            const userData = user.data
            form.reset({
                name: userData?.name,
                phone: userData?.phone,
                address: userData?.address
            })
            setPreview(userData?.avatar)
        }
    }, [user])

    const updateProfile = () => {
        console.log("toast")
        showToast('error', "Thanh cong")
    }

    const handleFileSelection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setPreview(preview)
        setFile(file)
    }

    return (
        <div>
            <WebsiteBreadcrumb props={breadcrumb} />

            <UserPanelLayout>
                <div className='shadow rounded'>
                    <div className='p-5 text-xl text-center font-semibold border mb-5'>
                        PROFILE
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(updateProfile)} className='grid md:grid-cols-2 gap-5 p-2'>
                            <div className='md:col-span-2 col-span-1 flex justify-center items-center'>
                                <Dropzone onDrop={acceptedFile => handleFileSelection(acceptedFile)}>
                                    {({getRootProps, getInputProps}) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()}/>
                                            <Avatar className='w-28 h-28 relative group border border-gray-100'>
                                                <AvatarImage src={preview ? preview : userIcon.src} />
                                                <div className='absolute z-50 w-full h-full top-1/2 left-1/2
                                                -translate-x-1/2 -translate-y-1/2 justity-center items-center border-2
                                                border-violet-500 rounded-full group-hover:flex hidden cursor-pointer'>
                                                    <FaCamera color='#7c3aed'/>
                                                </div>
                                            </Avatar>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                            <div className='mb-1'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Your Name <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type='text' placeholder='Enter your name' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-1'>
                                <FormField
                                    control={form.control}
                                    name='phone'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input type='text' placeholder='Enter your phone' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-1 '>
                                <FormField
                                    control={form.control}
                                    name='address'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Input type='text' className='placeholder-italic placeholder-gray-400' placeholder='Enter address' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        
                            <div className='mb-3 md:col-span-2 col-span-1 '>
                                <ButtonLoading
                                    loading={loading} type='submit' text='Save Profile'
                                    className='cursor bg-[#7d1cc7]'
                                />
                            </div>
                        </form>
                    </Form>
                </div>
            </UserPanelLayout>
        </div>
    )
}

export default ProfilePage