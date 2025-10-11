'use client'
import Filter from '@/components/Application/Website/Filter'
import Sorting from '@/components/Application/Website/Sorting'
import WebsiteBreadcrumb from '@/components/Application/Website/WebsiteBreadcrumb'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import useWindowSize from '@/hooks/useWindowSize'
import { WEBSITE_HOME, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import React, { useState } from 'react'
import CustomTextField from "@/components/customs/text-field";
import CustomModal from "@/components/customs/custom-modal";


const breadcrumb = {
    title: 'Shop',
    links: [
        { label: 'Shop', href: WEBSITE_SHOP }
    ]
}
const Shop = () => {
    const [limit, setLimit] = useState(9);
    const [sorting, setSorting] = useState('defaut_sorting')
    const [ mobileFilterOpen, setMobileFilterOpen] = useState(false)
    const size = useWindowSize()
    const [open, setOpen] = useState(false)
    return (
        <div>
            <WebsiteBreadcrumb props={breadcrumb} />
            <CustomModal open={open} onClose={setOpen}/>
            <section className='lg:flex lg:px-32 px-4 my-20'>
                {size.width > 1024 ? 
                <div className='w-72 me-4'>
                    <div className='sticky top-0 p-4 rounded bg-gray-50'>
                        <Filter />
                    </div>
                </div>
                :

                    <Sheet open={mobileFilterOpen} onOpenChange={() => setMobileFilterOpen(false)}>
                        <SheetTrigger>Open</SheetTrigger>
                        <SheetContent side='left' className="bg-white">
                            <SheetHeader>
                                <SheetTitle>Are you sure</SheetTitle>
                                <SheetDescription></SheetDescription>
                            </SheetHeader>
                            <div className='mt-5'>
                                <Filter />
                            </div>
                        </SheetContent>
                    </Sheet>
                 }

                 <div className='w-full me-4'>
                    <div className='sticky top-0 p-4 rounded bg-gray-50'>
                        <Sorting limit={limit} setLimit={setLimit}
                            sorting={sorting}
                            setSorting={setSorting}
                            mobileFilterOpen={mobileFilterOpen}
                            setMobileFilterOpen={setMobileFilterOpen}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Shop