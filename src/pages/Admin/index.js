import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import OrderItem from '~/components/OrderItem/index';

const cn = classNames.bind(styles);

function Admin() {
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
            </div>

            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
            <OrderItem></OrderItem>
         </div>
      </div>
   );
}

export default Admin;
