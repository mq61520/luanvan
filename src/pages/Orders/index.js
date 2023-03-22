import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Orders.module.scss';
import Button from '~/components/Button';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function Orders() {
   var user_id = localStorage.getItem('current_user');

   const [orderList, setOrderList] = useState([]);

   const handleGetOrderList = async () => {
      try {
         var order_status = window.location.pathname.slice(8).toString();

         var order_list_res;
         if (order_status !== 'all') {
            order_list_res = await axios.post('http://localhost:4000/order/status', {
               user_id: user_id,
               trangthai: order_status,
            });
         } else {
            order_list_res = await axios.post('http://localhost:4000/order/status', {
               user_id: user_id,
               trangthai: 'all',
            });
         }

         console.log(order_list_res.data);

         var order_list = [];
         if (order_list_res.data.length > 0) {
            for (let i = 0; i < order_list_res.data.length; i++) {
               var detail_list = [];

               for (let k = 0; k < order_list_res.data[i].dh_slsp; k++) {
                  const product_res = await axios.get(
                     'http://localhost:4000/detail_order/' + order_list_res.data[i].dh_ma,
                  );

                  detail_list.push({ product: product_res.data[k] });
               }

               order_list.push({ order: order_list_res.data[i], product_list: detail_list });
            }

            setOrderList(order_list);
         } else {
            console.log('K co don hang');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetOrderList();
   }, []);

   console.log(orderList);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('actions-bar')}>
               <div className={cn('item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/orders/all';
                     }}
                  >
                     Tất cả
                  </Button>
               </div>

               <div className={cn('item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/orders/Pending';
                     }}
                  >
                     Chờ xác nhận
                  </Button>
               </div>

               <div className={cn('item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/orders/Preparing';
                     }}
                  >
                     Chuẩn bị hàng
                  </Button>
               </div>

               <div className={cn('item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/orders/Delivering';
                     }}
                  >
                     Đang giao
                  </Button>
               </div>

               <div className={cn('item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/orders/Delivered';
                     }}
                  >
                     Đã giao
                  </Button>
               </div>

               <div className={cn('item')}>
                  <Button
                     border
                     thinfont
                     onClick={() => {
                        window.location.pathname = '/orders/Canceled';
                     }}
                  >
                     Đã hủy
                  </Button>
               </div>
            </div>

            <h3 className={cn('title-list')}>Các đơn hàng</h3>
            <div className={cn('orders-list')}>
               {orderList.length > 0 ? (
                  orderList.map((order) => {
                     return (
                        <div className={cn('order')} key={order.order.dh_ma}>
                           <div className={cn('order-header')}>
                              <h3 className={cn('order-code')}>
                                 <i>Mã đơn hàng:</i> {order.order.dh_ma}
                              </h3>
                              <h3 className={cn('order-status')}>{order.order.dh_trangthai}</h3>
                           </div>

                           <div className={cn('products-list')}>
                              {order.product_list ? (
                                 order.product_list.map((product) => {
                                    return (
                                       <div className={cn('product')} key={product.product.ctdh_id}>
                                          <div className={cn('flex')}>
                                             <img
                                                src={'http://localhost:4000/' + product.product.sp_image}
                                                alt="Ảnh sản phẩm"
                                             />

                                             <div className={cn('flex-info')}>
                                                <h3 className={cn('product-name')}>{product.product.sp_ten}</h3>

                                                <h3 className={cn('product-amount')}>x{product.product.ctdh_sl}</h3>
                                             </div>
                                          </div>

                                          <div className={cn('price')}>
                                             {/* <h3 className={cn('old-price')}>{currencyFormater.format('99900000')}</h3> */}
                                             <h3 className={cn('current-price')}>
                                                {currencyFormater.format(product.product.ctdh_gia)}
                                             </h3>
                                          </div>
                                       </div>
                                    );
                                 })
                              ) : (
                                 <></>
                              )}
                           </div>

                           <h3 className={cn('order-total')}>
                              <i style={{ fontWeight: '400' }}>Thành tiền:</i>
                              {currencyFormater.format(order.order.dh_tongtien)}
                           </h3>

                           <div className={cn('order-actions')}>
                              <div className={cn('cancel-order-btn')}>
                                 <Button border thinfont>
                                    Hủy đơn
                                 </Button>
                              </div>
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   );
}

export default Orders;
