import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons/index';

import styles from './CartItem.module.scss';
import Button from '../Button/index';

const cn = classNames.bind(styles);

function CartItem() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('product')}>
            <div className={cn('check')}>
               <input type="checkbox" />
            </div>

            <div className={cn('product-img')}>
               <img src="https://thatlungnam.com.vn/wp-content/uploads/2018/06/vi-da-nam-handmade-001-4.jpg" alt="" />
            </div>

            <div className={cn('product-name')}>
               <h4>Vi da handmade kiem vi dung the</h4>
            </div>

            <div className={cn('product-amount')}>
               <FontAwesomeIcon className={cn('increase-product')} icon={faMinus} />
               <span className={cn('amount')}>12</span>
               <FontAwesomeIcon className={cn('minus-product')} icon={faPlus} />
            </div>

            <h4 className={cn('product-price')}>12.500.488 vnd</h4>

            <div className={cn('product-action')}>
               <Button onlytext>Xóa</Button>
            </div>
         </div>
      </div>
   );
}

export default CartItem;