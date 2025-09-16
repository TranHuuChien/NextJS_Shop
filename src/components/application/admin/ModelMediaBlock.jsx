import { Checkbox } from '@/components/ui/checkbox'
import React from 'react'

const ModelMediaBlock = ({ media, selectedMedia, setSelectedMedia, isMultiple }) => {
    const handleCheck = () => {
        let newSelectedMedia = []
        const isSelected = selectedMedia.find(m => m._id === media._id) ? true : false
        if (isMultiple) {
            //select multiple media
            if (isSelected) {
                //remove selected media from array
                newSelectedMedia = selectedMedia.filter(m => m._id != media._id)
            } else {
                // add new media into array
                newSelectedMedia = [... selectedMedia, {
                    _id: media._id,
                    url: media.secure_url
                }]
            }
            setSelectedMedia(newSelectedMedia)
        } else {
            //Select single media
        }
    }
    return (
        <label htmlFor={media_id} className='border border-gray-200 dark:border-gray-800 relative 
    rounded overflow-hidden'>
            <div className='absolute top-2 left-2 z-20'>
                <Checkbox id={media._id} checked={selectedMedia.find(item => item._id === media._id) ? true : false} />
            </div>
        </label>
    )
}

export default ModelMediaBlock