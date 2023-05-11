import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons/index';
import { toast } from 'react-toastify';

import styles from './CartItem.module.scss';
import Button from '../Button/index';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function CartItem({ ma_sp, image, ten_sp, sl_sp, gia_sp, km, deleted, checked, updated }) {
   const [totalPrice, setTotalPrice] = useState(false);

   const [amount, setAmount] = useState(sl_sp);

   var current_price;
   if (km !== 100) {
      current_price = gia_sp - (gia_sp * km) / 100;
   } else {
      current_price = 0;
   }

   var new_image = 'http://localhost:4000/' + image;
   var type_update = '';

   const handleDeleteProductformCart = async () => {
      try {
         const delete_response = await axios.post('http://localhost:4000/cart_delete', {
            user_id: localStorage.getItem('current_user'),
            ma_sp: ma_sp,
            sl: sl_sp,
         });
         if (delete_response.data === 'DeleteSuccess') {
            deleted('Deleted');
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleUpdateAmount = async () => {
      try {
         const update_response = await axios.post('http://localhost:4000/cart/update_amount', {
            user_id: localStorage.getItem('current_user'),
            ma_sp: ma_sp,
            type: type_update,
         });

         if (update_response.data === 'UpdateSuccess') {
            updated('Updated');
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleSetChecked = () => {
      setTotalPrice(!totalPrice);
      handleFeedBack();
   };

   const handleFeedBack = () => {
      checked({
         status: !totalPrice,
         gia: current_price * amount,
         ma_sp: ma_sp,
         sl: sl_sp,
         don_gia: current_price,
      });
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('product')}>
            <div className={cn('flex-info')}>
               <div className={cn('check')}>
                  <input type="checkbox" checked={totalPrice} onChange={handleSetChecked} />
               </div>

               <div className={cn('product-img')}>
                  <img src={new_image} alt="Ảnh sản phẩm" />
               </div>

               <div className={cn('product-name')}>
                  <h4>{ten_sp}</h4>
               </div>
            </div>

            <div className={cn('price')}>
               {km ? <h4 className={cn('old-price')}>{currencyFormater.format(gia_sp)}</h4> : <></>}

               <h4 className={cn('current-price')}>{currencyFormater.format(gia_sp - (gia_sp * km) / 100)}</h4>
            </div>

            <div className={cn('product-amount')}>
               <FontAwesomeIcon
                  className={cn('minus-product')}
                  icon={faMinus}
                  onClick={() => {
                     if (amount === 1) {
                        toast.warn('Không thể giảm thêm!', { position: 'top-center' });
                        return;
                     } else {
                        setAmount(amount - 1);
                        type_update = 'minus';
                        handleUpdateAmount();
                     }
                  }}
               />
               <span className={cn('amount')}>{amount}</span>
               <FontAwesomeIcon
                  className={cn('increase-product')}
                  icon={faPlus}
                  onClick={() => {
                     setAmount(amount + 1);
                     type_update = 'increase';
                     handleUpdateAmount();
                  }}
               />
            </div>

            <h4 className={cn('product-prices')}>{currencyFormater.format(amount * current_price)}</h4>

            <div className={cn('product-action')}>
               <Button
                  onlytext
                  thinfont
                  onClick={() => {
                     handleDeleteProductformCart();
                  }}
               >
                  Xóa
               </Button>
            </div>
         </div>
      </div>
   );
}

export default CartItem;
