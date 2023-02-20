import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons/index';
import Combobox from 'react-widgets/Combobox';
import 'react-widgets/scss/styles.scss';

import styles from './OrderItem.module.scss';
import currencyFormater from '~/common/formatCurrency';
import Button from '../Button/index';

const cn = classNames.bind(styles);

function OrderItem({ checked }) {
   var today = new Date();

   const [showDetail, setShowDetail] = useState(false);
   const [reverse, setReverse] = useState(false);

   const handleShowDetail = () => {
      setShowDetail(!showDetail);
      setReverse(!reverse);
   };

   let arletSelected = (value) => {
      alert(value);
   };

   return (
      <div className={cn('wrapper')} id="wrapper">
         <div className={cn('inner-contents')}>
            <div className={cn('order')}>
               {!checked ? (
                  <h4 className={cn('time-order')}>
                     {today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()}
                  </h4>
               ) : (
                  <></>
               )}

               <h4 className={cn('order-code')}>KBWIBV-GGFDJG-00</h4>

               <h4 className={cn('customer-name')}>Nguyễn Văn Nói Nhiều</h4>

               <h4 className={cn('amount')}>99 sản phẩm</h4>

               <h4 className={cn('price')}>{currencyFormater.format(1545000)}</h4>

               {!checked ? (
                  <div className={cn('check')}>
                     <Button onlytext>Duyệt</Button>
                  </div>
               ) : (
                  <div className={cn('change-order-status')}>
                     <Combobox
                        onSelect={arletSelected}
                        defaultValue="Đã xác nhận"
                        data={['Chờ lấy hàng', 'Đang giao', 'Đã giao', 'Đã hủy']}
                     />
                  </div>
               )}
            </div>
            {showDetail ? (
               <div className={cn('products-list')}>
                  <div className={cn('products-list-header')}>
                     <h4 className={cn('product-number')}>Stt</h4>

                     <h4 className={cn('product-name')}>Sản phẩm</h4>

                     <h4 className={cn('product-amount')}>Số lượng</h4>

                     <h4 className={cn('product-price')}>Đơn giá</h4>

                     <h4 className={cn('product-price')}>Thành tiền</h4>
                  </div>

                  <div className={cn('product')}>
                     <h4 className={cn('product-number')}>99</h4>

                     <div className={cn('product-img')}>
                        <img
                           src="https://thatlungnam.com.vn/wp-content/uploads/2018/06/vi-da-nam-handmade-001-4.jpg"
                           alt=""
                        />

                        <h4 className={cn('product-name')}>Ví da handmade kim ví đựng thẻ</h4>
                     </div>

                     <h4 className={cn('product-amount')}>99</h4>

                     <h4 className={cn('product-price')}>{currencyFormater.format(1545000)}</h4>

                     <h4 className={cn('product-price')}>{currencyFormater.format(1545000)}</h4>
                  </div>
                  <div className={cn('product')}>
                     <h4 className={cn('product-number')}>99</h4>

                     <div className={cn('product-img')}>
                        <img
                           src="https://thatlungnam.com.vn/wp-content/uploads/2018/06/vi-da-nam-handmade-001-4.jpg"
                           alt=""
                        />

                        <h4 className={cn('product-name')}>Ví da handmade kim ví đựng thẻ</h4>
                     </div>

                     <h4 className={cn('product-amount')}>99</h4>

                     <h4 className={cn('product-price')}>{currencyFormater.format(1545000)}</h4>

                     <h4 className={cn('product-price')}>{currencyFormater.format(1545000)}</h4>
                  </div>
                  <div className={cn('product')}>
                     <h4 className={cn('product-number')}>99</h4>

                     <div className={cn('product-img')}>
                        <img
                           src="https://thatlungnam.com.vn/wp-content/uploads/2018/06/vi-da-nam-handmade-001-4.jpg"
                           alt=""
                        />

                        <h4 className={cn('product-name')}>Ví da handmade kim ví đựng thẻ</h4>
                     </div>

                     <h4 className={cn('product-amount')}>99</h4>

                     <h4 className={cn('product-price')}>{currencyFormater.format(1545000)}</h4>

                     <h4 className={cn('product-price')}>{currencyFormater.format(1545000)}</h4>
                  </div>
               </div>
            ) : (
               <></>
            )}
            <div className={cn('order-actions')}>
               <div className={cn('detail-btn')}>
                  <Button onlytext thinfont onClick={handleShowDetail}>
                     {reverse ? (
                        <FontAwesomeIcon className={cn('detail-btn-icon')} icon={faAngleUp} />
                     ) : (
                        <FontAwesomeIcon className={cn('detail-btn-icon')} icon={faAngleDown} />
                     )}
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default OrderItem;
