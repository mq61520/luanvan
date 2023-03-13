import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons/index';

import styles from './Header.module.scss';
import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown';
import CartContext from '~/globalState/Context';

const cn = classNames.bind(styles);

function Header() {
   const [cartAmount, setCartAmount] = useContext(CartContext);

   const [currentUser, setCurrentUser] = useState(localStorage.getItem('user_name'));
   const [listBrands, setListBrands] = useState('');

   // const avatar_img = localStorage.getItem('avatar_name');

   const handleLogout = () => {
      localStorage.removeItem('name');
      setCurrentUser('');
      window.open('http://localhost:3000/', '_self');
   };

   const handleLoadBrands = async () => {
      try {
         const response = await axios.get('http://localhost:4000/brands');

         if (response.data) {
            setListBrands(response.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleLoadBrands();
   }, []);

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

               {/* <Tippy
                  interactive
                  render={(attrs) => (
                     <div className={cn('content')} tabIndex="-1" {...attrs}>
                        <Dropdown>
                           <div className={cn('brands-list')}>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Kính nam
                                 </Button>
                              </div>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Kính nữ
                                 </Button>
                              </div>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Unisex
                                 </Button>
                              </div>
                              <div className={cn('brand-item')}>
                                 <Button onlytext thinfont to={'brand'}>
                                    Trẻ em
                                 </Button>
                              </div>
                           </div>
                        </Dropdown>
                     </div>
                  )}
               > */}
               <div
                  className={cn('nav-item')}
                  onClick={() => {
                     window.open('http://localhost:3000/products/all', '_self');
                  }}
               >
                  <span>Sản phẩm</span>
               </div>
               {/* </Tippy> */}

               <Tippy
                  interactive
                  render={(attrs) => (
                     <div className={cn('content')} tabIndex="-1" {...attrs}>
                        <Dropdown>
                           <div className={cn('brands-list')}>
                              {listBrands ? (
                                 listBrands.map((brand) => {
                                    return (
                                       <div key={brand.th_id} className={cn('brand-item')}>
                                          <Button
                                             onlytext
                                             thinfont
                                             onClick={() => {
                                                window.open(`http://localhost:3000/brand/${brand.th_link}`, '_self');
                                             }}
                                          >
                                             {brand.th_ten}
                                          </Button>
                                       </div>
                                    );
                                 })
                              ) : (
                                 <></>
                              )}
                           </div>
                        </Dropdown>
                     </div>
                  )}
               >
                  <div
                     className={cn('nav-item')}
                     onClick={() => {
                        window.open(`http://localhost:3000/brand/all`, '_self');
                     }}
                  >
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

                           <div className={cn('cart-flag')}>{cartAmount}</div>
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

                           {/* <img
                              className={cn('account-avatar')}
                              src={
                                 avatar_img
                                    ? `http://localhost:4000/${avatar_img}`
                                    : 'https://i.pinimg.com/originals/f0/74/dc/f074dc9f568075e9b025c683c6599760.png'
                              }
                              alt="Avatar"
                           /> */}
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
