import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import styles from './AdminHeader.module.scss';
import Button from '~/components/Button/index';
import Dropdown from '~/components/Dropdown/index';

const cn = classNames.bind(styles);

function AdminHeader() {
   const [currentUser, setCurrentUser] = useState(localStorage.getItem('name'));

   const handleReturnHome = () => {
      window.open('http://localhost:3000/admin', '_self');
   };

   const handleLogout = () => {
      window.open('http://localhost:3000', '_self');
      localStorage.removeItem('name');
      setCurrentUser('');
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('header-logo')} onClick={handleReturnHome}>
               <h1>
                  <i>Admin</i>
               </h1>
            </div>

            <div className={cn('header-actions')}>
               {currentUser ? (
                  <Tippy
                     interactive
                     render={(attrs) => (
                        <div className={cn('content')} tabIndex="-1" {...attrs}>
                           <Dropdown>
                              <div className={cn('account-tool')}>
                                 <Button onlytext to={'/profile'}>
                                    Profile
                                 </Button>
                              </div>

                              <div className={cn('account-tool')}>
                                 <Button onlytext onClick={handleLogout}>
                                    Logout
                                 </Button>
                              </div>
                           </Dropdown>
                        </div>
                     )}
                  >
                     <div className={cn('account')}>
                        <h4>{currentUser}</h4>

                        <img src="https://cdn-icons-png.flaticon.com/512/863/863817.png" alt="Admin avatar" />
                     </div>
                  </Tippy>
               ) : (
                  <></>
               )}
            </div>
         </div>
      </div>
   );
}

export default AdminHeader;
