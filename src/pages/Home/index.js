import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';

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
               {/* <h1>Mắt kính</h1> */}

               <Swiper
                  slidesPerView={1}
                  loop={true}
                  autoplay={{
                     delay: 2500,
                     disableOnInteraction: false,
                  }}
                  pagination={{
                     enabled: true,
                  }}
                  modules={[Pagination, Autoplay]}
                  className="banner-swiper"
               >
                  <SwiperSlide>
                     <div
                        style={{
                           backgroundImage:
                              'url(https://img.freepik.com/premium-photo/woman-hand-holding-eyeglasses-optical-store-glasses-selection-eye-test-vision-examination-optician-fashion-accessories-concept-top-view-flat-lay_72402-4814.jpg?w=2000)',
                        }}
                     ></div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div
                        style={{
                           backgroundImage:
                              'url(https://images.squarespace-cdn.com/content/v1/5c080ff2f93fd43687689336/1567035645808-9ZEPU5I428NBIP0MGUJT/Fitz-site-banner-frames.jpg?format=1500w)',
                        }}
                     ></div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div
                        style={{
                           backgroundImage:
                              'url(https://thumbs.dreamstime.com/b/banner-fashinable-woman-glasses-beautiful-black-woman-wearing-eye-glasses-banner-fashion-eyewear-concept-129148377.jpg)',
                        }}
                     ></div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div
                        style={{
                           backgroundImage:
                              'url(https://img.freepik.com/premium-photo/woman-hand-holding-eyeglasses-optical-store-glasses-selection-eye-test-vision-examination-optician-fashion-accessories-concept-top-view-flat-lay_72402-4814.jpg?w=2000)',
                        }}
                     ></div>
                  </SwiperSlide>
                  <SwiperSlide>
                     <div
                        style={{
                           backgroundImage:
                              'url(https://thumbs.dreamstime.com/b/banner-fashinable-woman-glasses-beautiful-black-woman-wearing-eye-glasses-banner-fashion-eyewear-concept-129148377.jpg)',
                        }}
                     ></div>
                  </SwiperSlide>
               </Swiper>
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
                     pagination={{ clickable: true, enabled: false }}
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
