'use client'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { FilePlus2Icon } from 'lucide-react'

const UploadMedia = ({isMultiple}) => {
  const handleOnError = () => {

  }
  const handleOnQueueEnd = () => {

  }
  return (
    <CldUploadWidget signatureEndpoint='/api/cloudinary-signature'
      uploadPreset=''
      onError={handleOnError}
      onQueuesEnd={handleOnQueueEnd}
      config={{
        cloudName:  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
      }}
      options={{
        multiple: isMultiple,
        sources: ['local', 'url', 'unsplash', 'google_drive']
      }}
    >

    {({ open }) => {
      return (
        <Button className='button bg-#725CAD' onClick={() => open()}>
          <FilePlus2Icon/>  
          Upload Media
        </Button>
      )
    }}
    </CldUploadWidget>
  )
}

export default UploadMedia