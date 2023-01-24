import classNames from 'classnames/bind';
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './Home.module.scss';
import Product from '~/components/Product/index';

const cn = classNames.bind(styles);

function Home() {
   document.title = 'Store';

   const slickSettings = { dots: true, arrows: false, infinite: true, speed: 500, slidesToShow: 4 };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('home-banner')}>
               <h1>Ví Handmade</h1>

               <div
                  style={{
                     backgroundImage: 'url(https://sovani.vn/wp-content/uploads/2020/03/xuong-san-xuat-vi-da.jpg)',
                  }}
               ></div>
            </div>

            <div className={cn('all-product')}>
               <h1 className={cn('title-list')}>Tất cả sản phẩm</h1>

               <div className={cn('list-products')}>
                  <Product sale />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
               </div>
            </div>

            <div className={cn('hot-products')}>
               <h1 className={cn('title-list')}>Sản phẩm nổi bật</h1>

               <div className={cn('hot-products-list')}>
                  {/* <Slider {...slickSettings}>
                     <Product />
                     <Product />
                     <Product />
                     <Product />
                     <Product />
                     <Product />
                     <Product />
                     <Product />
                  </Slider> */}

                  <Swiper
                     slidesPerView={4}
                     spaceBetween={15}
                     loop={true}
                     navigation={true}
                     modules={[Navigation]}
                     className="mySwiper"
                  >
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
                     className="mySwiper"
                  >
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
