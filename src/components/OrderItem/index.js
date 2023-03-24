import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons/index';
import { toast } from 'react-toastify';

import styles from './OrderItem.module.scss';
import currencyFormater from '~/common/formatCurrency';
import Button from '../Button/index';

const cn = classNames.bind(styles);

function OrderItem({ checked, order_list, product_list, confirmed, handle_get_order_list, update_status }) {
   const [showDetail, setShowDetail] = useState(false);
   const [reverse, setReverse] = useState(false);

   const [userInfo, setUserInfo] = useState('');

   const handleGetUserInfo = async () => {
      try {
         const user_info_res = await axios.get('http://localhost:4000/account_id/' + order_list.nd_id);

         if (user_info_res.data.length > 0) {
            setUserInfo(user_info_res.data[0]);
         } else {
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleConfirm = async () => {
      try {
         const confirm_res = await axios.get('http://localhost:4000/order/confirm/' + order_list.dh_ma);

         if (confirm_res.data === 'Confirmed') {
            handle_get_order_list();
            confirmed('Confirmed');
            console.log('Duyet oke');
         }
      } catch (error) {
         console.log('Try catch confirm_res: ' + error);
      }
   };

   const handleUpdateStatus = async (status) => {
      try {
         if (status === order_list.dh_trangthai) {
            toast.error('Đây là trạng thái hiện tại của đơn này!', { position: 'top-center' });
         } else if (status === '') {
            return;
         } else {
            const update_res = await axios.post('http://localhost:4000/order/update_status', {
               ma_dh: order_list.dh_ma,
               trang_thai: status,
            });

            if (update_res.data === 'UpdateStatusSuccess') {
               update_status('UpdateStatusSuccess');
               handle_get_order_list();
            }
         }
      } catch (error) {
         console.log('Try catch: ' + error);
      }
   };

   const handleShowDetail = () => {
      setShowDetail(!showDetail);
      setReverse(!reverse);
   };

   useEffect(() => {
      handleGetUserInfo();
   }, []);

   var stt = 0;

   return (
      <div className={cn('wrapper')} id="wrapper">
         <div className={cn('inner-contents')}>
            <div className={cn('order')}>
               <h4 className={cn('time-order')}>{order_list.ngaylap}</h4>

               <h4 className={cn('order-code')}>{order_list.dh_ma}</h4>

               <h4 className={cn('customer-name')}>{userInfo.nd_hoten}</h4>

               <h4 className={cn('amount')}>{order_list.dh_slsp}</h4>

               <h4 className={cn('price')}>{currencyFormater.format(order_list.dh_tongtien)}</h4>

               {!checked ? (
                  <div className={cn('check')}>
                     <Button onlytext thinfont onClick={handleConfirm}>
                        Duyệt
                     </Button>
                  </div>
               ) : (
                  <div className={cn('change-order-status')}>
                     <select
                        className={cn('select-status')}
                        defaultValue={order_list.dh_trangthai}
                        onChange={(e) => {
                           handleUpdateStatus(e.target.value);
                        }}
                     >
                        <option className={cn('select-status-item')} value="Preparing">
                           Chờ lấy hàng
                        </option>
                        <option className={cn('select-status-item')} value="Delivering">
                           Đang giao
                        </option>
                        <option className={cn('select-status-item')} value="Delivered">
                           Đã giao
                        </option>
                     </select>
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

                  {product_list ? (
                     product_list.map((product) => {
                        stt++;
                        return (
                           <div className={cn('product')} key={product.product.ctdh_id}>
                              <h4 className={cn('product-number')}>{stt}</h4>

                              <div className={cn('product-img')}>
                                 <img src={'http://localhost:4000/' + product.product.sp_image} alt="Ảnh sản phẩm" />

                                 <h4 className={cn('product-name')}>{product.product.sp_ten}</h4>
                              </div>

                              <h4 className={cn('product-amount')}>{product.product.ctdh_sl}</h4>

                              <h4 className={cn('product-price')}>
                                 {currencyFormater.format(product.product.ctdh_gia)}
                              </h4>

                              <h4 className={cn('product-price')}>
                                 {currencyFormater.format(product.product.ctdh_gia * product.product.ctdh_sl)}
                              </h4>
                           </div>
                        );
                     })
                  ) : (
                     <></>
                  )}
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
