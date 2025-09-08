'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ADMIN_CATEGORY_ADD, ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD, ADMIN_PRODUCT_ADD, ADMIN_PRODUCT_SHOW } from '@/routes/AdminPanelRoute'
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
import Select from '@/components/Application/Admin/Select'

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: ADMIN_PRODUCT_SHOW, label: 'Product' },
    { href: ADMIN_PRODUCT_ADD, label: "Add Product" }
]

const AddProduct = () => {
    const [loading, setLoading] = useState(false)
    const [categoryOption, setCategoryOption] = useState([])

    //fetch data category
    useEffect(() => {

    }, [])

    const formSchema = zSchema.pick({
        name: true,
        slug: true,
        category: true,
        mrp: true,
        sellingPrice: true,
        discountPercentage: true,
        description: true
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            category: '',
            mrp: '',
            sellingPrice: '',
            discountPercentage: '',
            description: ''
        }
    })
    useEffect(() => {
        const name = form.getValues('name')
        if (name) {
            form.setValue('slug', slugify(name).toLowerCase())
        }
    }, [form.watch('name')])

    useEffect(() => {
        const mrp = form.getValues('mrp') || 0
        const sellingPrice = form.getValues('sellingPrice') || 0
        const discountPercentage = ((mrp -sellingPrice)/mrp) * 100

        form.setValue('discountPercentage', Math.round(discountPercentage))
    },[form.watch('mrp'), form.watch('sellingPrice')])

    const onSubmit = async (values) => {
        setLoading(true)
        try {
            const { data: response } = await axios.post('/api/product/create', values)
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
                    <h4 className='text-xl font-semibold'>Add Product</h4>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='grid md:grid-cols-2 gap-5'>
                            <div className='mb-1'>
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name <span className='text-red-500'>*</span></FormLabel>
                                            <FormControl>
                                                <Input type='text' placeholder='Enter product name' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-1'>
                                <FormField
                                    control={form.control}
                                    name='category'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <FormControl>
                                                <Select
                                                    options={categoryOption}
                                                    selected={field.value}
                                                    setSelected={field.onChange}
                                                    isMulti={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-1'>
                                <FormField
                                    control={form.control}
                                    name='mrp'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mrp</FormLabel>
                                            <FormControl>
                                                <Input type='number' className='placeholder-italic placeholder-gray-400' placeholder='Enter mrp' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-1'>
                                <FormField
                                    control={form.control}
                                    name='sellingPrice'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Selling Price</FormLabel>
                                            <FormControl>
                                                <Input type='number' placeholder='Enter Selling Price' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-1'>
                                <FormField
                                    control={form.control}
                                    name='discountPercentage'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount Percentage</FormLabel>
                                            <FormControl>
                                                <Input type='number' placeholder='Enter Discount Percentage' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='mb-3 flex '>
                                <ButtonLoading
                                    loading={loading} type='submit' text='Add Product'
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

export default AddProduct