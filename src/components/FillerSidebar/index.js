import { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { faFilter } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';

import styles from './FillterSidebar.module.scss';
import Button from '../Button/index';

const cn = classNames.bind(styles);

function FillterSidebar() {
   const [consditions, setConditions] = useState({ brands: [], categorise: [], price: 0 });

   const [products, setProducts] = useState([]);
   const [brands, setBrands] = useState([]);

   const [brandsFilter, setBrandsFilter] = useState([]);
   const [categoriseFilter, setCategoriseFilter] = useState([]);
   const [price, setPrice] = useState(-1);

   const handleGetProductFirst = async () => {
      try {
         var product_list = await axios.get('http://localhost:4000/products');
         if (product_list.data.length > 0) {
            setProducts(product_list.data);
         } else {
            console.log('Get sản phẩm thất bại!');
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleGetProductWithFilter = async () => {};

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

   const handleFilter = () => {
      setConditions({ brands: brandsFilter, categorise: categoriseFilter, price: price });
   };

   useEffect(() => {
      handleGetProductFirst();
      handleGetBrandList();
   }, []);

   // console.log(brandsFilter, categoriseFilter, price);
   // console.log(consditions);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
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
                     <input type="checkbox" value="kinh-nam" onChange={(e) => handleCheckCategory(e.target.value)} />
                     <span>Kính nam</span>
                  </div>
                  <div className={cn('fillter-item')}>
                     <input type="checkbox" value="kinh-nu" onChange={(e) => handleCheckCategory(e.target.value)} />
                     <span>Kính nữ</span>
                  </div>
                  <div className={cn('fillter-item')}>
                     <input type="checkbox" value="kinh-unisex" onChange={(e) => handleCheckCategory(e.target.value)} />
                     <span>Kính Unisex</span>
                  </div>
                  <div className={cn('fillter-item')}>
                     <input type="checkbox" value="kinh-tre-em" onChange={(e) => handleCheckCategory(e.target.value)} />
                     <span>Kính trẻ em</span>
                  </div>
               </div>
            </div>

            <div className={cn('fillter-type')}>
               <h4>Lọc theo giá</h4>

               <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.8rem' }}> {'<' + price}</span>

                  <input
                     className={cn('range')}
                     type="range"
                     step="1"
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
                     handleFilter();
                     handleGetProductWithFilter();
                  }}
               >
                  Tìm kiếm
               </Button>
            </div>
         </div>
      </div>
   );
}

export default FillterSidebar;
