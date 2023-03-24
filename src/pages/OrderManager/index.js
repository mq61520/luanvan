import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './OrderManager.module.scss';
import Button from '~/components/Button/index';
import OrderItem from '~/components/OrderItem/index';
import { toast } from 'react-toastify';

const cn = classNames.bind(styles);

function OrderManager() {
   const [orderList, setOrderList] = useState([]);

   const handleGetOrderList = async () => {
      var status = window.location.pathname.slice(20);
      var order_list_res;

      try {
         if (status === 'all') {
            order_list_res = await axios.get('http://localhost:4000/order/status/' + status);
         } else {
            order_list_res = await axios.get('http://localhost:4000/order/status/' + status);
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

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Quản lý đơn hàng</h4>

            <div className={cn('order-status')}>
               <div className={cn('flex')}>
                  <span>Trạng thái đơn hàng</span>

                  <div className={cn('status')}>
                     <div className={cn('status-btn')}>
                        <Button
                           border
                           thinfont
                           onClick={() => {
                              window.location.pathname = '/admin/ordermanager/all';
                           }}
                        >
                           Tất cả
                        </Button>
                     </div>
                     <div className={cn('status-btn')}>
                        <Button
                           border
                           thinfont
                           onClick={() => {
                              window.location.pathname = '/admin/ordermanager/Preparing';
                           }}
                        >
                           Chờ lấy hàng
                        </Button>
                     </div>
                     <div className={cn('status-btn')}>
                        <Button
                           border
                           thinfont
                           onClick={() => {
                              window.location.pathname = '/admin/ordermanager/Delivering';
                           }}
                        >
                           Đang giao
                        </Button>
                     </div>
                     <div className={cn('status-btn')}>
                        <Button
                           border
                           thinfont
                           onClick={() => {
                              window.location.pathname = '/admin/ordermanager/Delivered';
                           }}
                        >
                           Đã giao
                        </Button>
                     </div>
                     <div className={cn('status-btn')}>
                        <Button
                           border
                           thinfont
                           onClick={() => {
                              window.location.pathname = '/admin/ordermanager/Cancelled';
                           }}
                        >
                           Đã hủy
                        </Button>
                     </div>
                  </div>
               </div>

               {/* <div className={cn('save-change-btn')}>
                  <Button borderfill>Lưu thay đổi</Button>
               </div> */}
            </div>

            <h3 className={cn('title-list')}>Danh sách đơn hàng</h3>

            <div className={cn('order-list')}>
               <div className={cn('order-list-header')}>
                  <h4 className={cn('order-time')}>Ngày đặt</h4>

                  <h4 className={cn('order-code')}>Mã đơn hàng</h4>

                  <h4 className={cn('customer-name')}>Tên khách hàng</h4>

                  <h4 className={cn('amount')}>Số sản phẩm</h4>

                  <h4 className={cn('price')}>Tổng tiền</h4>

                  <h4 className={cn('check')}>Thao tác</h4>
               </div>

               <div className={cn('order-list')}>
                  {orderList.length > 0 ? (
                     orderList.map((order) => {
                        return (
                           <OrderItem
                              key={order.order.dh_id}
                              checked
                              order_list={order.order}
                              product_list={order.product_list}
                              update_order_list={handleGetOrderList}
                              update_status={(e) => {
                                 if (e === 'UpdateStatusSuccess') {
                                    handleGetOrderList();
                                    toast.success('Cập nhật trạng thái thành công', { position: 'top-center' });
                                 } else {
                                    toast.error('Cập nhật trạng thái không thành công', { position: 'top-center' });
                                 }
                              }}
                           />
                        );
                     })
                  ) : (
                     <div>Hiện chưa có đơn hàng nào cần duyệt</div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default OrderManager;
