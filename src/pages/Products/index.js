import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import Button from '~/components/Button';
import Product from '~/components/Product';

const cn = classNames.bind(styles);

function Products() {
   document.title = 'Tìm sản phẩm';
   var type_product = window.location.pathname.slice(10).toString();

   const [products, setProducts] = useState([]);

   const handleGetProductList = async () => {
      try {
         var product_list;
         if (type_product === 'all') {
            product_list = await axios.get('http://localhost:4000/products');
         } else {
            product_list = await axios.get('http://localhost:4000/product/category/' + type_product);
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
      handleGetProductList();
   }, []);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('categories')}>
               <h3>Danh mục:</h3>

               <div className={cn('category-item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/products/all';
                     }}
                  >
                     Tất cả
                  </Button>
               </div>

               <div className={cn('category-item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/products/Kính nam';
                     }}
                  >
                     Kính nam
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/products/Kính nữ';
                     }}
                  >
                     Kính nữ
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/products/Kính unisex';
                     }}
                  >
                     Kính unisex
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/products/Kính trẻ em';
                     }}
                  >
                     Kính trẻ em
                  </Button>
               </div>
            </div>

            <h3 className={cn('title-list')}>Danh sách sản phẩm</h3>
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

export default Products;
