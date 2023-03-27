import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faFilter } from '@fortawesome/free-solid-svg-icons/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';

import styles from './FillterSidebar.module.scss';
import Button from '../Button/index';

const cn = classNames.bind(styles);

function FillterSidebar() {
   const [consditions, setConditions] = useState({ brands: [], categorise: [], price: 0 });

   const [brandsFilter, setBrandsFilter] = useState([]);
   const [categoriseFilter, setCategoriseFilter] = useState([]);
   const [price, setPrice] = useState(0);

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

   // console.log(brandsFilter, categoriseFilter, price);
   console.log(consditions);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4>Lọc</h4>

            <div className={cn('fillter-type')}>
               <h4>Lọc theo thương hiệu</h4>

               <div className={cn('fillter-list')}>
                  <div className={cn('fillter-item')}>
                     <input type="checkbox" value="gucci" onChange={(e) => handleCheckBrand(e.target.value)} />
                     <span>Kính nam</span>
                  </div>
                  <div className={cn('fillter-item')}>
                     <input type="checkbox" value="dior" onChange={(e) => handleCheckBrand(e.target.value)} />
                     <span>Kính nam</span>
                  </div>
                  <div className={cn('fillter-item')}>
                     <input type="checkbox" value="balenciaga" onChange={(e) => handleCheckBrand(e.target.value)} />
                     <span>Kính nam</span>
                  </div>
                  <div className={cn('fillter-item')}>
                     <input type="checkbox" value="docel&gabbana" onChange={(e) => handleCheckBrand(e.target.value)} />
                     <span>Kính nam</span>
                  </div>
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
                  <span style={{ fontSize: '1.8rem' }}>0-100000000</span>

                  <input className={cn('range')} type="range" step="1" onChange={(e) => setPrice(e.target.value)} />
               </div>
            </div>

            <div className={cn('filter-btn')}>
               <Button thinfont lefticon=<FontAwesomeIcon icon={faFilter} /> onClick={handleFilter}>
                  Tìm kiếm
               </Button>
            </div>
         </div>
      </div>
   );
}

export default FillterSidebar;
