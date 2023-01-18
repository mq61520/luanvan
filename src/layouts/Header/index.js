import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

import Button from '~/components/Button';
import styles from './Header.module.scss';
import Dropdown from '~/components/Dropdown';

const cn = classNames.bind(styles);

function Header() {
   const [currentUser, setCurrentUser] = useState('idsbbvihvuih');

   const handerLogout = () => {
      localStorage.removeItem('name');
      setCurrentUser('');
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('header-logo')} onClick={() => window.open('http://localhost:3000/', '_self')}>
               2hand Store
            </div>

            <div className={cn('account')}>
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
                                 <Button onlytext onClick={handerLogout}>
                                    Logout
                                 </Button>
                              </div>
                           </Dropdown>
                        </div>
                     )}
                  >
                     <div className={cn('account-name')}>{currentUser}</div>
                  </Tippy>
               ) : (
                  <div className={cn('account-actions')}>
                     <div className={cn('action')}>
                        <Button border to={'/register'}>
                           Sign up
                        </Button>
                     </div>

                     <div className={cn('action')}>
                        <Button border to={'/login'}>
                           Sign in
                        </Button>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}

export default Header;
