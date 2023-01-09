import classNames from 'classnames/bind';

import styles from './Cart.module.scss';
import CartItem from '~/components/CartItem/index';

const cn = classNames.bind(styles);

function Cart() {
   document.title = 'Giỏ hàng';

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
         </div>
      </div>
   );
}

export default Cart;
