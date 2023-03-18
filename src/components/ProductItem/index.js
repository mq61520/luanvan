import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons/index';

import styles from './ProductItem.module.scss';

import currencyFormater from '~/common/formatCurrency';
import Button from '../Button/index';

const cn = classNames.bind(styles);

function ProductItem({ product, promotions, stt, UpdatePromotion, Deleted }) {
   const [promotionModal, setPromotionModal] = useState(false);

   const [currentPromotion, setCurrentPromotion] = useState([]);

   const handleOpenUpdatePromotionModal = () => {
      setPromotionModal(!promotionModal);
   };

   const handleGetCurrentPromotion = async (km_id) => {
      try {
         const promotion_response = await axios.get('http://localhost:4000/promotion_id/' + km_id);

         //  console.log(promotion_response.data);

         if (promotion_response.data.length > 0) {
            setCurrentPromotion(promotion_response.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleUpdatePromotion = async (ma_sp, km_id) => {
      try {
         const update_promotion_response = await axios.post('http://localhost:4000/product/update_promotion', {
            ma_sp: ma_sp,
            km_id: km_id,
         });

         if (update_promotion_response.data === 'UpdatePromotionSuccess') {
            toast.success('Áp dụng thành công!', {
               position: 'top-center',
            });

            handleGetCurrentPromotion(km_id);

            UpdatePromotion('Done');
         } else {
            toast.error('Áp dụng không thành công!', {
               position: 'top-center',
            });
         }
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <div key={product.sp_id} className={cn('table-row')}>
         <h4 className={cn('product-number')}>{stt}</h4>
         <h4 className={cn('product-code')}>{product.sp_ma}</h4>
         <h4 className={cn('product-name')}>{product.sp_ten}</h4>
         <h4 className={cn('product-price')}>{currencyFormater.format(product.sp_gia)}</h4>
         <h4 className={cn('product-instock')}>{product.sp_tonkho}</h4>
         <div>
            <div className={cn('product-promotion')}>
               <Button
                  onlytext
                  thinfont
                  onClick={() => {
                     handleGetCurrentPromotion(product.sp_khuyenmai);
                     handleOpenUpdatePromotionModal();
                  }}
               >
                  <FontAwesomeIcon icon={faEdit} />
               </Button>
            </div>

            <ReactModal
               isOpen={promotionModal}
               onRequestClose={handleOpenUpdatePromotionModal}
               overlayClassName="update-promotion-overlay-modal"
               className="update-promotion-modal-contents"
            >
               <div className={cn('update-promotion-modal-container')}>
                  <div className={cn('update-promotion-modal-header')}>
                     <h4>KHUYẾN MÃI</h4>

                     <h4 onClick={handleOpenUpdatePromotionModal}>
                        <FontAwesomeIcon icon={faXmark} />
                     </h4>
                  </div>

                  <div className={cn('update-promotion-modal-body')}>
                     <div>
                        <h4 className={cn('list-title')}>Khuyến mãi đang được áp dụng</h4>
                        <div className={cn('promotion-list')}>
                           {currentPromotion.length > 0 ? (
                              currentPromotion.map((promotion) => {
                                 return (
                                    <div className={cn('promotion')} key={promotion.km_id}>
                                       <h4 className={cn('promotion-value')}>{promotion.km_value}%</h4>
                                       <div className={cn('promotion-date')}>
                                          <h4 className={cn('promotion-date-start')}>
                                             <i style={{ fontWeight: '400' }}>Ngày bắt đầu:</i> {promotion.ngaybatdau}
                                          </h4>
                                          <h4 className={cn('promotion-date-end')}>
                                             <i style={{ fontWeight: '400' }}>Ngày kết thúc:</i> {promotion.ngayketthuc}
                                          </h4>
                                       </div>

                                       <div className={cn('promotion-action')}>
                                          <Button
                                             thinfont
                                             border
                                             onClick={() => handleUpdatePromotion(product.sp_ma, null)}
                                          >
                                             Gỡ
                                          </Button>
                                       </div>
                                    </div>
                                 );
                              })
                           ) : (
                              <div style={{ padding: '10px 0' }}>Không có khuyễn mãi</div>
                           )}
                        </div>
                     </div>

                     <div>
                        <h4 className={cn('list-title')}>Các khuyến mãi khác</h4>
                        <div className={cn('promotion-list')}>
                           {promotions.map((i) => {
                              return (
                                 <div className={cn('promotion')} key={i.km_id}>
                                    <h4 className={cn('promotion-value')}>{i.km_value}%</h4>
                                    <div className={cn('promotion-date')}>
                                       <h4 className={cn('promotion-date-start')}>
                                          <i style={{ fontWeight: '400' }}>Ngày bắt đầu:</i> {i.ngaybatdau}
                                       </h4>
                                       <h4 className={cn('promotion-date-end')}>
                                          <i style={{ fontWeight: '400' }}>Ngày kết thúc:</i> {i.ngayketthuc}
                                       </h4>
                                    </div>

                                    <div className={cn('promotion-action')}>
                                       <Button
                                          thinfont
                                          border
                                          onClick={() => {
                                             handleUpdatePromotion(product.sp_ma, i.km_id);
                                          }}
                                       >
                                          Áp dụng
                                       </Button>
                                    </div>
                                 </div>
                              );
                           })}
                        </div>
                     </div>
                  </div>
               </div>
            </ReactModal>
         </div>
         <h4 className={cn('product-del')}>
            <Button
               onlytext
               thinfont
               onClick={async () => {
                  try {
                     const delete_product = await axios.post('http://localhost:4000/product_del', {
                        ma_sp: product.sp_ma,
                     });

                     if (delete_product.data === 'Delete done') {
                        Deleted('DeleteDone');
                     } else {
                        Deleted('DeleteFail');
                     }
                  } catch (error) {
                     console.log(error);
                  }
               }}
            >
               Xóa
            </Button>
         </h4>
      </div>
   );
}

export default ProductItem;
