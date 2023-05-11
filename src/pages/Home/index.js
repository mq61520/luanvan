import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import styles from './Home.module.scss';
import './Home.scss';
import Product from '~/components/Product/index';
// import Button from '~/components/Button/index';

const cn = classNames.bind(styles);

function Home() {
   document.title = 'Store';

   const [productList, setProductList] = useState([]);

   const handleGetRecommend = async () => {
      try {
         const recomms_res = await axios.post('http://localhost:4000/recombee/get_items_for_user', {
            userId: localStorage.getItem('current_user') === null ? 'unknown' : localStorage.getItem('current_user'),
         });
         console.log(recomms_res);

         if (recomms_res.data.length > 0) {
            var list = [];
            for (let i = 0; i < recomms_res.data.length; i++) {
               const get_product_res = await axios.get('http://localhost:4000/product_id/' + recomms_res.data[i].id);

               if (get_product_res.data.length > 0) {
                  const get_km_res = await axios.get(
                     'http://localhost:4000/promotion_id/' + get_product_res.data[0].sp_khuyenmai,
                  );

                  if (get_km_res.data.length > 0) {
                     list.push({ km: get_km_res.data[0].km_value, product: get_product_res.data[0] });
                  } else {
                     list.push({ km: null, product: get_product_res.data[0] });
                  }
                  console.log(list);
               } else {
                  console.log('Load fail');
               }
            }

            setProductList(list);
         } else {
            console.log(' k có sp recom');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetRecommend();
   }, []);

   console.log(productList);

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

            {/* <div className={cn('recommend-product')}>
               <div>
                  <h1>Tìm kiếm gọng kính phù hợp với gương mặt của bạn</h1>

                  <p>
                     Sẽ dễ dàng để tìm kiếm một chiếc kính phù hợp khi bạn biết hình dạng gương mặt của mình. Nhấn{' '}
                     <b>Bắt đầu</b> để tiến hành.
                  </p>
               </div>

               <div className={cn('recommend-btn')}>
                  <Button
                     thinfont
                     border
                     onClick={() => {
                        window.open('http://localhost:3000/recommend-glasses', '_self');
                     }}
                  >
                     Bắt đầu
                  </Button>
               </div>
            </div> */}

            <div className={cn('hot-products')}>
               <h1 className={cn('title-list')}>Sản phẩm bạn có thể quan tâm</h1>

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
                     {productList.length > 0 ? (
                        productList.map((product) => {
                           return (
                              <SwiperSlide key={product.product.sp_ma}>
                                 <Product
                                    ma_sp={product.product.sp_ma}
                                    img={product.product.sp_image}
                                    name={product.product.sp_ten}
                                    price={product.product.sp_gia}
                                    km={product.km}
                                 />
                              </SwiperSlide>
                           );
                        })
                     ) : (
                        <></>
                     )}
                  </Swiper>
               </div>
            </div>

            {/* <div className={cn('viewed-products')}>
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
            </div> */}
         </div>
      </div>
   );
}

export default Home;
