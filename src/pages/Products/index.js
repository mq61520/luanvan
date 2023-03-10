import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import Button from '~/components/Button';
import Product from '~/components/Product';

const cn = classNames.bind(styles);

function Products() {
   const [products, setProducts] = useState([]);

   const handleGetProductList = async () => {
      try {
         const product_list = await axios.get('http://localhost:4000/products');

         if (product_list) {
            setProducts(product_list.data);
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
               <h3>Danh mục</h3>

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
                        window.location.pathname = '/products/kinh-nam';
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
                        window.location.pathname = '/products/kinh-nu';
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
                        window.location.pathname = '/products/unisex';
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
                        window.location.pathname = '/products/tre-em';
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
                           key={product.sp_ma}
                           img={product.sp_image}
                           product_name={product.sp_ten}
                           price={product.sp_gia}
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
