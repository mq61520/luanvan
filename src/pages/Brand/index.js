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
   var brand_name = window.location.pathname.toString().slice(7);

   const [listBrands, setListBrands] = useState('');
   const [products, setProducts] = useState([]);

   const handleLoadBrands = async () => {
      const response = await axios.get('http://localhost:4000/brands');

      if (response.data) {
         setListBrands(response.data);
      }
   };

   const handleGetProductList = async () => {
      try {
         var product_list;
         if (brand_name === 'all') {
            product_list = await axios.get('http://localhost:4000/products');
         } else {
            product_list = await axios.get('http://localhost:4000/product/brand/' + brand_name);
         }

         var list = [];
         if (product_list.data.length > 0) {
            for (let i = 0; i < product_list.data.length; i++) {
               const promotion_response = await axios.get(
                  'http://localhost:4000/promotion_id/' + product_list.data[i].sp_khuyenmai,
               );

               if (promotion_response.data.length > 0) {
                  list.push({ km: promotion_response.data[0].km_value, product: product_list.data[i] });
               } else {
                  list.push({ km: null, product: product_list.data[i] });
               }

               // console.log(list);
            }

            setProducts(list);
         } else {
            console.log('Get sản phẩm thất bại!');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleLoadBrands();
      handleGetProductList();
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

            {brand_name !== 'all' ? (
               <h3 className={cn('title-list')}>
                  Tất cả sản phẩm của <b>{brand_name.toUpperCase()}</b>
               </h3>
            ) : (
               <h3 className={cn('title-list')}>Tất cả sản phẩm</h3>
            )}

            <div className={cn('products-list')}>
               {products.length > 0 ? (
                  products.map((product) => {
                     return (
                        <Product
                           key={product.product.sp_ma}
                           ma_sp={product.product.sp_ma}
                           img={product.product.sp_image}
                           name={product.product.sp_ten}
                           price={product.product.sp_gia}
                           km={product.km}
                        />
                     );
                  })
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   );
}

export default Brand;
