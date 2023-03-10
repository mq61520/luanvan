import classNames from 'classnames/bind';

import styles from './Product.module.scss';
import Button from '../Button/index';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function Product({ img, product_name, price, sale }) {
   var newimg = 'http://localhost:4000/' + img;

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            {sale ? (
               <div className={cn('sale-flag')}>
                  <p>-30%</p>
               </div>
            ) : (
               <></>
            )}

            <img src={newimg} alt="Product imgae" />

            <div className={cn('product-title')}>
               <h3>{product_name}</h3>

               <div>
                  {sale ? <h4 className={cn('sale-price')}>{currencyFormater.format(1596000)}</h4> : <></>}
                  <h4 className={cn('product-price')}>{currencyFormater.format(price)}</h4>
               </div>
            </div>

            <div className={cn('product-btn')}>
               <Button onlytext thinfont to={'/detail/1'}>
                  Chi tiết
               </Button>
            </div>
         </div>
      </div>
   );
}

export default Product;
