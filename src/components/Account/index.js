import classNames from 'classnames/bind';
import Button from '../Button/index';

import styles from './Account.module.scss';

const cn = classNames.bind(styles);

function Account({ image, ten_nd }) {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <img src={'http://localhost:4000/' + image} alt="Avatar" />

            <h3>{ten_nd}</h3>

            <div className={cn('acc-btn')}>
               <Button onlytext thinfont>
                  chi tiết
               </Button>
            </div>
         </div>
      </div>
   );
}

export default Account;
