import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import styles from './Home.module.scss';
import './Home.scss';
import Product from '~/components/Product/index';

const cn = classNames.bind(styles);

function Home() {
   document.title = 'Store';

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('home-banner')}>
               <h1>Mắt kính</h1>

               <div
                  style={{
                     backgroundImage:
                        'url(https://img.freepik.com/premium-photo/woman-hand-holding-eyeglasses-optical-store-glasses-selection-eye-test-vision-examination-optician-fashion-accessories-concept-top-view-flat-lay_72402-4814.jpg?w=2000)',
                  }}
               ></div>
            </div>

            {/* <div className={cn('product-brands')}></div> */}

            {/* <div className={cn('all-product')}>
               <h1 className={cn('title-list')}>Tất cả sản phẩm</h1>

               <div className={cn('list-products')}>
                  <Product sale />
                  <Product />
                  <Product sale />
                  <Product />
                  <Product />
                  <Product />
               </div>
            </div> */}

            <div className={cn('hot-products')}>
               <h1 className={cn('title-list')}>Sản phẩm nổi bật</h1>

               <div className={cn('hot-products-list')}>
                  <Swiper
                     slidesPerView={4}
                     spaceBetween={15}
                     loop={true}
                     pagination={{
                        clickable: true,
                        enabled: false,
                     }}
                     navigation={true}
                     modules={[Pagination, Navigation]}
                     className="hot-product-list-swiper"
                  >
                     <SwiperSlide>
                        <Product sale />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product sale />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                  </Swiper>
               </div>
            </div>

            <div className={cn('viewed-products')}>
               <h1 className={cn('title-list')}>Sản phẩm đã xem</h1>

               <div className={cn('viewed-products-list')}>
                  <Swiper
                     slidesPerView={4}
                     spaceBetween={15}
                     loop={true}
                     pagination={{
                        clickable: true,
                        enabled: false,
                     }}
                     navigation={true}
                     modules={[Pagination, Navigation]}
                     className="viewed-product-list-swiper"
                  >
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product sale />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product sale />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                  </Swiper>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Home;
