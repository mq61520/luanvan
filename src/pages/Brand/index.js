import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import styles from './Brand.module.scss';
import BrandItem from '~/components/BrandItem';
import Product from '~/components/Product/index';

const cn = classNames.bind(styles);

function Brand() {
   var brand_id_in_path = window.location.pathname.toString().slice(7);

   const [listBrands, setListBrands] = useState('');

   const handleLoadBrands = async () => {
      const response = await axios.get('http://localhost:4000/brands');

      if (response.data) {
         setListBrands(response.data);
      }
   };

   const handleLoadProducts = async () => {
      var res_products;

      if (brand_id_in_path !== 'all') {
         res_products = await axios.get(`http://localhost:4000/brands_id/${brand_id_in_path}`);
      } else {
         res_products = await axios.get(`http://localhost:4000/brands`);
      }

      console.log(res_products.data);
   };

   useEffect(() => {
      handleLoadBrands();
      handleLoadProducts();
   }, []);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('brands-list')}>
               <Swiper
                  slidesPerView={5}
                  spaceBetween={15}
                  loop={true}
                  pagination={{
                     clickable: true,
                     enabled: false,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="brands-list-swiper"
               >
                  {listBrands ? (
                     listBrands.map((brand) => {
                        return (
                           <SwiperSlide key={brand.th_id}>
                              <BrandItem
                                 brandname={brand.th_ten}
                                 logo={brand.th_image}
                                 onClick={() => {
                                    window.location.pathname = `/brand/${brand.th_link}`;
                                 }}
                              />
                           </SwiperSlide>
                        );
                     })
                  ) : (
                     <></>
                  )}
               </Swiper>
            </div>

            {brand_id_in_path !== 'all' ? (
               <h3 className={cn('title-list')}>
                  Tất cả sản phẩm của <b>'{brand_id_in_path.toUpperCase()}'</b>
               </h3>
            ) : (
               <h3 className={cn('title-list')}>Tất cả sản phẩm</h3>
            )}

            <div className={cn('products-list')}>
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
            </div>
         </div>
      </div>
   );
}

export default Brand;
