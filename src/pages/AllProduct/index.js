import classNames from 'classnames/bind';

import styles from './AllProduct.module.scss';
import Product from '~/components/Product/index';

const cn = classNames.bind(styles);

function AllProduct() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            {/* <div className={cn('filter-conditions')}>
               <span className={cn('condition-item')}></span>
            </div> */}

            <div className={cn('products-list')}>
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
               <Product />
            </div>
         </div>
      </div>
   );
}

export default AllProduct;
