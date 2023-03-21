import { useState, useEffect } from 'react';
import axios from 'axios';

import { CartContext } from './Context';

function Provider({ children }) {
   const [cartCount, setCartCount] = useState({ cartCount: 0, listPay: [] });

   const handleGetAmountCart = async () => {
      try {
         const amount_cart_response = await axios.get(
            'http://localhost:4000/cart/' + localStorage.getItem('current_user'),
         );

         if (amount_cart_response.data) {
            // console.log(amount_cart_response.data);
            // setCartCount(amount_cart_response.data[0].amount_cart);
            setCartCount({ ...cartCount, cartCount: amount_cart_response.data[0].amount_cart });
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetAmountCart();
   }, []);

   return <CartContext.Provider value={[cartCount, setCartCount]}>{children}</CartContext.Provider>;
}

export default Provider;
