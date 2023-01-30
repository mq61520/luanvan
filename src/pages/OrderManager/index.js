import classNames from 'classnames/bind';

import styles from './OrderManager.module.scss';

const cn = classNames.bind(styles);

function OrderManager() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Quản lý đơn hàng</h4>

            <div className={cn('order-list')}></div>
         </div>
      </div>
   );
}

export default OrderManager;
