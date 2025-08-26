import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import UploadMedia from '@/components/Application/Admin/UploadMedia'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute'
import React, { useState } from 'react'

const breadcrumbData = [
    { href: ADMIN_DASHBOARD, label: 'Home' },
    { href: '', label: 'Media' }
]

const MediaPage = () => {
    const [deleteType, setDeleteType] = useState('SD')
    const [selectedMedia, setSelectedMedia] = useState('SD')
    return (
        <div>
            <BreadCrumb breadcrumbData={breadcrumbData} />
            <Card className='border '>
                <CardHeader className='py-2 px-3 border-b'>
                    <div className='flex justify-between items-center'>
                        <h4 className='font-semibold text-xl uppercase'>Media</h4>
                        <div className='flex items-center gap-5'>
                            <UploadMedia />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    )
}

export default MediaPage