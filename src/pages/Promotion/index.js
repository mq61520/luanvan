import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faList, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons/index';
import { toast } from 'react-toastify';

import styles from './Promotion.module.scss';
import './Promotion.Modal.scss';
import Button from '~/components/Button/index';

const cn = classNames.bind(styles);

function Promotion() {
   document.title = 'Khuyễn mãi';

   const [promotionList, setPromotionList] = useState([]);
   const handleGetPromotionList = async () => {
      const promotion_list_response = await axios.get('http://localhost:4000/promotions');

      if (promotion_list_response.data.length > 0) {
         setPromotionList(promotion_list_response.data);
      }
   };

   const [kmValue, setKmValue] = useState('');
   const [dateStart, setDateStart] = useState('');
   const [dateEnd, setDateEnd] = useState('');
   const handleAddPromotion = async () => {
      const add_promotion_response = await axios.post('http://localhost:4000/promotion_add', {
         value: kmValue,
         date_start: dateStart,
         date_end: dateEnd,
      });

      if (add_promotion_response.data === 'InsertSuccess') {
         toast.success('Thêm khuyễn mãi thành công.', { position: 'top-center' });
      } else if (add_promotion_response.data === 'AddFail') {
         toast.error('Thêm khuyễn mãi không thành công.', { position: 'top-center' });
      }
   };

   useEffect(() => {
      handleGetPromotionList();
   }, []);

   const [openListProduct, setOpenListProduct] = useState(false);
   const [openAddPromotion, setOpenAddPromotion] = useState(false);
   const handleOpenListProduct = () => {
      return setOpenListProduct(!openListProduct);
   };
   const handleOpenAddPromotion = () => {
      setKmValue('');
      setDateStart('');
      setDateEnd('');
      return setOpenAddPromotion(!openAddPromotion);
   };

   var stt = 0;

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Khuyễn mãi</h4>

            <div className={cn('actions')}>
               <div className={cn('btn-item')}>
                  <Button border thinfont onClick={handleOpenAddPromotion}>
                     Tạo khuyễn mãi
                  </Button>
               </div>

               <ReactModal
                  isOpen={openAddPromotion}
                  onRequestClose={handleOpenAddPromotion}
                  overlayClassName="add-promotion-overlay-modal"
                  className="add-promotion-modal-contents"
               >
                  <div className={cn('promotion-modal-container')}>
                     <div className={cn('promotion-modal-header')}>
                        {/* <div className={cn('close-promotion-modal-btn')}>
                           <Button onlytext onClick={handleOpenAddPromotion}>
                              <FontAwesomeIcon icon={faXmark} />
                           </Button>
                        </div> */}

                        <h4 className={cn('title-form')}>Thêm khuyễn mãi</h4>
                     </div>

                     <div className={cn('promotion-modal-body')}>
                        <form>
                           <div className={cn('add-promotion-form')}>
                              <div className={cn('add-promotion-form-item')}>
                                 <span>Giá trị khuyến mãi</span>
                                 <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                       className={cn('input-item')}
                                       type="number"
                                       required
                                       value={kmValue}
                                       onChange={(e) => {
                                          setKmValue(e.target.value);
                                       }}
                                    />
                                    <h4>%</h4>
                                 </div>
                              </div>

                              <div className={cn('add-promotion-form-item')}>
                                 <span>Ngày bắt đầu</span>
                                 <input
                                    className={cn('date-item')}
                                    type="date"
                                    required
                                    value={dateStart}
                                    onChange={(e) => {
                                       setDateStart(e.target.value);
                                    }}
                                 />
                              </div>

                              <div className={cn('add-promotion-form-item')}>
                                 <span>Ngày kết thúc</span>
                                 <input
                                    className={cn('date-item')}
                                    type="date"
                                    required
                                    value={dateEnd}
                                    onChange={(e) => {
                                       setDateEnd(e.target.value);
                                    }}
                                 />
                              </div>
                           </div>

                           <div className={cn('form-actions')}>
                              <div className={cn('cancel-add-promotion-btn')}>
                                 <Button thinfont onClick={handleOpenAddPromotion}>
                                    Hủy
                                 </Button>
                              </div>

                              <div className={cn('add-promotion-btn')}>
                                 <Button thinfont onClick={handleAddPromotion}>
                                    Thêm
                                 </Button>
                              </div>
                           </div>
                        </form>
                     </div>
                  </div>
               </ReactModal>
            </div>

            <div className={cn('promotion-list')}>
               <div className={cn('header-list')}>
                  <h4 className={cn('number')}>STT</h4>
                  <h4 className={cn('value')}>Giá trị</h4>
                  <h4 className={cn('date-start')}>Ngày bắt đầu</h4>
                  <h4 className={cn('date-end')}>Ngày kết thúc</h4>
                  <h4 className={cn('aplly-for')}>Áp dụng cho</h4>
                  <h4 className={cn('operation')}>Thao tác</h4>
               </div>

               <div className={cn('list')}>
                  {promotionList.length > 0 ? (
                     promotionList.map((promotion) => {
                        stt++;
                        return (
                           <div className={cn('promotion')} key={promotion.km_id}>
                              <h4 className={cn('promotion-number')}>{stt}</h4>

                              <h4 className={cn('promotion-value')}>{promotion.km_value}%</h4>

                              <h4 className={cn('promotion-date-start')}>{promotion.ngaybatdau.substring(0, 10)}</h4>

                              <h4 className={cn('promotion-date-end')}>{promotion.ngayketthuc.substring(0, 10)}</h4>

                              <div className={cn('promotion-list-product')}>
                                 <div className={cn('promotion-operation-btn')}>
                                    <Button onlytext onClick={handleOpenListProduct}>
                                       <FontAwesomeIcon icon={faList} />
                                    </Button>
                                 </div>

                                 <ReactModal
                                    isOpen={openListProduct}
                                    onRequestClose={handleOpenListProduct}
                                    overlayClassName="list-product-overlay-modal"
                                    className="list-product-modal-contents"
                                 >
                                    <div className={cn('modal-container')}>
                                       <div className={cn('modal-header')}>
                                          <div className={cn('close-modal-btn')}>
                                             <Button onlytext onClick={handleOpenListProduct}>
                                                <FontAwesomeIcon icon={faXmark} />
                                             </Button>
                                          </div>
                                       </div>

                                       <div className={cn('modal-body')}>
                                          <h4 className={cn('title-list')}>
                                             Danh sách sản phẩm được áp dụng khuyễn mãi
                                          </h4>

                                          <div className={cn('products-list')}>
                                             <div className={cn('product')}>
                                                <img
                                                   className={cn('product-img')}
                                                   src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                                   alt="Ảnh sản phẩm"
                                                />

                                                <div className={cn('product-info')}>
                                                   <h4 className={cn('product-code')}>
                                                      Mã sản phẩm: <b>SP03</b>
                                                   </h4>
                                                   <h4 className={cn('product-name')}>
                                                      Kính mắt nam Gentle Monster màu xanh kshjdchis sdiihbvidhfsbv
                                                      sduihbviush sdiubvisfdh sdfuibviuyfsdb
                                                   </h4>
                                                </div>

                                                <div className={cn('product-operation')}>
                                                   <div className={cn('product-operation-btn')}>
                                                      <Button thinfont onlytext>
                                                         Hủy áp dụng
                                                      </Button>
                                                   </div>
                                                </div>
                                             </div>
                                             <div className={cn('product')}>
                                                <img
                                                   className={cn('product-img')}
                                                   src="https://cdn.vuahanghieu.com/unsafe/0x500/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2023/02/kinh-mat-coach-fashion-men-s-matte-black-sunglasses-hc7121-93806g-58-mau-den-63e35fe29a59e-08022023154002.jpg"
                                                   alt="Ảnh sản phẩm"
                                                />

                                                <div className={cn('product-info')}>
                                                   <h4 className={cn('product-code')}>
                                                      Mã sản phẩm: <b>SP03</b>
                                                   </h4>
                                                   <h4 className={cn('product-name')}>
                                                      Kính mắt nam Gentle Monster màu xanh kshjdchis sdiihbvidhfsbv
                                                      sduihbviush sdiubvisfdh sdfuibviuyfsdb
                                                   </h4>
                                                </div>

                                                <div className={cn('product-operation')}>
                                                   <div className={cn('product-operation-btn')}>
                                                      <Button thinfont onlytext>
                                                         Hủy áp dụng
                                                      </Button>
                                                   </div>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </ReactModal>
                              </div>

                              <div className={cn('promotion-operation')}>
                                 <div className={cn('promotion-operation-btn')}>
                                    <Button onlytext>
                                       <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                 </div>
                              </div>
                           </div>
                        );
                     })
                  ) : (
                     <div style={{ marginTop: '50px', textAlign: 'center' }}>
                        <h1>Không có khuyến mãi nào!</h1>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default Promotion;
