import classNames from 'classnames/bind';
import Button from '../Button/index';

import styles from './Account.module.scss';

const cn = classNames.bind(styles);

function Account() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <img
               src="https://www.otakupt.com/wp-content/uploads/2022/10/Chainsaw-Man-op-screenshot-2.jpg"
               alt="Avatar"
            />

            <h3>Nguyen Nguyen Minh</h3>

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
