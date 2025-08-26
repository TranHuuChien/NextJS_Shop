import { Checkbox } from '@radix-ui/react-checkbox'
import Image from 'next/image'
import React from 'react'

const Media = ({ media, handleDelete, deleteType, selectedMedia, setSelectedMedia }) => {
    function handleCheck() {

    }
    return (
        <div className='border border-gray-200 dark:border-gray-800 relative group rounded'>
            <div className='absolate top-2 left-2 z-20'>
                <Checkbox checked={selectedMedia.includes(media._id)}
                    onCheckedChange={handleCheck}
                ></Checkbox>
                <Image
                    src={media?.secure_url}
                    alt={media?.alt || 'image'}
                    height={300}
                    width={300}
                    className='object-cover w-full sm:h-[200px] h-[150px]'
                />
            </div>
        </div>
    )
}

export default Media