import React from 'react'
//import loading from '../../../../../public/assets/images/loading.svg'
import Image from 'next/image'
import loading from '@public/assets/images/loading.svg'

const Loading = () => {
  return (
    <div>
        <Image src={loading.src} height={80} width={80} alt='Loading'></Image>
    </div>
  )
}

export default Loading