import { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/index';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown';

const cn = classNames.bind(styles);

function Header() {
   const [currentUser, setCurrentUser] = useState('sadvsdv');

   const handleLogout = () => {
      localStorage.removeItem('name');
      setCurrentUser('');
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('header-logo')} onClick={() => window.open('http://localhost:3000/', '_self')}>
               goodEYE
            </div>

            <div className={cn('nav')}>
               <div className={cn('nav-item')} onClick={() => window.open('http://localhost:3000/', '_self')}>
                  <span>Trang chủ</span>
               </div>

               <Tippy
                  interactive
                  render={(attrs) => (
                     <div className={cn('content')} tabIndex="-1" {...attrs}>
                        <Dropdown>
                           <div className={cn('brands-list')}>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Dior
                                 </Button>
                              </div>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Versace
                                 </Button>
                              </div>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Lacoste
                                 </Button>
                              </div>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Calvin Klein
                                 </Button>
                              </div>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Gucci
                                 </Button>
                              </div>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Docle & Gabbana
                                 </Button>
                              </div>
                           </div>
                        </Dropdown>
                     </div>
                  )}
               >
                  <div className={cn('nav-item')}>
                     <span>Thương hiệu</span>
                  </div>
               </Tippy>
            </div>

            <div className={cn('flex-right-header')}>
               <div className={cn('cart')}>
                  {currentUser ? (
                     <>
                        <div className={cn('cart-btn')}>
                           <Button onlytext to={'/cart'}>
                              <FontAwesomeIcon className={cn('cart-icon')} icon={faCartShopping} />
                           </Button>

                           <div className={cn('cart-flag')}>12</div>
                        </div>
                     </>
                  ) : (
                     <></>
                  )}
               </div>

               <div className={cn('account')}>
                  {currentUser ? (
                     <Tippy
                        interactive
                        render={(attrs) => (
                           <div className={cn('content')} tabIndex="-1" {...attrs}>
                              <Dropdown>
                                 <div className={cn('account-tool')}>
                                    <Button onlytext thinfont to={'/orders'}>
                                       Đơn mua
                                    </Button>
                                 </div>

                                 <div className={cn('account-tool')}>
                                    <Button onlytext thinfont to={'/profile'}>
                                       Profile
                                    </Button>
                                 </div>

                                 <div className={cn('account-tool')}>
                                    <Button onlytext thinfont onClick={handleLogout}>
                                       Logout
                                    </Button>
                                 </div>
                              </Dropdown>
                           </div>
                        )}
                     >
                        <div className={cn('account-info')}>
                           <div className={cn('account-name')}>{currentUser}</div>

                           <img
                              className={cn('account-avatar')}
                              src="https://i.pinimg.com/originals/f0/74/dc/f074dc9f568075e9b025c683c6599760.png"
                              alt="Avatar"
                           />
                        </div>
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
      </div>
   );
}

export default Header;
