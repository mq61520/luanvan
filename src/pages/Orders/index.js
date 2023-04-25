import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './Orders.module.scss';
import Button from '~/components/Button';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function Orders() {
   document.title = 'Đơn hàng';

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

            setOrderList(order_list.reverse());
         } else {
            console.log('K co don hang');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleCancelOrder = async (ma_dh, slsp, product_list) => {
      console.log(ma_dh, slsp);
      try {
         const cancel_order_res = await axios.post('http://localhost:4000/order/update_status', {
            ma_dh: ma_dh,
            trang_thai: 'Cancelled',
         });

         if (cancel_order_res.data === 'UpdateStatusSuccess') {
            for (let i = 0; i < slsp; i++) {
               const update_product_amount_res = await axios.post('http://localhost:4000/product_update_amount_v2', {
                  ma_sp: product_list[i].product.sp_ma,
                  type: 'tang',
                  sl: product_list[i].product.ctdh_sl,
               });

               if (i + 1 === slsp && update_product_amount_res.data === 'UpdateAmountSuccess') {
                  handleGetOrderList();
                  toast.success('Đã hủy đơn hàng' + ma_dh + ' thành công!', {
                     position: 'top-center',
                  });
               }
            }
         } else {
            toast.error('Hủy đơn hàng không thành công!', {
               position: 'top-center',
            });
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
                        document.title = 'Tất cả đơn hàng';
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
                        document.title = 'Đơn hàng chờ xác nhận';
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
                        document.title = 'Đơn hàng đang chuẩn bị';
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
                        document.title = 'Đơn hàng đang giao';
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
                        document.title = 'Đơn hàng đã giao';
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
                        window.location.pathname = '/orders/Cancelled';
                        document.title = 'Đơn hàng đã hủy';
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
                              {order.order.dh_trangthai === 'Pending' ? (
                                 <div className={cn('cancel-order-btn')}>
                                    <Button
                                       border
                                       thinfont
                                       onClick={() =>
                                          handleCancelOrder(order.order.dh_ma, order.order.dh_slsp, order.product_list)
                                       }
                                    >
                                       Hủy đơn
                                    </Button>
                                 </div>
                              ) : (
                                 <></>
                              )}
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <div>Bạn chưa có đơn nào!</div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Orders;
