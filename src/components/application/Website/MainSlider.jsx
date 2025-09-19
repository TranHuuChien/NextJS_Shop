"use client";

import React from 'react'
import slider1 from '@public/assets/images/slider-1.png'
import slider2 from '@public/assets/images/slider-2.png'
import slider3 from '@public/assets/images/slider-1.png'
import slider4 from '@public/assets/images/slider-1.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

const ArrowNext = (props) => {
  const { onClick } = props
  return (
    <button type='button' onClick={onClick} className='w-14 h-14 flex justify-center
    items-center rounded-full absolute top-1/2 right-20 bg-white -translate-y-1/2'>
      <LuChevronRight size={24}/>
    </button>
  )
}

const ArrowPrev = (props) => {
  const { onClick } = props
  return (
    <button type='button'  onClick={onClick} className='w-14 h-14 flex justify-center
    items-center rounded-full absolute top-1/2 left-5 bg-white -translate-y-1'>
      <LuChevronLeft size={24}/>
    </button>
  )
}

const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,   // dùng `infinite`, không có `initialize`
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <ArrowPrev />,
    nextArrow: <ArrowNext />,
    
  };
  return (
    <div>
        <Slider {...settings} className='relative'>
              <div>
                <Image src={slider1.src} alt="slider1" height={slider1.height} width={slider1.width} />
              </div>
               <div>
                <Image src={slider2.src} alt="slider2" height={slider2.height} width={slider2.width} />
              </div>
              <div>
                <Image src={slider3.src} alt="slider3" height={slider3.height} width={slider3.width} />
              </div>
              <div>
                <Image src={slider4.src} alt="slider4" height={slider4.height} width={slider4.width} />
              </div>
        </Slider>
    </div>
  )
}

export default MainSlider