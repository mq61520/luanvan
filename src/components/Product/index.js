import classNames from 'classnames/bind';

import styles from './Product.module.scss';
import Button from '../Button/index';

const cn = classNames.bind(styles);

function Product({ img, name, price }) {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <img src="https://thatlungnam.com.vn/wp-content/uploads/2018/06/vi-da-nam-handmade-001-4.jpg" alt="img" />

            <div className={cn('product-title')}>
               <h3>Ví Da Nam Handmade Kiêm Ví Đựng Thẻ</h3>

               <h4>399.000</h4>
            </div>

            <div className={cn('product-btn')}>
               <Button>Chi tiet</Button>
            </div>
         </div>
      </div>
   );
}

export default Product;
