import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMinus, faPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import styles from './ProductDetails.module.scss';
import './Swiper.ProductDetail.scss';
import Button from '~/components/Button';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function ProductDetails() {
   document.title = 'Chi tiết....';

   const [inStock, setInStock] = useState(true);

   const handlePreview = (e) => {
      document.querySelector('#preview-img').src = e.target.src;
   };

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
                        className="mySwiper"
                     >
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://sovani.vn/wp-content/uploads/2020/03/vi-da-vachetta-handmade19.jpg"
                              alt=""
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://datam.vn/wp-content/uploads/2017/05/vi-da-nam-handmade.jpg"
                              alt=""
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="http://cdn.tgdd.vn/Files/2021/11/19/1399069/huong-dan-cach-lam-vi-da-doc-dao-ai-cung-lam-duoc-202111192053112545.jpg"
                              alt=""
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://cdn.shopify.com/s/files/1/0329/1912/6147/t/8/assets/lethnic-twlight-vi-da-sap-khac-ten-03.jpg?v=1619767652"
                              alt=""
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                        <SwiperSlide>
                           <img
                              className={cn('slide-img')}
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSNsGeOHWfDL0odKmxGPV1jSRDw335ydKgGA&usqp=CAU"
                              alt=""
                              onClick={handlePreview}
                           />
                        </SwiperSlide>
                     </Swiper>
                  </div>

                  <img
                     className={cn('preview-img')}
                     id="preview-img"
                     src="https://cf.shopee.vn/file/54d12bf3a6c20c9995f826ef8bb50f06"
                     alt="Hình ảnh sản phẩm"
                  />
               </div>

               <div className={cn('product-info')}>
                  <h2 className={cn('product-name')}>
                     Ví da handmade kim ví đựng thẻ sadhvb uisduvgbsjhdvb uhsdgvuh sdgjvgvj ugv
                  </h2>

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
                     <h2 className={cn('product-price')}>{currencyFormater.format(1254542)}</h2>

                     <div className={cn('discount-flag')}>
                        <span>giảm 90%</span>
                     </div>
                  </div>

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
                        <Button border thinfont lefticon={<FontAwesomeIcon icon={faCartShopping} />}>
                           Thêm vào giỏ hàng
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
               <h3>Mô tả sản phẩm</h3>

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
