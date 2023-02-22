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
                  <p>-30%</p>
               </div>
            ) : (
               <></>
            )}

            <img
               src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2022/12/gong-kinh-nu-versace-0ve3327u-gb155-i-mau-den-vang-63a413c357835-22122022152227.jpg"
               alt="img"
            />

            <div className={cn('product-title')}>
               <h3>Gọng Kính Nữ Versace 0VE3327U GB155.I Màu Đen Vàng</h3>

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
