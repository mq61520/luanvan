import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '~/components/Button';
import styles from './Resgister.module.scss';

const cn = classNames.bind(styles);

function Resgister() {
   document.title = 'Register';

   // const errRef = useRef();

   const [userName, setUserName] = useState('');
   const [loginName, setLoginName] = useState('');
   const [pwd, setPwd] = useState('');
   const [repwd, setRePwd] = useState('');

   // const [errMsg, setErrMsg] = useState('');

   const handlerRegister = async (e) => {
      e.preventDefault();

      if (repwd !== pwd) {
         // setErrMsg('Password not match');
         toast.warn('Password not match', { position: 'top-center' });
         return;
      }

      try {
         const response = await axios.post(`http://localhost:4000/register`, {
            username: userName,
            loginname: loginName,
            loginpwd: pwd,
         });

         if (response.data === 'Success') {
            toast.success('Register successful!', { position: 'top-center' });
            // setErrMsg('Register successful');
            setUserName('');
            setLoginName('');
            setPwd('');
            setRePwd('');
         } else if (response.data === 'Username available') {
            // setErrMsg('Username available');
            toast.warn('Username available', { position: 'top-center' });
         } else {
            // setErrMsg('Register failure');
            toast.warn('Register failure', { position: 'top-center' });
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <>
         {/* <ToastContainer /> */}

         <div className={cn('wrapper')}>
            <div className={cn('inner-contents')}>
               <div className={cn('res-form')}>
                  {/* {errMsg ? (
                     <div ref={errRef} className={cn('notifications')}>
                        <p>{errMsg}</p>
                     </div>
                  ) : (
                     <></>
                  )} */}

                  <div className={cn('title')}>
                     <span>Resgister</span>
                  </div>

                  <div className={cn('form')}>
                     <form onSubmit={handlerRegister}>
                        <div className={cn('input-field')}>
                           <div className={cn('input-field-item')}>
                              <label className={cn('label')}>User name</label>
                              <input
                                 className={cn('input-txt')}
                                 onChange={(e) => setUserName(e.target.value)}
                                 required
                                 value={userName}
                              />
                           </div>

                           <div className={cn('input-field-item')}>
                              <label className={cn('label')}>Login name</label>
                              <input
                                 className={cn('input-txt')}
                                 onChange={(e) => setLoginName(e.target.value)}
                                 required
                                 value={loginName}
                              />
                           </div>

                           <div className={cn('input-field-item')}>
                              <label className={cn('label')}>Password</label>
                              <input
                                 className={cn('input-txt')}
                                 type="password"
                                 onChange={(e) => setPwd(e.target.value)}
                                 required
                                 value={pwd}
                              />
                           </div>

                           <div className={cn('input-field-item')}>
                              <label className={cn('label')}>Rewrite-password</label>
                              <input
                                 className={cn('input-txt')}
                                 type="password"
                                 onChange={(e) => setRePwd(e.target.value)}
                                 required
                                 value={repwd}
                              />
                           </div>
                        </div>

                        <div className={cn('actions')}>
                           <Button border>Resgister</Button>
                        </div>
                     </form>

                     <div className={cn('to-sign-in')}>
                        <span>or</span>
                        <div>
                           <Button to={'/login'} onlytext>
                              Sign in
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Resgister;
