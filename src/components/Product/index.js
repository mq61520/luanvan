import classNames from 'classnames/bind';

import styles from './Product.module.scss';
import Button from '../Button/index';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function Product({ img, name, price, sale }) {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            {sale ? (
               <div className={cn('sale-flag')}>
                  <p>30%</p>
                  <p>Giảm</p>
               </div>
            ) : (
               <></>
            )}

            <img src="https://thatlungnam.com.vn/wp-content/uploads/2018/06/vi-da-nam-handmade-001-4.jpg" alt="img" />

            <div className={cn('product-title')}>
               <h3>Ví Da Nam Handmade Kiêm Ví Đựng Thẻ</h3>

               <div>
                  {sale ? <h4 className={cn('sale-price')}>{currencyFormater.format(1596000)}</h4> : <></>}
                  <h4 className={cn('product-price')}>{currencyFormater.format(1596000)}</h4>
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
