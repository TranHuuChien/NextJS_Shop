import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import banner from '@public/assets/images/banner1.png'
import advertisingBanner from '@public/assets/images/advertising-banner.png'
import MainSlider from '../../../components/Application/Website/MainSlider'
import ProductFeature from '@/components/Application/Website/ProductFeature'
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw, FiHeadphones } from 'react-icons/fi'

const FEATURES = [
  { Icon: FiTruck, title: 'Free Shipping', desc: 'Miễn phí vận chuyển cho đơn từ 500.000₫' },
  { Icon: FiShield, title: 'Secure Payment', desc: 'Thanh toán an toàn & bảo mật 100%' },
  { Icon: FiRefreshCw, title: 'Easy Returns', desc: 'Đổi trả miễn phí trong vòng 30 ngày' },
  { Icon: FiHeadphones, title: '24/7 Support', desc: 'Hỗ trợ khách hàng mọi lúc mọi nơi' },
]

const Home = () => {
  return (
    <>
      {/* Hero Slider */}
      <section>
        <MainSlider />
      </section>

      {/* Feature badges */}
      <section className='lg:px-32 px-4 py-8 bg-white border-b border-gray-100'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {FEATURES.map(({ Icon, title, desc }) => (
            <div key={title} className='flex items-start gap-3 p-4 rounded-xl hover:bg-primary/5 transition-colors group'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors'>
                <Icon size={18} className='text-primary' />
              </div>
              <div>
                <p className='text-sm font-semibold text-gray-900'>{title}</p>
                <p className='text-xs text-gray-400 mt-0.5 leading-relaxed hidden sm:block'>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banner grid */}
      <section className='lg:px-32 px-4 py-10'>
        <div className='grid md:grid-cols-2 gap-5'>
          <Link
            href={WEBSITE_SHOP}
            className='relative block rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow'
          >
            <Image
              src={banner.src}
              alt='Summer Collection'
              width={banner.width}
              height={banner.height}
              className='w-full object-cover group-hover:scale-105 transition-transform duration-500'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6'>
              <div>
                <p className='text-white/80 text-sm font-medium mb-1'>New Arrivals</p>
                <h3 className='text-white text-xl font-bold mb-3'>Bộ Sưu Tập Mới</h3>
                <span className='inline-flex items-center gap-2 px-4 py-2 bg-white text-primary text-sm font-semibold rounded-lg'>
                  Shop Now <FiArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>

          <div className='flex flex-col gap-5'>
            <Link
              href={WEBSITE_SHOP}
              className='relative block rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow flex-1'
            >
              <Image
                src={banner.src}
                alt='Eco Products'
                width={banner.width}
                height={banner.height}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-5'>
                <div>
                  <p className='text-white/80 text-xs font-medium mb-0.5'>Eco Friendly</p>
                  <h3 className='text-white text-lg font-bold mb-2'>Sản Phẩm Xanh</h3>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-primary text-xs font-semibold rounded-lg'>
                    Explore <FiArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>

            <Link
              href={WEBSITE_SHOP}
              className='relative block rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-shadow flex-1'
            >
              <Image
                src={banner.src}
                alt='Best Sellers'
                width={banner.width}
                height={banner.height}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-5'>
                <div>
                  <p className='text-white/80 text-xs font-medium mb-0.5'>Top Picks</p>
                  <h3 className='text-white text-lg font-bold mb-2'>Bán Chạy Nhất</h3>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-primary text-xs font-semibold rounded-lg'>
                    View All <FiArrowRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <ProductFeature />

      {/* Advertising banner */}
      <section className='lg:px-32 px-4 pb-12'>
        <div className='rounded-2xl overflow-hidden shadow-sm relative'>
          <Image
            src={advertisingBanner.src}
            alt='Special Offer'
            width={advertisingBanner.width}
            height={advertisingBanner.height}
            className='w-full object-cover'
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center'>
              <Link
                href={WEBSITE_SHOP}
                className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg'
              >
                Mua Ngay <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
