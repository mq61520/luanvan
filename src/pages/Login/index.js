import { useRef, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faKey, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './Login.module.scss';
import Button from '~/components/Button';

const cn = classNames.bind(styles);

function Login() {
   document.title = 'Login';

   const emailRef = useRef();
   const errRef = useRef();

   const [email, setEmail] = useState('');
   const [pwd, setPwd] = useState('');

   const [showPwd, setShowPwd] = useState('password');

   const [errMsg, setErrMsg] = useState('');

   const handlerLogin = async (e) => {
      e.preventDefault();

      if (email.length === 0) {
         setErrMsg('Enter your Email!');
         return;
      } else if (pwd.length === 0) {
         setErrMsg('Enter your Password!');
         return;
      }

      try {
         const response = await axios.post(`http://localhost:4000/user`, {
            e: email,
            p: pwd,
         });

         if (response.data[0].isHas === 1) {
            window.open('http://localhost:3000/', '_self');
            localStorage.setItem('name', response.data[0].isHas);
         } else {
            setErrMsg('Username or password are not corrects!');
            setEmail('');
            setPwd('');
            emailRef.current.focus();
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
               {errMsg ? (
                  <div ref={errRef} className={cn('notifications')}>
                     <p>{errMsg}</p>
                  </div>
               ) : (
                  <></>
               )}

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
                                 ref={emailRef}
                                 className={cn('input-txt')}
                                 placeholder="Email"
                                 onChange={(e) => setEmail(e.target.value)}
                              />
                           </div>

                           <div className={cn('input-field-item')}>
                              <FontAwesomeIcon className={cn('input-field-icon')} icon={faKey} />
                              <input
                                 className={cn('input-txt')}
                                 type={showPwd}
                                 placeholder="Password"
                                 onChange={(e) => setPwd(e.target.value)}
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
