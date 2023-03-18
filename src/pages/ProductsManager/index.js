import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faPlus, faXmark, faEdit } from '@fortawesome/free-solid-svg-icons/index';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import styles from './ProductsManager.module.scss';
import './ProductsManagerModal.scss';
import Button from '~/components/Button/index';
import currencyFormater from '~/common/formatCurrency';
import ProductItem from '~/components/ProductItem/index';

const cn = classNames.bind(styles);

ReactModal.setAppElement('#root');

function ProductsManager() {
   document.title = 'Quản lý hàng hóa';

   const [showModal, setShowModal] = useState(false);
   const [promotionModal, setPromotionModal] = useState(false);

   const [products, setProducts] = useState([]);
   const [listBrand, setListBrand] = useState([]);
   const [promotions, setPromotions] = useState([]);
   const [currentPromotion, setCurrentPromotion] = useState([]);

   const [maSp, setMaSp] = useState('');
   const [tenSp, setTenSp] = useState('');
   const [slSp, setSlSp] = useState('');
   const [giaSp, setGiaSp] = useState('');
   const [motaSp, setMotaSp] = useState('');
   const [imgSp, setImgSp] = useState([]);
   const [dmSp, setDmSp] = useState('');
   const [thSp, setThSp] = useState('');

   const handleOpenModal = () => {
      setShowModal(!showModal);
      setImgSp([]);
      setMaSp('');
      setTenSp('');
      setSlSp('');
      setGiaSp('');
      setMotaSp('');
      setDmSp('');
      setThSp('');
   };

   const handleAddProduct = async (e) => {
      e.preventDefault();

      try {
         const check_ma_sp_response = await axios.get('http://localhost:4000/product_check/' + maSp);

         if (check_ma_sp_response.data[0].exist === 0) {
            const add_product_res = await axios.post('http://localhost:4000/product', {
               ma_sp: maSp,
               anh_sp: imgSp[0].name,
               ten: tenSp,
               sl: slSp,
               gia: giaSp,
               mota: motaSp,
               danhmuc: dmSp,
               thuonghieu: thSp,
            });

            // console.log(imgSp);

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

            // console.log('product response:' + add_product_res.data);
            // console.log('image response:' + add_images_res.data);

            if (add_product_res.data === 'Success product' && add_images_res.data === 'Success img') {
               console.log('Them thanh cong');
               toast.success('Thêm thành công!', { position: 'top-center' });

               setImgSp([]);
               setMaSp('');
               setTenSp('');
               setSlSp('');
               setGiaSp('');
               setMotaSp('');
               setDmSp('');
               setThSp('');
            } else {
               console.log('Them khong thanh cong');
               toast.error('Thêm không thành công!', { position: 'top-center' });
            }
         } else if (check_ma_sp_response.data[0].exist === 1) {
            toast.error('Mã sản phẩm đã tồn tại', { position: 'top-center' });
            return;
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleGetProductList = async () => {
      try {
         const product_list = await axios.get('http://localhost:4000/products');

         if (product_list.data.length > 0) {
            setProducts(product_list.data);
         } else {
            console.log('Get sản phẩm thất bại!');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleGetBrand = async () => {
      try {
         const brand_response = await axios.get('http://localhost:4000/brands');

         if (brand_response.data.length > 0) {
            setListBrand(brand_response.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleGetPromotions = async () => {
      try {
         const promotion_response = await axios.get('http://localhost:4000/promotions');

         if (promotion_response.data.length > 0) {
            setPromotions(promotion_response.data);
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
         } else {
            toast.error('Áp dụng không thành công!', {
               position: 'top-center',
            });
         }
      } catch (err) {
         console.log(err);
      }
   };

   const handleOpenUpdatePromotionModal = () => {
      setPromotionModal(!promotionModal);
   };

   useEffect(() => {
      handleGetProductList();
      handleGetBrand();
      handleGetPromotions();
   }, []);

   var stt = 0;

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Quản lý sản phẩm</h4>

            <div className={cn('product-crud')}>
               <div className={cn('crud-btn')}>
                  <div className={cn('add-btn')}>
                     <Button border onClick={handleOpenModal}>
                        <FontAwesomeIcon className={cn('add-btn-icon')} icon={faPlus} />
                        <span>Thêm Sản Phẩm</span>
                     </Button>
                  </div>

                  <div className={cn('add-product-modal')}>
                     <ReactModal
                        isOpen={showModal}
                        onRequestClose={handleOpenModal}
                        overlayClassName="add-product-overlay-modal"
                        className="add-product-modal-contents"
                     >
                        <div className={cn('modal-container')}>
                           <section>
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
                                    <div className={cn('left-side')}>
                                       <div className={cn('input-label')}>
                                          <span>Mã sản phẩm</span>
                                          <input
                                             className={cn('input-txt')}
                                             value={maSp.toUpperCase()}
                                             onChange={(e) => {
                                                setMaSp(e.target.value);
                                             }}
                                             required
                                          />
                                       </div>

                                       <div className={cn('input-label')}>
                                          <span>Tên sản phẩm</span>
                                          <input
                                             className={cn('input-txt')}
                                             value={tenSp}
                                             onChange={(e) => setTenSp(e.target.value)}
                                             required
                                          />
                                       </div>

                                       <div className={cn('input-label')}>
                                          <span>Số lượng</span>
                                          <input
                                             className={cn('input-txt')}
                                             value={slSp}
                                             onChange={(e) => setSlSp(e.target.value)}
                                             required
                                             type="number"
                                          />
                                       </div>

                                       <div className={cn('input-label')}>
                                          <span>Giá</span>
                                          <input
                                             className={cn('input-txt')}
                                             value={giaSp}
                                             onChange={(e) => setGiaSp(e.target.value)}
                                             required
                                             type="number"
                                          />
                                       </div>

                                       <div className={cn('input-label')}>
                                          <span>Danh mục</span>
                                          <select
                                             className={cn('input-select')}
                                             onChange={(e) => {
                                                setDmSp(e.target.value);
                                             }}
                                             value={dmSp}
                                             required
                                          >
                                             <option value="">-- Chọn danh mục --</option>
                                             <option value="Kính nam">Kính nam</option>
                                             <option value="Kính nữ">Kính nữ</option>
                                             <option value="Kính unisex">Kính unisex</option>
                                             <option value="Kính trẻ em">Kính trẻ em</option>
                                          </select>
                                       </div>

                                       <div className={cn('input-label')}>
                                          <span>Thương hiệu</span>
                                          {listBrand.length ? (
                                             <select
                                                className={cn('input-select')}
                                                onChange={(e) => {
                                                   setThSp(e.target.value);
                                                }}
                                                value={thSp}
                                                required
                                             >
                                                <option value="">-- Chọn thương hiệu --</option>
                                                {listBrand.map((brand) => {
                                                   return (
                                                      <option key={brand.th_id} value={brand.th_ten}>
                                                         {brand.th_ten}
                                                      </option>
                                                   );
                                                })}
                                             </select>
                                          ) : (
                                             <></>
                                          )}
                                       </div>
                                    </div>

                                    <div className={cn('right-side')}>
                                       <div className={cn('input-label')}>
                                          <span>Mô tả sản phẩm</span>
                                          <textarea
                                             className={cn('textarea-txt')}
                                             value={motaSp}
                                             onChange={(e) => setMotaSp(e.target.value)}
                                             required
                                          ></textarea>
                                       </div>

                                       <div className={cn('input-label')}>
                                          <span>Ảnh sản phẩm</span>
                                          <input
                                             className={cn('input-img')}
                                             type="file"
                                             accept=".jpg, .jpeg, .png"
                                             multiple
                                             onChange={(e) => {
                                                setImgSp(e.target.files);
                                             }}
                                             required
                                          />
                                       </div>

                                       {imgSp.length > 0 ? (
                                          <div className={cn('preview-img-list')}>
                                             {Array.from(imgSp).map((image) => {
                                                return (
                                                   <img
                                                      key={image.name}
                                                      src={URL.createObjectURL(image)}
                                                      alt={image.name}
                                                   />
                                                );
                                             })}
                                          </div>
                                       ) : (
                                          <></>
                                       )}
                                    </div>
                                 </div>

                                 <div className={cn('modal-actions')}>
                                    <div className={cn('add-product-btn')}>
                                       <Button borderfill thinfont>
                                          Thêm
                                       </Button>
                                    </div>
                                 </div>
                              </form>
                           </section>
                        </div>
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
                  <h4 className={cn('product-promotion')}>Khuyễn mãi</h4>
                  <h4 className={cn('product-del')}>Xóa</h4>
               </div>

               <div className={cn('table-body')}>
                  {products.length > 0 ? (
                     products.map((product) => {
                        stt++;
                        return (
                           <ProductItem
                              key={product.sp_id}
                              product={product}
                              promotions={promotions}
                              stt={stt}
                              Deleted={(e) => {
                                 if (e === 'DeleteDone') {
                                    handleGetProductList();
                                    toast.success('Xóa thành công!', {
                                       position: 'top-center',
                                    });
                                 } else if (e === 'DeleteFail') {
                                    return;
                                 }
                              }}
                              UpdatePromotion={(e) => {
                                 if (e === 'Done') {
                                    handleGetProductList();
                                 } else {
                                    return;
                                 }
                              }}
                           />
                        );

                        /* <div key={product.sp_id} className={cn('table-row')}>
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
                                       onClick={async () => {
                                          handleOpenUpdatePromotionModal();
                                          try {
                                             const promotion_response = await axios.get(
                                                'http://localhost:4000/promotion_id/' + product.sp_khuyenmai,
                                             );

                                             if (promotion_response.data.length > 0) {
                                                setCurrentPromotion(promotion_response.data);
                                             }
                                          } catch (error) {
                                             console.log(error);
                                          }
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
                                                {currentPromotion.map((promotion) => {
                                                   return (
                                                      <div className={cn('promotion')} key={promotion.km_id}>
                                                         <h4 className={cn('promotion-value')}>
                                                            {promotion.km_value}%
                                                         </h4>
                                                         <div className={cn('promotion-date')}>
                                                            <h4 className={cn('promotion-date-start')}>
                                                               <i style={{ fontWeight: '400' }}>Ngày bắt đầu:</i>{' '}
                                                               {promotion.ngaybatdau}
                                                            </h4>
                                                            <h4 className={cn('promotion-date-end')}>
                                                               <i style={{ fontWeight: '400' }}>Ngày kết thúc:</i>{' '}
                                                               {promotion.ngayketthuc}
                                                            </h4>
                                                         </div>

                                                         <div className={cn('promotion-action')}>
                                                            <Button thinfont border>
                                                               Hủy
                                                            </Button>
                                                         </div>
                                                      </div>
                                                   );
                                                })}
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
                                                               <i style={{ fontWeight: '400' }}>Ngày bắt đầu:</i>{' '}
                                                               {i.ngaybatdau}
                                                            </h4>
                                                            <h4 className={cn('promotion-date-end')}>
                                                               <i style={{ fontWeight: '400' }}>Ngày kết thúc:</i>{' '}
                                                               {i.ngayketthuc}
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
                                             console.log('Delete done');
                                          } else {
                                             console.log('Delete fail');
                                          }
                                       } catch (error) {
                                          console.log(error);
                                       }
                                    }}
                                 >
                                    Xóa
                                 </Button>
                              </h4>
                           </div> */
                     })
                  ) : (
                     <h1 className={cn('no-product')}>Không có sản phẩm</h1>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductsManager;
