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

const cn = classNames.bind(styles);

ReactModal.setAppElement('#root');

function ProductsManager() {
   const [showModal, setShowModal] = useState(false);

   const [products, setProducts] = useState([]);

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

         console.log(imgSp);
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
            toast.success('Th??m th??nh c??ng!', { position: 'top-center' });

            setImgSp([]);
            setMaSp('');
            setTenSp('');
            setSlSp('');
            setGiaSp('');
            setMotaSp('');
         } else {
            console.log('Them khong thanh cong');
            toast.success('Th??m kh??ng th??nh c??ng!', { position: 'top-center' });
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleGetProductList = async () => {
      try {
         const product_list = await axios.get('http://localhost:4000/products');

         if (product_list) {
            setProducts(product_list.data);
         } else {
            console.log('Get s???n ph???m th???t b???i!');
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      handleGetProductList();
   }, []);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Qu???n l?? s???n ph???m</h4>

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
                        <section>
                           <form onSubmit={handleAddProduct} encType="multipart/form-data">
                              <div className={cn('modal-header')}>
                                 <h3>Th??m s???n ph???m m???i</h3>

                                 <div className={cn('close-modal-btn')}>
                                    <Button onlytext onClick={handleOpenModal}>
                                       <FontAwesomeIcon icon={faXmark} />
                                    </Button>
                                 </div>
                              </div>

                              <div className={cn('modal-body')}>
                                 <div className={cn('left-side')}>
                                    <div className={cn('input-label')}>
                                       <span>M?? s???n ph???m</span>
                                       <input
                                          className={cn('input-txt')}
                                          value={maSp.toUpperCase()}
                                          onChange={(e) => setMaSp(e.target.value)}
                                          required
                                       />
                                    </div>

                                    <div className={cn('input-label')}>
                                       <span>T??n s???n ph???m</span>
                                       <input
                                          className={cn('input-txt')}
                                          value={tenSp}
                                          onChange={(e) => setTenSp(e.target.value)}
                                          required
                                       />
                                    </div>

                                    <div className={cn('input-label')}>
                                       <span>S??? l?????ng</span>
                                       <input
                                          className={cn('input-txt')}
                                          value={slSp}
                                          onChange={(e) => setSlSp(e.target.value)}
                                          required
                                          type="number"
                                       />
                                    </div>

                                    <div className={cn('input-label')}>
                                       <span>Gi??</span>
                                       <input
                                          className={cn('input-txt')}
                                          value={giaSp}
                                          onChange={(e) => setGiaSp(e.target.value)}
                                          required
                                          type="number"
                                       />
                                    </div>
                                 </div>

                                 <div className={cn('right-side')}>
                                    <div className={cn('input-label')}>
                                       <span>M?? t??? s???n ph???m</span>
                                       {/* <input type="text-area" className={cn('input-txt')} /> */}
                                       <textarea
                                          className={cn('textarea-txt')}
                                          value={motaSp}
                                          onChange={(e) => setMotaSp(e.target.value)}
                                          required
                                       ></textarea>
                                    </div>

                                    <div className={cn('input-label')}>
                                       <span>???nh ?????i di???n s???n ph???m</span>
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
                                       Th??m
                                    </Button>
                                 </div>
                              </div>
                           </form>
                        </section>
                     </ReactModal>
                  </div>
               </div>

               {/* <div className={cn('add-product-area')}></div> */}
            </div>

            <div className={cn('product-table')}>
               <div className={cn('table-header')}>
                  <h4 className={cn('product-number')}>STT</h4>
                  <h4 className={cn('product-code')}>M?? SP</h4>
                  <h4 className={cn('product-name')}>T??n SP</h4>
                  <h4 className={cn('product-price')}>Gi??</h4>
                  <h4 className={cn('product-instock')}>T???n kho</h4>
                  <h4 className={cn('product-edit')}>Ch???nh s???a</h4>
                  <h4 className={cn('product-del')}>X??a</h4>
               </div>

               <div className={cn('table-body')}>
                  {products.length > 0 ? (
                     products.map((product) => {
                        return (
                           <div key={product.sp_id} className={cn('table-row')}>
                              <h4 className={cn('product-number')}>1</h4>
                              <h4 className={cn('product-code')}>{product.sp_ma}</h4>
                              <h4 className={cn('product-name')}>{product.sp_ten}</h4>
                              <h4 className={cn('product-price')}>{currencyFormater.format(product.sp_gia)}</h4>
                              <h4 className={cn('product-instock')}>{product.sp_tonkho}</h4>
                              <h4 className={cn('product-edit')}>
                                 <Button onlytext thinfont>
                                    <FontAwesomeIcon icon={faEdit} />
                                 </Button>
                              </h4>
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
                                    X??a
                                 </Button>
                              </h4>
                           </div>
                        );
                     })
                  ) : (
                     <h1 className={cn('no-product')}>Kh??ng c?? s???n ph???m</h1>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}

export default ProductsManager;
