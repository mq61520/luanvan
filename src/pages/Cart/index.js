import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import currencyFormater from '~/common/formatCurrency';
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
            <h1 className={cn('title')}>Giỏ hàng</h1>

            {listProducts ? (
               <>
                  <div className={cn('header-list')}>
                     <h4 className={cn('product-info')}>Sản phẩm</h4>

                     <h4 className={cn('product-price')}>Đơn giá</h4>

                     <h4 className={cn('product-amount')}>Số lượng</h4>

                     <h4 className={cn('product-total-price')}>Thành tiền</h4>

                     <h4 className={cn('action')}>Xóa</h4>
                  </div>

                  <div className={cn('list-products')}>
                     <CartItem />
                     <CartItem />
                     <CartItem />
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
