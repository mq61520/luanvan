import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './AccountsManager.module.scss';
import Account from '~/components/Account';

const cn = classNames.bind(styles);

function AccountsManager() {
   document.title = 'Quản lý tài khoản';

   const [userList, setUserList] = useState([]);

   const handleGetUser = async () => {
      try {
         const user_list_res = await axios.get('http://localhost:4000/accounts');

         if (user_list_res.data.length > 0) {
            setUserList(user_list_res.data);
         } else {
            console.log('loi');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetUser();
   }, []);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Danh sách tài khoản</h4>

            <div className={cn('accounts')}>
               <div className={cn('customer-accounts')}>
                  <h3 className={cn('title-list')}>Tài khoản của khách hàng</h3>

                  <div className={cn('account-list')}>
                     {userList ? (
                        userList.map((user) => {
                           return <Account key={user.nd_id} image={user.nd_avatar} ten_nd={user.nd_hoten} />;
                        })
                     ) : (
                        <></>
                     )}
                  </div>
               </div>

               {/* <div className={cn('admin-accounts')}>
                  <h3 className={cn('title-list')}>Tài khoản của Admin</h3>

                  <div className={cn('account-list')}>
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                     <Account />
                  </div>
               </div> */}
            </div>
         </div>
      </div>
   );
}

export default AccountsManager;
