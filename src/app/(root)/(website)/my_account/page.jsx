import MainSlider from '@/components/application/Website/MainSlider'
import React from 'react'
import Footer from '@/components/Application/Website/Footer'
import Header from '@/components/Application/Website/Header'

const page = ({ children }) => {
  return (
    <div className={kumbh.className}>
      <Header />
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default page