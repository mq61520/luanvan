// import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Product.module.scss';
import Button from '../Button/index';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function Product({ ma_sp, img, name, price, km }) {
   if (img) {
      var newimg = 'http://localhost:4000/' + img;
   }

   const handleAddViewDetail = async () => {
      try {
         await axios.post('http://localhost:4000/recombee/add_detail_view', {
            itemId: ma_sp,
            userId: localStorage.getItem('current_user'),
            timestamp: new Date(new Date().getTime()).toLocaleString('en-US'),
         });
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            {km > 0 ? (
               <div className={cn('sale-flag')}>
                  <p>-{km}%</p>
               </div>
            ) : (
               <></>
            )}

            <div className={cn('product-image')}>
               <img src={newimg} alt="Product imgae" />
            </div>

            <div className={cn('product-title')}>
               <h3>{name}</h3>

               <div>
                  {km ? <h4 className={cn('sale-price')}>{currencyFormater.format(price)}</h4> : <></>}
                  <h4 className={cn('product-price')}>{currencyFormater.format(price - (price * km) / 100)}</h4>
               </div>
            </div>

            <div className={cn('product-btn')}>
               <Button
                  onlytext
                  thinfont
                  onClick={() => {
                     window.location.pathname = `/detail/${ma_sp}`;
                     handleAddViewDetail();
                  }}
               >
                  Chi tiết
               </Button>
            </div>
         </div>
      </div>
   );
}

export default Product;
