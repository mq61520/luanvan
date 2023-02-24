import classNames from 'classnames/bind';

import styles from './SubmitPay.module.scss';
import Button from '~/components/Button';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function SubmitPay() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('wrapper')}></div>
      </div>
   );
}

export default SubmitPay;
