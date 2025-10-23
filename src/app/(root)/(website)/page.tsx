// import React from 'react'

// const HomePage = ({ children }) => {
//   return (
//     <div>{ children }</div>
//   )
// }

// export default HomePage

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import banner from '@public/assets/images/banner1.png'
import advertisingBanner from '@public/assets/images/advertising-banner.png'
import CustomTextField from "../../../components/customs/text-field/index";
import MainSlider from "../../../components/Application/Website/MainSlider";
import ProductFeature from "@/components/Application/Website/ProductFeature";
import ConfirmationDialog from "@/components/customs/confirm-dialog";
import CustomTextArea from "@/components/customs/text-area/index";

const Home = () => {
  return (
    <>
      <section>
        <MainSlider/>
      </section>
      <section className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
          <div className='grid grid-cols-2 sm:gap-10 gap-2'>
            <div className='border rounded-lg overflow-hidden'>
              <Link href=''>
                <Image src={banner.src} alt='banner 1'
                    width={banner.width}
                    height={banner.height}/>
              </Link>
            </div>
          </div>
      </section>

        <CustomTextArea
            required
            label={'Content'}
            placeholder={'Enter_content'}
            minRows={3}
            maxRows={3}
        />
     <ProductFeature/>
      <div>
        <Image 
          src={advertisingBanner.src}
          alt='Banner adver'
          width={advertisingBanner.width}
          height={advertisingBanner.height}
        />
      </div>
    </>
  )
}

export default Home