import classNames from 'classnames/bind';

import styles from './OrderItem.module.scss';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function OrderItem() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('order')}>
               <h4 className={cn('time-order')}>09:10:45 15/5/2023</h4>

               <h4 className={cn('order-code')}>KBWIBV-GGFDJG-00</h4>

               <h4 className={cn('customer-name')}>Nguyễn Văn Nói Nhiều</h4>

               <h4 className={cn('amount')}>99</h4>

               <h4 className={cn('price')}>{currencyFormater.format(1545000)}</h4>

               <h4 className={cn('price')}>{currencyFormater.format(1545700)}</h4>
            </div>

            <div className={cn('order-actions')}></div>
         </div>
      </div>
   );
}

export default OrderItem;
