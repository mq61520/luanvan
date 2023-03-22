import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactModal from 'react-modal';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons/index';
import { toast } from 'react-toastify';

import styles from './SubmitPay.module.scss';
import './SubmitPay.modal.scss';
import Button from '~/components/Button';
import currencyFormater from '~/common/formatCurrency';
import { CartContext } from '~/globalState/Context';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const cn = classNames.bind(styles);

function SubmitPay() {
   const current_user_id = localStorage.getItem('current_user');

   const [listPay, setListPay] = useContext(CartContext);

   const [openChangeAddress, setOpenChangeAddress] = useState(false);
   const [openChangeShip, setOpenChangeShip] = useState(false);
   const [orderStatus, setOrderStatus] = useState(true);

   const [listProducts, setListProducts] = useState([]);
   const [total, setTotal] = useState(0);
   const [ship, setShip] = useState({ ten: 'Nhanh', gia: 50000 });

   const [userInfo, setUserInfo] = useState('');
   const [phoneNum, setPhoneNum] = useState('');
   const [address, setAddress] = useState('');
   const [orderNote, setOrederNote] = useState('');
   const [payment, setPayment] = useState('COD');

   const handleOrder = async () => {
      try {
         const order_res = await axios.post('http://localhost:4000/order/add', {
            user_id: current_user_id,
            ngay_lap: new Date().toISOString().slice(0, 10),
            dia_chi: address,
            sdt: phoneNum,
            sl_sp: listProducts.length,
            tong_tien: total + ship.gia,
            htgh: ship.ten,
            httt: 'COD',
            ghi_chu: orderNote,
            ds_sp: listProducts,
         });

         if (listPay.listPay[0].location === 'NotCart') {
            const update_res = await axios.post('http://localhost:4000/product_update_amount', {
               ma_sp: listPay.listPay[0].ma_sp,
               sl: listPay.listPay[0].ton_kho,
            });

            if (update_res.data === 'UpdateAmountSuccess') {
               console.log('UpdateAmountSuccess');
            } else {
               console.log('UpdateAmountFail');
            }
         } else if (listPay.listPay.location === 'Cart') {
         }

         if (order_res.data === 'InsertSuccess') {
            setOrderStatus(false);
            setListPay({
               ...listPay,
               cartCount: listPay.cartCount === 0 ? 0 : listPay.cartCount - listPay.listPay.length,
            });
            toast.success('Đặt hàng thành công!', { position: 'top-center' });
         } else {
            toast.success('Đặt hàng không thành công!', { position: 'top-center' });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleGetProductInfo = async () => {
      try {
         var list = [];
         var tong = 0;
         for (let i = 0; i < listPay.listPay.length; i++) {
            const product_info_res = await axios.get('http://localhost:4000/product_id/' + listPay.listPay[i].ma_sp);
            console.log(product_info_res.data);

            tong = tong + listPay.listPay[i].gia;

            if (product_info_res.data.length > 0) {
               list.push({
                  sl: listPay.listPay[i].sl,
                  don_gia: listPay.listPay[i].don_gia,
                  info: product_info_res.data[0],
               });
            }
         }

         setListProducts(list);
         setTotal(tong);
      } catch (error) {
         console.log(error);
      }
   };

   const handelGetUserInfo = async () => {
      try {
         const user_info_res = await axios.get('http://localhost:4000/account_id/' + current_user_id);

         if (user_info_res.data.length > 0) {
            setUserInfo(user_info_res.data[0]);
            setAddress(user_info_res.data[0].nd_diachi);
            setPhoneNum(user_info_res.data[0].nd_sdt);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleUpdateInfo = async (e) => {
      e.preventDefault();

      const update_res = await axios.post('http://localhost:4000/profile/phone_address', {
         phone: phoneNum,
         address: address,
         user_id: current_user_id,
      });

      if (update_res.data === 'UpdateSuccess') {
         handelGetUserInfo();
         handleOpenChangeAddress();
         toast.success('Cập nhật thành công!', { position: 'top-center' });
      } else {
         toast.error('Cập nhật không thành công!', { position: 'top-center' });
      }
   };

   const handleUpdateProductAmount = async (ma_sp, sl_sp) => {
      const update_res = await axios.post('http://localhost:4000/product_update_amount', {
         ma_sp: ma_sp,
         sl: sl_sp,
      });

      if (update_res.data === 'UpdateAmountSuccess') {
         console.log('UpdateAmountSuccess');
      } else {
         console.log('UpdateAmountFail');
      }
   };

   const handleOpenChangeAddress = () => {
      setOpenChangeAddress(!openChangeAddress);
      setPhoneNum('');
      setAddress('');
   };

   const handleOpenChangeShip = () => {
      setOpenChangeShip(!openChangeShip);
   };

   useEffect(() => {
      handelGetUserInfo();
      handleGetProductInfo();
   }, []);

   console.log(payment);

   return (
      <div className={cn('wrapper')}>
         {orderStatus ? (
            <div className={cn('inner-contents')}>
               <div className={cn('delivery-address')}>
                  <div className={cn('letter')}></div>

                  <h3 className={cn('title')}>
                     <FontAwesomeIcon className={cn('icon')} icon={faLocationDot} />
                     Địa chỉ nhận hàng
                  </h3>

                  <div className={cn('address')}>
                     <h3 className={cn('customer-info')}>
                        {userInfo.nd_hoten} (+84) {userInfo.nd_sdt}
                     </h3>
                     <h3 className={cn('customer-address')}>{userInfo.nd_diachi}</h3>

                     <div className={cn('change-address-btn')}>
                        <Button onlytext onClick={handleOpenChangeAddress}>
                           Thay đổi
                        </Button>
                     </div>
                  </div>

                  <ReactModal
                     isOpen={openChangeAddress}
                     onRequestClose={handleOpenChangeAddress}
                     overlayClassName="change-address-overlay-modal"
                     className="change-address-modal-contents"
                  >
                     <form>
                        <div className={cn('change-address-modal-container')}>
                           <div className={cn('modal-header')}>
                              <h4>Thay dổi Địa chỉ giao hàng và Số điện thoại</h4>

                              <h4 onClick={handleOpenChangeAddress}>
                                 <FontAwesomeIcon icon={faXmark} />
                              </h4>
                           </div>

                           <div className={cn('modal-body')}>
                              <div className={cn('input-item')}>
                                 <h4>Số điện thoại</h4>
                                 <input
                                    type="number"
                                    value={phoneNum}
                                    required
                                    onChange={(e) => {
                                       setPhoneNum(e.target.value);
                                    }}
                                 />
                              </div>

                              <div className={cn('input-item')}>
                                 <h4>Địa chỉ giao hàng</h4>
                                 <textarea
                                    rows="5"
                                    value={address}
                                    required
                                    onChange={(e) => {
                                       setAddress(e.target.value);
                                    }}
                                 />
                              </div>
                           </div>

                           <div className={cn('modal-actions')}>
                              <div className={cn('submit-change-btn')}>
                                 <Button thinfont onClick={handleUpdateInfo}>
                                    Xác nhận
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </form>
                  </ReactModal>
               </div>

               <div className={cn('order')}>
                  <div className={cn('header-list')}>
                     <h4 className={cn('header-info')}>Sản phẩm</h4>

                     <h4 className={cn('header-price')}>Đơn giá</h4>

                     <h4 className={cn('header-amount')}>Số lượng</h4>

                     <h4 className={cn('header-total-price')}>Thành tiền</h4>
                  </div>

                  <div className={cn('products-list')}>
                     {listProducts.length > 0 ? (
                        listProducts.map((p) => {
                           return (
                              <div key={p.info.sp_ma} className={cn('product')}>
                                 <div className={cn('product-info')}>
                                    <img src={'http://localhost:4000/' + p.info.sp_image} alt="Anh san pham" />

                                    <h4 className={cn('product-name')}>{p.info.sp_ten}</h4>
                                 </div>

                                 <h4 className={cn('product-unit-price')}>{currencyFormater.format(p.don_gia)}</h4>

                                 <h4 className={cn('product-amount')}>{p.sl}</h4>

                                 <h4 className={cn('product-total-price')}>
                                    {currencyFormater.format(p.sl * p.don_gia)}
                                 </h4>
                              </div>
                           );
                        })
                     ) : (
                        <></>
                     )}
                  </div>

                  <div className={cn('shipping-unit')}>
                     <h4 style={{ flex: '1', color: '#333' }}>Hình thức vận chuyển</h4>

                     <h4>{ship.ten}</h4>

                     <div className={cn('shipping-unit-btn')}>
                        <Button onlytext thinfont onClick={handleOpenChangeShip}>
                           Thay đổi
                        </Button>
                     </div>

                     <ReactModal
                        isOpen={openChangeShip}
                        onRequestClose={handleOpenChangeShip}
                        overlayClassName="change-ship-overlay-modal"
                        className="change-ship-modal-contents"
                     >
                        <div className={cn('change-ship-modal-container')}>
                           <div className={cn('ship')}>
                              <span>Nhanh</span>
                              <h4>{currencyFormater.format(50000)}</h4>
                              <div className={cn('ship-btn')}>
                                 <Button
                                    thinfont
                                    onlytext
                                    onClick={() => {
                                       setShip({ ten: 'Nhanh', gia: 50000 });
                                       handleOpenChangeShip();
                                    }}
                                 >
                                    Chọn
                                 </Button>
                              </div>
                           </div>
                           <div className={cn('ship')}>
                              <span>Hỏa tốc</span>
                              <h4>{currencyFormater.format(70000)}</h4>
                              <div className={cn('ship-btn')}>
                                 <Button
                                    thinfont
                                    onlytext
                                    onClick={() => {
                                       setShip({ ten: 'Hỏa tốc', gia: 70000 });
                                       handleOpenChangeShip();
                                    }}
                                 >
                                    Chọn
                                 </Button>
                              </div>
                           </div>
                        </div>
                     </ReactModal>

                     <h4 className={cn('shipping-price')}>{currencyFormater.format(ship.gia)}</h4>
                  </div>

                  <div className={cn('order-total')}>
                     <div className={cn('order-total-note')}>
                        <h4>Ghi chú:</h4>
                        <textarea rows="2" value={orderNote} onChange={(e) => setOrederNote(e.target.value)}></textarea>
                     </div>

                     <div className={cn('order-total-price')}>
                        Tổng số tiền: {total > 0 ? <h3>{currencyFormater.format(total + ship.gia)}</h3> : <></>}
                     </div>
                  </div>
               </div>

               <div className={cn('payment-methods')}>
                  <h4>Phương thức thanh toán</h4>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                     <div className={cn('methods')}>
                        <div className={cn('method-item')} style={{ marginRight: '50px' }}>
                           <input
                              className={cn('choose-payment-radio')}
                              type="radio"
                              checked={payment === 'COD'}
                              value="COD"
                              onChange={(e) => setPayment(e.target.value)}
                           />
                           <span>Thanh toán khi nhận hàng (COD)</span>
                        </div>

                        <div className={cn('method-item')}>
                           <input
                              className={cn('choose-payment-radio')}
                              type="radio"
                              checked={payment === 'Paypal'}
                              value="Paypal"
                              onChange={(e) => setPayment(e.target.value)}
                           />
                           <span>Paypal</span>
                        </div>
                     </div>

                     {payment === 'Paypal' ? (
                        <div className={cn('paypal-area')}>
                           <PayPalScriptProvider>
                              <PayPalButtons></PayPalButtons>
                           </PayPalScriptProvider>
                        </div>
                     ) : (
                        <></>
                     )}
                  </div>
               </div>

               <div className={cn('total')}>
                  <h4 className={cn('total-price-products')}>
                     Tổng tiền hàng:<span>{currencyFormater.format(total)}</span>
                  </h4>

                  <h4 className={cn('ship-price')}>
                     Phí vận chuyển:<span>{currencyFormater.format(ship.gia)}</span>
                  </h4>

                  <h4 className={cn('total-pay')}>
                     Tổng thanh toán:
                     <span className={cn('total-pay-color')}>{currencyFormater.format(total + ship.gia)}</span>
                  </h4>

                  <div className={cn('submit-pay-btn')}>
                     <Button thinfont onClick={handleOrder}>
                        Đặt hàng
                     </Button>
                  </div>
               </div>
            </div>
         ) : (
            <>
               <div className={cn('no-product')} style={{ marginTop: '50px' }}>
                  <h1 className={cn('message')}>Bạn đã đặt hàng thành công. Đơn hàng của bạn sẽ sớm được xử lý.</h1>

                  <div className={cn('go-shop')} style={{ width: 'fit-content', marginTop: '20px' }}>
                     <Button
                        border
                        onClick={() => {
                           window.open('http://localhost:3000/products/all', '_self');
                        }}
                     >
                        Tiếp tục mua hàng
                     </Button>
                  </div>
               </div>
            </>
         )}
      </div>
   );
}

export default SubmitPay;
