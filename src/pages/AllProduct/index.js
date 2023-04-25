import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faFilter } from '@fortawesome/free-solid-svg-icons/index';

import styles from './AllProduct.module.scss';
import Product from '~/components/Product/index';
import Button from '~/components/Button/index';
import currencyFormater from '~/common/formatCurrency';
import { render } from 'react-dom';

const cn = classNames.bind(styles);

function AllProduct() {
   const [products, setProducts] = useState([]);
   const [productsFilter, setProductsFilter] = useState([]);
   const [brands, setBrands] = useState([]);

   const [brandsFilter, setBrandsFilter] = useState([]);
   const [categoriseFilter, setCategoriseFilter] = useState([]);
   const [price, setPrice] = useState(0);

   const [msg, setMsg] = useState('');

   const handleGetProductFirst = async () => {
      try {
         var product_list = await axios.get('http://localhost:4000/products');

         var list = [];
         if (product_list.data.length > 0) {
            for (let i = 0; i < product_list.data.length; i++) {
               const promotion_response = await axios.get(
                  'http://localhost:4000/promotion_id/' + product_list.data[i].sp_khuyenmai,
               );

               if (promotion_response.data.length > 0) {
                  list.push({ km: promotion_response.data[0].km_value, product: product_list.data[i] });
               } else {
                  list.push({ km: null, product: product_list.data[i] });
               }

               // console.log(list);
            }

            setProducts(list);
         } else {
            console.log('Get sản phẩm thất bại!');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleGetProductWithFilter = async () => {
      const filter_res = await axios.post('http://localhost:4000/product/filter-product', {
         brands: brandsFilter,
         categorise: categoriseFilter,
         price: price,
      });

      var list = [];
      if (filter_res.data.length > 0) {
         for (let i = 0; i < filter_res.data.length; i++) {
            const promotion_response = await axios.get(
               'http://localhost:4000/promotion_id/' + filter_res.data[i].sp_khuyenmai,
            );

            if (promotion_response.data.length > 0) {
               list.push({ km: promotion_response.data[0].km_value, product: filter_res.data[i] });
            } else {
               list.push({ km: null, product: filter_res.data[i] });
            }

            // console.log(list);
         }

         setProductsFilter(list);
         setMsg('');
      } else {
         setProductsFilter([]);
         setMsg('Không có sản phẩm phù hợp');
      }
   };

   console.log(productsFilter);

   const handleGetBrandList = async () => {
      try {
         const response = await axios.get('http://localhost:4000/brands');

         if (response.data) {
            setBrands(response.data);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleCheckBrand = (value) => {
      setBrandsFilter((prev) => {
         var exis = Array.from(brandsFilter).includes(value);
         if (exis) {
            return Array.from(brandsFilter).filter((item) => item !== value);
         } else {
            return [...prev, value];
         }
      });
   };

   const handleCheckCategory = (value) => {
      setCategoriseFilter((prev) => {
         var exis = Array.from(categoriseFilter).includes(value);
         if (exis) {
            return Array.from(categoriseFilter).filter((item) => item !== value);
         } else {
            return [...prev, value];
         }
      });
   };

   useEffect(() => {
      handleGetProductFirst();
      handleGetBrandList();
   }, []);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('sidebar-wrapper')}>
               <div className={cn('sidebar-inner-contents')}>
                  <h4>Lọc</h4>

                  <div className={cn('fillter-type')}>
                     <h4>Lọc theo thương hiệu</h4>

                     <div className={cn('fillter-list')}>
                        {brands.length > 0 ? (
                           brands.map((brand) => {
                              return (
                                 <div className={cn('fillter-item')} key={brand.th_id}>
                                    <input
                                       type="checkbox"
                                       value={brand.th_link}
                                       onChange={(e) => handleCheckBrand(e.target.value)}
                                    />
                                    <span>{brand.th_ten}</span>
                                 </div>
                              );
                           })
                        ) : (
                           <></>
                        )}
                     </div>
                  </div>

                  <div className={cn('fillter-type')}>
                     <h4>Lọc theo danh mục</h4>

                     <div className={cn('fillter-list')}>
                        <div className={cn('fillter-item')}>
                           <input
                              type="checkbox"
                              value="Kính nam"
                              onChange={(e) => handleCheckCategory(e.target.value)}
                           />
                           <span>Kính nam</span>
                        </div>
                        <div className={cn('fillter-item')}>
                           <input
                              type="checkbox"
                              value="Kính nữ"
                              onChange={(e) => handleCheckCategory(e.target.value)}
                           />
                           <span>Kính nữ</span>
                        </div>
                        <div className={cn('fillter-item')}>
                           <input
                              type="checkbox"
                              value="Kính unisex"
                              onChange={(e) => handleCheckCategory(e.target.value)}
                           />
                           <span>Kính Unisex</span>
                        </div>
                        <div className={cn('fillter-item')}>
                           <input
                              type="checkbox"
                              value="Kính trẻ em"
                              onChange={(e) => handleCheckCategory(e.target.value)}
                           />
                           <span>Kính trẻ em</span>
                        </div>
                     </div>
                  </div>

                  <div className={cn('fillter-type')}>
                     <h4>Lọc theo giá</h4>

                     <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.8rem' }}> {'< ' + currencyFormater.format(price)}</span>

                        <input
                           className={cn('range')}
                           type="range"
                           step="100"
                           max="5000000"
                           value={price ? price : ''}
                           onChange={(e) => setPrice(e.target.value)}
                        />
                     </div>
                  </div>

                  <div className={cn('filter-btn')}>
                     <Button
                        thinfont
                        lefticon=<FontAwesomeIcon icon={faFilter} />
                        onClick={() => {
                           setProducts([]);
                           handleGetProductWithFilter();
                        }}
                     >
                        Tìm kiếm
                     </Button>
                  </div>
               </div>
            </div>

            <div>
               {msg.length > 0 ? <div className={cn('message')}>{msg}</div> : <></>}

               {/* <h2 style={{ marginBottom: '10px', fontSize: '1.8rem', fontWeight: '400' }}>
                  Có {products.length} sản phẩm
               </h2> */}

               <div className={cn('products-list')}>
                  {productsFilter.length > 0
                     ? productsFilter.map((product) => {
                          return (
                             <Product
                                key={product.product.sp_ma}
                                ma_sp={product.product.sp_ma}
                                img={product.product.sp_image}
                                name={product.product.sp_ten}
                                price={product.product.sp_gia}
                                km={product.km}
                             />
                          );
                       })
                     : products.map((product) => {
                          return (
                             <Product
                                key={product.product.sp_ma}
                                ma_sp={product.product.sp_ma}
                                img={product.product.sp_image}
                                name={product.product.sp_ten}
                                price={product.product.sp_gia}
                                km={product.km}
                             />
                          );
                       })}
               </div>
            </div>
         </div>
      </div>
   );
}

export default AllProduct;
