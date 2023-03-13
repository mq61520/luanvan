import { useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

import styles from './Login.module.scss';
import Button from '~/components/Button';

const cn = classNames.bind(styles);

function Login() {
   document.title = 'Login';

   const loginNameRef = useRef();
   // const errRef = useRef();

   const [loginName, setLoginName] = useState('');
   const [pwd, setPwd] = useState('');

   const [showPwd, setShowPwd] = useState('password');

   // const [errMsg, setErrMsg] = useState('');

   const handlerLogin = async (e) => {
      e.preventDefault();

      if (loginName.length === 0) {
         toast.error('Enter your Email!', { position: 'top-center' });
         // setErrMsg('Enter your Email!');
         return;
      } else if (pwd.length === 0) {
         toast.error('Enter your Password!', { position: 'top-center' });
         // setErrMsg('Enter your Password!');
         return;
      }

      try {
         const response = await axios.post(`http://localhost:4000/account`, {
            loginname: loginName,
            loginpwd: pwd,
         });

         if (response.data[0].exist === 1) {
            localStorage.setItem('current_user', response.data[0].nd_id);
            localStorage.setItem('avatar_name', response.data[0].nd_avatar);

            if (response.data[0].nd_role === 1) {
               window.open('http://localhost:3000/admin', '_self');
               localStorage.setItem('name', response.data[0].nd_hoten);
            } else {
               window.open('http://localhost:3000/', '_self');
               localStorage.setItem('user_name', response.data[0].nd_hoten);
            }
         } else {
            toast.error('Username or password are not corrects!', { position: 'top-center' });
            // setErrMsg('Username or password are not corrects!');
            setLoginName('');
            setPwd('');
            loginNameRef.current.focus();
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handlerShowPwd = () => {
      if (showPwd === 'password') {
         setShowPwd('text');
      } else {
         setShowPwd('password');
      }
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('login-form')}>
               {/* {errMsg ? (
                  <div ref={errRef} className={cn('notifications')}>
                     <p>{errMsg}</p>
                  </div>
               ) : (
                  <></>
               )} */}

               <div className={cn('title')}>
                  <span>Login</span>
               </div>

               <div className={cn('form')}>
                  <section>
                     <form onSubmit={handlerLogin}>
                        <div className={cn('input-field')}>
                           <div className={cn('input-field-item')}>
                              <FontAwesomeIcon className={cn('input-field-icon')} icon={faUser} />
                              <input
                                 ref={loginNameRef}
                                 className={cn('input-txt')}
                                 placeholder="Login name"
                                 onChange={(e) => setLoginName(e.target.value)}
                                 value={loginName}
                              />
                           </div>

                           <div className={cn('input-field-item')}>
                              <FontAwesomeIcon className={cn('input-field-icon')} icon={faKey} />
                              <input
                                 className={cn('input-txt')}
                                 type={showPwd}
                                 placeholder="Password"
                                 onChange={(e) => setPwd(e.target.value)}
                                 value={pwd}
                              />

                              {pwd.length >= 1 ? (
                                 <div onClick={handlerShowPwd}>
                                    <FontAwesomeIcon className={cn('show-pass')} icon={faEyeSlash} />
                                 </div>
                              ) : (
                                 <></>
                              )}
                           </div>
                        </div>

                        {/* <div className={cn('forgot-pwd')}>
                           <span>Forgot your password?</span>
                        </div> */}

                        <div className={cn('actions')}>
                           <Button border>Sign in</Button>
                        </div>
                     </form>
                  </section>

                  <div className={cn('to-sign-up')}>
                     <span>or</span>
                     <div>
                        <Button to={'/register'} onlytext>
                           Sign up
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
