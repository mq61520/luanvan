import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './Admin.module.scss';
import OrderItem from '~/components/OrderItem/index';

const cn = classNames.bind(styles);

function Admin() {
   document.title = 'Trang chủ';
   const [orderList, setOrderList] = useState([]);

   const handleGetOrderList = async () => {
      try {
         const order_list_res = await axios.get('http://localhost:4000/order/status/Pending');

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

   // console.log(orderList);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Các đơn hàng chưa duyệt</h4>

            <div className={cn('order-header')}>
               <h4 className={cn('time-order')}>Thời gian đặt hàng</h4>

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
                           order_list={order.order}
                           product_list={order.product_list}
                           confirmed={(status) => {
                              if (status === 'Confirm') {
                                 toast.success('Đã duyệt đơn hàng ' + order.order.dh_ma, {
                                    position: 'top-center',
                                 });
                              }
                           }}
                           handle_get_order_list={handleGetOrderList}
                        />
                     );
                  })
               ) : (
                  <div>Hiện chưa có đơn hàng nào cần duyệt</div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Admin;
