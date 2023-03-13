import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons/index';

import styles from './CartItem.module.scss';
import Button from '../Button/index';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function CartItem({ anh_sp, ten_sp, gia_sp, sl_sp }) {
   var new_image = 'http://localhost:4000/' + anh_sp;

   return (
      <div className={cn('wrapper')}>
         <div className={cn('product')}>
            <div className={cn('check')}>
               <input type="checkbox" />
            </div>

            <div className={cn('flex-info')}>
               <div className={cn('product-img')}>
                  <img src={new_image} alt="Ảnh sản phẩm" />
               </div>

               <div className={cn('product-name')}>
                  <h4>{ten_sp}</h4>
               </div>
            </div>

            <div className={cn('price')}>
               {/* <h4 className={cn('old-price')}>{currencyFormater.format(12500488)}</h4> */}

               <h4 className={cn('current-price')}>{currencyFormater.format(gia_sp)}</h4>
            </div>

            <div className={cn('product-amount')}>
               <FontAwesomeIcon className={cn('increase-product')} icon={faMinus} />
               <span className={cn('amount')}>{sl_sp}</span>
               <FontAwesomeIcon className={cn('minus-product')} icon={faPlus} />
            </div>

            <h4 className={cn('product-prices')}>{currencyFormater.format(sl_sp * gia_sp)}</h4>

            <div className={cn('product-action')}>
               <Button onlytext thinfont>
                  Xóa
               </Button>
            </div>
         </div>
      </div>
   );
}

export default CartItem;
