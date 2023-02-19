import classNames from 'classnames/bind';

import styles from './AccountsManager.module.scss';
import Account from '~/components/Account';

const cn = classNames.bind(styles);

function AccountsManager() {
   document.title = 'Quản lý tài khoản';

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Danh sách tài khoản</h4>

            <div className={cn('accounts')}>
               <div className={cn('customer-accounts')}>
                  <h3 className={cn('title-list')}>Tài khoản của khách hàng</h3>

                  <div className={cn('account-list')}>
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                  </div>
               </div>

               <div className={cn('admin-accounts')}>
                  <h3 className={cn('title-list')}>Tài khoản của Admin</h3>

                  <div className={cn('account-list')}>
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AccountsManager;
