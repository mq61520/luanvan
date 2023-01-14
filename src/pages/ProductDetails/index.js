import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinus, faPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import styles from './ProductDetails.module.scss';
import Button from '~/components/Button';

const cn = classNames.bind(styles);

function ProductDetails() {
   const currencyFormater = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
   });

   const [inStock, setInStock] = useState(true);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('product-details')}>
               <div className={cn('product-image')}>
                  <div className={cn('img-slide')}>Image slide</div>

                  <img src="https://cf.shopee.vn/file/54d12bf3a6c20c9995f826ef8bb50f06" alt="Hình ảnh sản phẩm" />
               </div>

               <div className={cn('product-info')}>
                  <h2 className={cn('product-name')}>Ví da handmade kim ví đựng thẻ</h2>

                  <div className={cn('product-vote')}>
                     <span className={cn('vote-rate')}>4.9</span>
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                  </div>

                  <h2 className={cn('product-price')}>{currencyFormater.format(1254542)}</h2>

                  <div className={cn('flex-amount')}>
                     <div className={cn('product-amount')}>
                        <FontAwesomeIcon className={cn('increase-product')} icon={faMinus} />
                        <h2 className={cn('amount')}>12</h2>
                        <FontAwesomeIcon className={cn('minus-product')} icon={faPlus} />
                     </div>

                     <div className={cn('product-instock')}>
                        <span>Kho: </span>
                        {inStock ? (
                           <span className={cn('stocking')}>Còn hàng</span>
                        ) : (
                           <span className={cn('out-of-stock')}>Tạm hết</span>
                        )}
                     </div>
                  </div>

                  <div className={cn('btns')}>
                     <div className={cn('add-to-cart-btn')}>
                        <Button border lefticon={<FontAwesomeIcon icon={faCartShopping} />}>
                           Thêm vào giỏ hàng
                        </Button>
                     </div>

                     <div className={cn('buy-now-btn')}>
                        <Button>Mua ngay</Button>
                     </div>
                  </div>
               </div>
            </div>

            <div className={cn('product-descriptions')}>
               <h3>Mo ta san pham</h3>

               <div className={cn('descriptions')}>
                  <p>
                     - 8,5 x 11 cm - Da bò nhập khẩu. - 1 ngăn tiền thẳng, 1 ngăn ảnh, 4 ngăn thẻ, 2 ngăn tùy thích.
                     -Thêm 1 ngăn phía ngoài. - Hộp riêng, sẵn sàng làm quà tặng. - Nhiều lựa chọn khắc tên, chữ ký, lời
                     nhắn,...
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;
