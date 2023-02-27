import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/index';

import styles from './SubmitPay.module.scss';
import Button from '~/components/Button';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function SubmitPay() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('delivery-address')}>
               <div className={cn('letter')}></div>

               <h3 className={cn('title')}>
                  <FontAwesomeIcon className={cn('icon')} icon={faLocationDot} />
                  Địa chỉ nhận hàng
               </h3>

               <div className={cn('address')}>
                  <h3 className={cn('customer-info')}>Minh Quân (+84) 378371553</h3>
                  <h3 className={cn('customer-address')}>116, Cầu Xáng, Xã Tân Bình, Huyện Phụng Hiệp, Hậu Giang</h3>

                  <div className={cn('change-address-btn')}>
                     <Button onlytext>Thay đổi</Button>
                  </div>
               </div>
            </div>

            <div className={cn('order')}>
               <div className={cn('header-list')}>
                  <h4 className={cn('header-info')}>Sản phẩm</h4>

                  <h4 className={cn('header-price')}>Đơn giá</h4>

                  <h4 className={cn('header-amount')}>Số lượng</h4>

                  <h4 className={cn('header-total-price')}>Thành tiền</h4>
               </div>

               <div className={cn('products-list')}>
                  <div className={cn('product')}>
                     <div className={cn('product-info')}>
                        <img
                           src="https://thatlungnam.com.vn/wp-content/uploads/2018/06/vi-da-nam-handmade-001-4.jpg"
                           alt="Anh san pham"
                        />

                        <h4 className={cn('product-name')}>Kính Mát Gentle Monster Momati 01(OR) Màu Đen Cam</h4>
                     </div>

                     <h4 className={cn('product-unit-price')}>{currencyFormater.format(99999999)}</h4>

                     <h4 className={cn('product-amount')}>100</h4>

                     <h4 className={cn('product-total-price')}>{currencyFormater.format(99999999)}</h4>
                  </div>
               </div>

               <div className={cn('shipping-unit')}>
                  <h4>Nhanh</h4>

                  <div className={cn('shipping-unit-btn')}>
                     <Button onlytext thinfont>
                        Thay đổi
                     </Button>
                  </div>

                  <h4 className={cn('shipping-price')}>{currencyFormater.format(9999999)}</h4>
               </div>

               <div className={cn('order-total')}>
                  Tổng số tiền: <h3>{currencyFormater.format(99999999)}</h3>
               </div>
            </div>

            <div className={cn('payment-methods')}>
               <h4>Phương thức thanh toán</h4>

               <div className={cn('method')}>
                  <h4>Thanh toán khi nhận hàng (COD)</h4>

                  <div className={cn('payment-method-btn')}>
                     <Button onlytext>Thay đổi</Button>
                  </div>
               </div>
            </div>

            <div className={cn('total')}>
               <h4 className={cn('total-price-products')}>
                  Tổng tiền hàng:<span>{currencyFormater.format(99999999)}</span>
               </h4>

               <h4 className={cn('ship-price')}>
                  Phí vận chuyển:<span>{currencyFormater.format(99999999)}</span>
               </h4>

               <h4 className={cn('total-pay')}>
                  Tổng thanh toán:<span className={cn('total-pay-color')}>{currencyFormater.format(99999999)}</span>
               </h4>

               <div className={cn('submit-pay-btn')}>
                  <Button>Đặt hàng</Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default SubmitPay;
