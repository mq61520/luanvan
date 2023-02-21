import classNames from 'classnames/bind';

import styles from './Orders.module.scss';
import Button from '~/components/Button';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function Orders() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('actions-bar')}>
               <div className={cn('item')}>
                  <Button border>Tất cả</Button>
               </div>

               <div className={cn('item')}>
                  <Button border>Chờ xác nhận</Button>
               </div>

               <div className={cn('item')}>
                  <Button border>Chuẩn bị hàng</Button>
               </div>

               <div className={cn('item')}>
                  <Button border>Đang giao</Button>
               </div>

               <div className={cn('item')}>
                  <Button border>Đã giao</Button>
               </div>

               <div className={cn('item')}>
                  <Button border>Đã hủy</Button>
               </div>
            </div>

            <div className={cn('orders-list')}>
               <div className={cn('order')}>
                  <div className={cn('order-header')}>
                     <h3 className={cn('order-code')}>
                        <i>Mã đơn hàng:</i> JKIG-65435-HUYFGV
                     </h3>
                     <h3 className={cn('order-status')}>ĐANG GIAO</h3>
                  </div>

                  <div className={cn('products-list')}>
                     <div className={cn('product')}>
                        <div className={cn('flex')}>
                           <img
                              src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/01/kinh-mat-gentle-monster-momati-01-or-mau-den-cam-63b3fc57d174f-03012023165847.jpg"
                              alt="Ảnh sản phẩm"
                           />

                           <div className={cn('flex-info')}>
                              <h3 className={cn('product-name')}>Mắt kính Gentle Monster hàng limeted edition</h3>

                              <h3 className={cn('product-amount')}>x100</h3>
                           </div>
                        </div>

                        <div className={cn('price')}>
                           <h3 className={cn('old-price')}>{currencyFormater.format('99900000')}</h3>
                           <h3 className={cn('current-price')}>{currencyFormater.format('99900000')}</h3>
                        </div>
                     </div>
                  </div>

                  <h3 className={cn('order-total')}>
                     <i>Thành tiền:</i> {currencyFormater.format('99900000')}
                  </h3>
               </div>

               <div className={cn('order')}>
                  <div className={cn('order-header')}>
                     <h3 className={cn('order-code')}>JKIG-65435-HUYFGV</h3>
                     <h3 className={cn('order-status')}>ĐANG GIAO</h3>
                  </div>

                  <div className={cn('products-list')}>
                     <div className={cn('product')}>
                        <div className={cn('flex')}>
                           <img
                              src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/01/kinh-mat-gentle-monster-momati-01-or-mau-den-cam-63b3fc57d174f-03012023165847.jpg"
                              alt="Ảnh sản phẩm"
                           />

                           <div className={cn('flex-info')}>
                              <h3 className={cn('product-name')}>
                                 Mắt kính Gentle Monster hàng limeted edition iasdvk asdhviouahbwiosd sqa visabd
                                 wsidvbisv saivbsakb skvbsidbvk
                              </h3>

                              <h3 className={cn('product-amount')}>x100</h3>
                           </div>
                        </div>

                        <div className={cn('price')}>
                           <h3 className={cn('old-price')}>{currencyFormater.format('99900000')}</h3>
                           <h3 className={cn('current-price')}>{currencyFormater.format('99900000')}</h3>
                        </div>
                     </div>
                  </div>

                  <h3 className={cn('order-total')}>
                     <i>Thành tiền:</i> {currencyFormater.format('99900000')}
                  </h3>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Orders;
