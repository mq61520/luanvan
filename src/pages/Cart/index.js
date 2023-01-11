import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';

import CartItem from '~/components/CartItem/index';
import Button from '~/components/Button/index';

const cn = classNames.bind(styles);

function Cart() {
   document.title = 'Giỏ hàng';

   const [listProducts, setListProducts] = useState(true);

   const goShop = () => {
      window.open('http://localhost:3000/', '_self');
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            {listProducts ? (
               <>
                  <h1 className={cn('title')}>Giỏ hàng</h1>

                  <div className={cn('list-products')}>
                     <CartItem />
                     <CartItem />
                     <CartItem />
                  </div>

                  <div className={cn('actions')}>
                     <div className={cn('total')}>
                        <h4 className={cn('amount')}>3 sản phẩm</h4>

                        <div className={cn('total-price')}>
                           <h4>Tổng cộng:</h4>
                           <h4>12.999.000 vnđ</h4>
                        </div>
                     </div>
                  </div>

                  <div className={cn('btn-flex')}>
                     <div className={cn('pay-btn')}>
                        <Button primary> Tiến hành thanh toán</Button>
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
