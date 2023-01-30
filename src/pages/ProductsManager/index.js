import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faPlus, faXmark, faEdit } from '@fortawesome/free-solid-svg-icons/index';
import { useState } from 'react';
import ReactModal from 'react-modal';

import styles from './ProductsManager.module.scss';
import './Modal.scss';
import Button from '~/components/Button/index';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

ReactModal.setAppElement('#root');

function ProductsManager() {
   const [showModal, setShowModal] = useState(false);

   const [img, setImg] = useState('');

   const handleOpenModal = () => {
      setShowModal(!showModal);
   };

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Quản lý sản phẩm</h4>

            <div className={cn('product-crud')}>
               <div className={cn('crud-btn')}>
                  <div className={cn('add-btn')}>
                     <Button border onClick={handleOpenModal}>
                        <FontAwesomeIcon className={cn('add-btn-icon')} icon={faPlus} />
                     </Button>
                  </div>

                  <div className={cn('add-product-modal')}>
                     <form>
                        <ReactModal
                           isOpen={showModal}
                           onRequestClose={handleOpenModal}
                           overlayClassName="overlay-modal"
                           className="modal-contents"
                        >
                           <div className={cn('modal-header')}>
                              <h3>Thêm sản phẩm mới</h3>

                              <div className={cn('close-modal-btn')}>
                                 <Button onlytext onClick={handleOpenModal}>
                                    <FontAwesomeIcon icon={faXmark} />
                                 </Button>
                              </div>
                           </div>

                           <div className={cn('modal-body')}>
                              <div className={cn('input-label')}>
                                 <span>Tên sản phẩm</span>
                                 <input className={cn('input-txt')} />
                              </div>

                              <div className={cn('input-label')}>
                                 <span>Số lượng</span>
                                 <input className={cn('input-txt')} />
                              </div>

                              <div className={cn('input-label')}>
                                 <span>Giá</span>
                                 <input className={cn('input-txt')} />
                              </div>

                              <div className={cn('input-label')}>
                                 <span>Ảnh</span>
                                 <input
                                    className={cn('input-img')}
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    multiple
                                    onChange={(e) => {
                                       setImg(e.target.files);
                                    }}
                                 />
                              </div>

                              {img.length > 0 ? (
                                 <div className={cn('preview-img-list')}>
                                    {console.log()}

                                    {Array.from(img).map((image) => {
                                       return (
                                          <img key={image.name} src={URL.createObjectURL(image)} alt={image.name} />
                                       );
                                    })}
                                 </div>
                              ) : (
                                 <></>
                              )}
                           </div>

                           <div className={cn('modal-actions')}>
                              <div className={cn('add-product-btn')}>
                                 <Button borderfill>Thêm</Button>
                              </div>
                           </div>
                        </ReactModal>
                     </form>
                  </div>
               </div>

               {/* <div className={cn('add-product-area')}></div> */}
            </div>

            <div className={cn('product-table')}>
               <div className={cn('table-header')}>
                  <h4 className={cn('product-number')}>STT</h4>
                  <h4 className={cn('product-code')}>Mã SP</h4>
                  <h4 className={cn('product-name')}>Tên SP</h4>
                  <h4 className={cn('product-price')}>Giá</h4>
                  <h4 className={cn('product-instock')}>Tồn kho</h4>
                  <h4 className={cn('product-edit')}>Chỉnh sửa</h4>
                  <h4 className={cn('product-del')}>Xóa</h4>
               </div>

               <div className={cn('table-body')}>
                  <div className={cn('table-row')}>
                     <h4 className={cn('product-number')}>1</h4>
                     <h4 className={cn('product-code')}>SP_01</h4>
                     <h4 className={cn('product-name')}>Ví da handmade kim ví đựng thẻ </h4>
                     <h4 className={cn('product-price')}>{currencyFormater.format(1399000)}</h4>
                     <h4 className={cn('product-instock')}>99 cái</h4>
                     <h4 className={cn('product-edit')}>
                        <Button onlytext thinfont>
                           <FontAwesomeIcon icon={faEdit} />
                        </Button>
                     </h4>
                     <h4 className={cn('product-del')}>
                        <Button onlytext thinfont>
                           Xóa
                        </Button>
                     </h4>
                  </div>

                  <div className={cn('table-row')}>
                     <h4 className={cn('product-number')}>12</h4>
                     <h4 className={cn('product-code')}>SP_01</h4>
                     <h4 className={cn('product-name')}>Ví da handmade kim ví đựng thẻ</h4>
                     <h4 className={cn('product-price')}>{currencyFormater.format(1399000)}</h4>
                     <h4 className={cn('product-instock')}>99 cái</h4>
                     <h4 className={cn('product-edit')}>
                        <Button onlytext thinfont>
                           <FontAwesomeIcon icon={faEdit} />
                        </Button>
                     </h4>
                     <h4 className={cn('product-del')}>
                        <Button onlytext thinfont>
                           Xóa
                        </Button>
                     </h4>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductsManager;
