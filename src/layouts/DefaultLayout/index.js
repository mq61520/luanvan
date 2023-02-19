import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons/index';

import Header from '../Header';
import Footer from '../Footer';

import './DefaultLayout.scss';
import Button from '~/components/Button/index';
import { useState } from 'react';

function DefaultLayout({ children }) {
   const [show, setShow] = useState('to-top-btn disable');

   useEffect(() => {
      const showHideToTop = (e) => {
         if (window.scrollY > 100) setShow('to-top-btn show');
         if (window.scrollY < 100) setShow('to-top-btn disable');
         // console.log(window.scrollY);
      };

      window.addEventListener('scroll', showHideToTop);

      return () => {
         window.removeEventListener('scroll', showHideToTop);
      };
   }, []);

   const handleToTop = () => {
      window.scrollTo(0, 0);
   };

   return (
      <div>
         <Header />
         <div>{children}</div>
         <Footer />

         <div className={show}>
            <Button onlytext onClick={handleToTop}>
               <FontAwesomeIcon className="to-top-btn-icon" icon={faArrowUp} />
            </Button>
         </div>
      </div>
   );
}

export default DefaultLayout;
