import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinus, faPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import styles from './ProductDetails.module.scss';
import './ProductDetailModal.scss';
import './Swiper.ProductDetail.scss';
import Button from '~/components/Button';
import currencyFormater from '~/common/formatCurrency';
import Product from '~/components/Product/index';
import CartContext from '~/globalState/Context';

const cn = classNames.bind(styles);

function ProductDetails() {
   const [cartAmount, setCartAmount] = useContext(CartContext);

   var ma_sp = window.location.pathname.slice(8).toString();

   const [amount, setAmount] = useState(1);
   const [moreDetail, setMoreDetail] = useState(false);
   const [showModal, setShowModal] = useState(false);

   const [productInfo, setProductInfo] = useState('');
   const [productImgaes, setProductImages] = useState([]);
   const handleGetProductInfo = async () => {
      const product_info = await axios.get('http://localhost:4000/product_id/' + ma_sp);

      const product_imgaes = await axios.get('http://localhost:4000/product_images/' + ma_sp);

      if (product_info.data && product_imgaes.data) {
         setProductInfo(product_info.data[0]);
         setProductImages(product_imgaes.data);

         console.log('get product oke');
         // console.log(product_info.data[0]);
      } else {
         console.log('get product fail');
      }
   };

   const handleAddCart = async () => {
      try {
         const add_cart_response = await axios.post('http://localhost:4000/cart', {
            user_id: localStorage.getItem('current_user'),
            ma_sp: productInfo.sp_ma,
            sl_sp: amount,
         });

         if (add_cart_response.data === 'Add success') {
            console.log('Them thanh cong');
            setCartAmount(cartAmount + 1);
            toast.success('Th??m v??o gi??? h??ng th??nh c??ng', { position: 'top-center' });
         } else {
            console.log('Them khong thanh cong');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handlePreview = (e) => {
      document.querySelector('#preview-img').src = e.target.src;
   };

   const handleMoreDetail = () => {
      if (moreDetail) {
         window.scrollTo(0, 650);
      }
      setMoreDetail(!moreDetail);
   };

   const handleShowModal = () => {
      setShowModal(!showModal);
   };

   useEffect(() => {
      window.scrollTo(0, 0);
      handleGetProductInfo();
   }, []);

   document.title = productInfo.sp_ten;

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('product-details')}>
               <div className={cn('product-image')}>
                  <div className={cn('img-slide')}>
                     <Swiper
                        direction={'vertical'}
                        slidesPerView={4}
                        spaceBetween={7}
                        loop={true}
                        pagination={{
                           clickable: true,
                           enabled: false,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="product-detail-swiper"
                     >
                        {productImgaes.length > 0 ? (
                           productImgaes.map((image) => {
                              return (
                                 <SwiperSlide key={image.ha_id}>
                                    <img
                                       className={cn('slide-img')}
                                       src={'http://localhost:4000/' + image.ha_ten}
                                       alt="H??nh ???nh s???n ph???m"
                                       onClick={handlePreview}
                                    />
                                 </SwiperSlide>
                              );
                           })
                        ) : (
                           <></>
                        )}
                     </Swiper>
                  </div>

                  <img
                     className={cn('preview-img')}
                     id="preview-img"
                     src={productInfo.sp_image ? 'http://localhost:4000/' + productInfo.sp_image : ''}
                     alt="H??nh ???nh s???n ph???m"
                     onClick={handleShowModal}
                  />

                  {/* <div className={cn('zoom-images')}>
                     <ReactModal
                        isOpen={showModal}
                        onRequestClose={handleShowModal}
                        overlayClassName="overlay-modal"
                        className="modal-contents"
                     >
                        <div className={cn('detail-images')}>
                           <img
                              className={cn('main-image')}
                              id="main-image"
                              src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                              alt="???nh s???n ph???m"
                           />

                           <div className={cn('slide-detail-images')}>
                              <Swiper
                                 slidesPerView={4}
                                 spaceBetween={7}
                                 loop={true}
                                 pagination={{
                                    clickable: true,
                                    enabled: false,
                                 }}
                                 navigation={true}
                                 modules={[Pagination, Navigation]}
                                 className="preview-detail-swiper"
                              >
                                 <SwiperSlide>
                                    <img
                                       className={cn('preview-slide-image')}
                                       src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                       alt="???nh s???n ph???m"
                                    />
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <img
                                       className={cn('preview-slide-image')}
                                       src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                       alt="???nh s???n ph???m"
                                    />
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <img
                                       className={cn('preview-slide-image')}
                                       src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                       alt="???nh s???n ph???m"
                                    />
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <img
                                       className={cn('preview-slide-image')}
                                       src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                       alt="???nh s???n ph???m"
                                    />
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <img
                                       className={cn('preview-slide-image')}
                                       src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                       alt="???nh s???n ph???m"
                                    />
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <img
                                       className={cn('preview-slide-image')}
                                       src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                       alt="???nh s???n ph???m"
                                    />
                                 </SwiperSlide>
                                 <SwiperSlide>
                                    <img
                                       className={cn('preview-slide-image')}
                                       src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                       alt="???nh s???n ph???m"
                                    />
                                 </SwiperSlide>
                              </Swiper>
                           </div>
                        </div>
                     </ReactModal>
                  </div> */}
               </div>

               <div className={cn('product-info')}>
                  <h2 className={cn('product-name')}>{productInfo.sp_ten}</h2>

                  <div className={cn('product-vote')}>
                     <span className={cn('vote-rate')}>4.9</span>
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                     <FontAwesomeIcon className={cn('vote-icon')} icon={faStar} />
                  </div>

                  <div className={cn('flex-product-price')}>
                     <h2 className={cn('product-discount')}>{currencyFormater.format(1254542)}</h2>
                     <h2 className={cn('product-price')}>{currencyFormater.format(productInfo.sp_gia)}</h2>

                     {/* {
                        <div className={cn('discount-flag')}>
                           <span>gi???m 90%</span>
                        </div>
                     } */}
                  </div>

                  <div className={cn('flex-amount')}>
                     <div className={cn('product-amount')}>
                        <FontAwesomeIcon
                           className={cn('increase-product')}
                           icon={faMinus}
                           onClick={() => {
                              if (amount === 1) {
                                 return;
                              } else {
                                 setAmount(amount - 1);
                              }
                           }}
                        />
                        <h2 className={cn('amount')}>{amount}</h2>
                        <FontAwesomeIcon
                           className={cn('minus-product')}
                           icon={faPlus}
                           onClick={() => {
                              if (amount === productInfo.sp_tonkho) {
                                 toast.warn('V?????t qu?? s??? l????ng t???n kho!', { position: 'top-center' });
                                 return;
                              } else {
                                 setAmount(amount + 1);
                              }
                           }}
                        />
                     </div>

                     <div className={cn('product-instock')}>
                        <span>T???n kho: </span>
                        {productInfo.sp_trangthai > 0 ? (
                           <span className={cn('stocking')}>{productInfo.sp_tonkho}</span>
                        ) : (
                           <></>
                        )}
                     </div>
                  </div>

                  <div className={cn('btns')}>
                     <div className={cn('add-to-cart-btn')}>
                        <Button
                           border
                           thinfont
                           lefticon={<FontAwesomeIcon icon={faCartShopping} />}
                           onClick={handleAddCart}
                        >
                           Th??m v??o gi??? h??ng
                        </Button>
                     </div>

                     <div className={cn('buy-now-btn')}>
                        <Button borderfill thinfont>
                           Mua ngay
                        </Button>
                     </div>
                  </div>
               </div>
            </div>

            <div className={cn('product-descriptions')}>
               <h3>M?? t??? s???n ph???m</h3>

               <div className={cn('descriptions')}>
                  <p>{productInfo.sp_mota}</p>
               </div>

               <div className={cn('img-list')}>
                  {/* <img className={cn('slide-img')} src={'http://localhost:4000/' + productInfo.sp_image} alt="" /> */}

                  {moreDetail ? (
                     productImgaes.length > 0 ? (
                        productImgaes.map((images) => {
                           return (
                              <img
                                 key={images.ha_id}
                                 className={cn('slide-img')}
                                 src={'http://localhost:4000/' + images.ha_ten}
                                 alt="???nh m?? t???"
                              />
                           );
                        })
                     ) : (
                        <></>
                     )
                  ) : (
                     <></>
                  )}
               </div>
            </div>

            <div className={cn('more-detail-btn')}>
               <div className={cn('btn')}>
                  <Button onlytext onClick={handleMoreDetail}>
                     {moreDetail ? 'Thu g???n' : 'Xem th??m'}
                  </Button>
               </div>
            </div>

            <div className={cn('recommend-products')}>
               <h1 className={cn('title-list')}>C?? th??? b???n c??ng th??ch</h1>

               <div className={cn('recommend-list')}>
                  <Swiper
                     slidesPerView={4}
                     spaceBetween={15}
                     loop={true}
                     pagination={{
                        clickable: true,
                        enabled: false,
                     }}
                     navigation={true}
                     modules={[Pagination, Navigation]}
                     className="hot-product-list-swiper"
                  >
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                     <SwiperSlide>
                        <Product />
                     </SwiperSlide>
                  </Swiper>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;
