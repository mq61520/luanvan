import classNames from 'classnames/bind';

import styles from './OrderManager.module.scss';
import Button from '~/components/Button/index';
import OrderItem from '~/components/OrderItem/index';

const cn = classNames.bind(styles);

function OrderManager() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Quản lý đơn hàng</h4>

            <div className={cn('order-status')}>
               <div className={cn('flex')}>
                  <span>Trạng thái đơn hàng</span>

                  <div className={cn('status')}>
                     <div className={cn('status-btn')}>
                        <Button border thinfont>
                           Chờ lấy hàng
                        </Button>
                     </div>
                     <div className={cn('status-btn')}>
                        <Button border thinfont>
                           Đang giao
                        </Button>
                     </div>
                     <div className={cn('status-btn')}>
                        <Button border thinfont>
                           Đã giao
                        </Button>
                     </div>
                     <div className={cn('status-btn')}>
                        <Button border thinfont>
                           Đã hủy
                        </Button>
                     </div>
                  </div>
               </div>

               <div className={cn('save-change-btn')}>
                  <Button borderfill>Lưu thay đổi</Button>
               </div>
            </div>

            <h3 className={cn('title-list')}>Danh sách các đơn hàng</h3>

            <div className={cn('order-list')}>
               <div className={cn('order-list-header')}>
                  <h4 className={cn('order-code')}>Ngày đặt</h4>

                  <h4 className={cn('order-code')}>Mã đơn hàng</h4>

                  <h4 className={cn('customer-name')}>Tên khách hàng</h4>

                  <h4 className={cn('amount')}>Số sản phẩm</h4>

                  <h4 className={cn('price')}>Tổng tiền</h4>

                  <h4 className={cn('check')}>Duyệt đơn</h4>
               </div>

               <OrderItem />
               <OrderItem />
               <OrderItem />
            </div>
         </div>
      </div>
   );
}

export default OrderManager;
