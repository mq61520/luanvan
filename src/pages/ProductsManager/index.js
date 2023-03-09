import { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faPlus, faXmark, faEdit } from '@fortawesome/free-solid-svg-icons/index';
import ReactModal from 'react-modal';

import styles from './ProductsManager.module.scss';
import './Modal.scss';
import Button from '~/components/Button/index';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

ReactModal.setAppElement('#root');

function ProductsManager() {
   const [showModal, setShowModal] = useState(false);

   const [maSp, setMaSp] = useState('');
   const [tenSp, setTenSp] = useState('');
   const [slSp, setSlSp] = useState('');
   const [giaSp, setGiaSp] = useState('');
   const [motaSp, setMotaSp] = useState('');
   const [imgSp, setImgSp] = useState([]);

   const handleOpenModal = () => {
      setShowModal(!showModal);
      setImgSp([]);
      setMaSp('');
      setTenSp('');
      setSlSp('');
      setGiaSp('');
      setMotaSp('');
   };

   const handleAddProduct = async (e) => {
      e.preventDefault();

      try {
         const add_product_res = await axios.post('http://localhost:4000/product', {
            ma_sp: maSp,
            anh_sp: imgSp[0].name,
            ten: tenSp,
            sl: slSp,
            gia: giaSp,
            mota: motaSp,
         });

         var add_images_res;
         for (let i = 0; i < imgSp.length; i++) {
            const postData = new FormData();
            postData.append('product_images', imgSp[i]);
            postData.append('ma_sp', maSp);

            add_images_res = await axios({
               method: 'POST',
               url: 'http://localhost:4000/product_images',
               data: postData,
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            });
         }

         console.log('product response:' + add_product_res.data);
         console.log('image response:' + add_images_res.data);

         if (add_product_res.data === 'Success product' && add_images_res.data === 'Success img') {
            console.log('Them thanh cong');
         } else {
            console.log('Them khong thanh cong');
         }
      } catch (error) {
         console.log(error);
      }
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
                     <ReactModal
                        isOpen={showModal}
                        onRequestClose={handleOpenModal}
                        overlayClassName="overlay-modal"
                        className="modal-contents"
                     >
                        <form onSubmit={handleAddProduct} encType="multipart/form-data">
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
                                 <span>Mã sản phẩm</span>
                                 <input
                                    className={cn('input-txt')}
                                    value={maSp}
                                    onChange={(e) => setMaSp(e.target.value)}
                                 />
                              </div>

                              <div className={cn('input-label')}>
                                 <span>Tên sản phẩm</span>
                                 <input
                                    className={cn('input-txt')}
                                    value={tenSp}
                                    onChange={(e) => setTenSp(e.target.value)}
                                 />
                              </div>

                              <div className={cn('input-label')}>
                                 <span>Số lượng</span>
                                 <input
                                    className={cn('input-txt')}
                                    value={slSp}
                                    onChange={(e) => setSlSp(e.target.value)}
                                 />
                              </div>

                              <div className={cn('input-label')}>
                                 <span>Giá</span>
                                 <input
                                    className={cn('input-txt')}
                                    value={giaSp}
                                    onChange={(e) => setGiaSp(e.target.value)}
                                 />
                              </div>

                              <div className={cn('input-label')}>
                                 <span>Mô tả</span>
                                 {/* <input type="text-area" className={cn('input-txt')} /> */}
                                 <textarea
                                    className={cn('textarea-txt')}
                                    value={motaSp}
                                    onChange={(e) => setMotaSp(e.target.value)}
                                 ></textarea>
                              </div>

                              <div className={cn('input-label')}>
                                 <span>Ảnh đại diện sản phẩm</span>
                                 <input
                                    className={cn('input-img')}
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    multiple
                                    onChange={(e) => {
                                       setImgSp(e.target.files);
                                    }}
                                 />
                              </div>

                              {imgSp.length > 0 ? (
                                 <div className={cn('preview-img-list')}>
                                    {Array.from(imgSp).map((image) => {
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
                                 <Button borderfill thinfont>
                                    Thêm
                                 </Button>
                              </div>
                           </div>
                        </form>
                     </ReactModal>
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
