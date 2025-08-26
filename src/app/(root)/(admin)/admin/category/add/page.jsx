'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from '@/lib/zodSchema'
import { z } from 'zod'
import slugify from "slugify";
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/Application/ButtonLoading'
import axios from 'axios'
import Error from 'next/error'

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_CATEGORY_SHOW, label: 'Category' },
    { href: ADMIN_CATEGORY_ADD, label: "Add Category" }
]

const AddCategory = () => {
    const [loading, setLoading] = useState(false)
    const formSchema = zSchema.pick({
        name: true,
        slug: true
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: ""
        }
    })
    useEffect(() => {
        const name = form.getValues()
        // if (name) {
        //     form.setValue('slug', slugify(name).toLowerCase())
        // }
    }, [form.watch('name')])
    const onSubmit = async (values) => {
        setLoading(true)
        try {
            const { data: response } = await axios.post('/api/category/', values)
            if (!response.success) {
                throw new Error(response.message)
            }
            form.reset()
        } catch (error) {

        }
    }
    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />

            <Card className='py-0 rounded shadow-sm mx-5'>
                <CardHeader className='pt-3 px-3 border-b'>
                    <h4 className='text-xl font-semibold'>Add Category</h4>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className='mb-5'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input type='text' placeholder='Enter category name' {...field}/>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-5'>
                                <FormField
                                    control={form.control}
                                    name='slug'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input type='text' placeholder='Enter category slug' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-5 flex '>
                                <ButtonLoading
                                    loading={loading} type='submit' text='Add Category'
                                    className='cursor bg-[#7d1cc7]'
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddCategory