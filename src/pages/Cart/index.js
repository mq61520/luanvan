import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import currencyFormater from '~/common/formatCurrency';
import CartItem from '~/components/CartItem/index';
import Button from '~/components/Button/index';

const cn = classNames.bind(styles);

function Cart() {
   document.title = 'Giỏ hàng';

   const [listProducts, setListProducts] = useState([]);
   const [product, setProduct] = useState();

   const handleGetCart = async () => {
      try {
         var user_id = localStorage.getItem('current_user');
         const get_cart_response = await axios.get('http://localhost:4000/cart_products/' + user_id);

         if (get_cart_response.data.length > 0) {
            setListProducts(get_cart_response.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handelGetProduct = async (ma_sp) => {
      try {
         const get_product_response = await axios.get('http://localhost:4000/product_id/' + ma_sp);

         if (get_product_response.data.length > 0) {
            console.log(get_product_response.data[0]);
            setProduct(get_product_response.data[0]);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const goShop = () => {
      window.open('http://localhost:3000/', '_self');
   };

   useEffect(() => {
      handleGetCart();
   }, []);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h1 className={cn('title')}>Giỏ hàng</h1>

            {listProducts.length > 0 ? (
               <>
                  <div className={cn('header-list')}>
                     <h4 className={cn('product-info')}>Sản phẩm</h4>

                     <h4 className={cn('product-price')}>Đơn giá</h4>

                     <h4 className={cn('product-amount')}>Số lượng</h4>

                     <h4 className={cn('product-total-price')}>Thành tiền</h4>

                     <h4 className={cn('action')}>Thao tác</h4>
                  </div>

                  <div className={cn('list-products')}>
                     {listProducts.map((p) => {
                        return <CartItem key={p.gh_id} />;
                     })}
                  </div>

                  <div className={cn('actions')}>
                     <div className={cn('total')}>
                        <h4 className={cn('amount')}>3 sản phẩm</h4>

                        <div className={cn('total-price')}>
                           <h4>Tổng thanh toán:</h4>
                           <h4>{currencyFormater.format(12544515)}</h4>
                        </div>
                     </div>
                  </div>

                  <div className={cn('btn-flex')}>
                     <div className={cn('pay-btn')}>
                        <Button borderfill thinfont to={'/pay'}>
                           {' '}
                           Tiến hành thanh toán
                        </Button>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  <div className={cn('no-product')}>
                     <h1 className={cn('message')}>Bạn chưa có sản phẩm nào trong giỏ hàng.</h1>

                     <div className={cn('go-shop')}>
                        <Button onlytext onClick={goShop}>
                           Tiến hành mua hàng
                        </Button>
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}

export default Cart;
