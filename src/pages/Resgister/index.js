import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import Button from '~/components/Button';
import styles from './Resgister.module.scss';

const cn = classNames.bind(styles);

function Resgister() {
   document.title = 'Register';

   const errRef = useRef();

   const [email, setEmail] = useState('');
   const [pwd, setPwd] = useState('');
   const [repwd, setRePwd] = useState('');

   const [errMsg, setErrMsg] = useState('');

   const handlerRegister = async (e) => {
      e.preventDefault();

      if (repwd !== pwd) {
         setErrMsg('Password not match');
         return;
      }

      try {
         const response = await axios.post(`http://localhost:4000/register`, {
            e: email,
            p: pwd,
         });

         if (response.data === 'oke') {
            setErrMsg('Register successful');
            setEmail('');
            setPwd('');
            setRePwd('');
         } else {
            setErrMsg('Register failure');
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('res-form')}>
               {errMsg ? (
                  <div ref={errRef} className={cn('notifications')}>
                     <p>{errMsg}</p>
                  </div>
               ) : (
                  <></>
               )}

               <div className={cn('title')}>
                  <span>Resgister</span>
               </div>

               <div className={cn('form')}>
                  <form onSubmit={handlerRegister}>
                     <div className={cn('input-field')}>
                        <div className={cn('input-field-item')}>
                           <label className={cn('label')}>Email</label>
                           <input
                              className={cn('input-txt')}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              value={email}
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
   );
}

export default Resgister;
