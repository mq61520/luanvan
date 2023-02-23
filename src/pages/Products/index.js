import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import Button from '~/components/Button';
import Product from '~/components/Product';

const cn = classNames.bind(styles);

function Products() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('categories')}>
               <h3>Danh mục</h3>

               <div className={cn('category-item')}>
                  <Button border thinfont>
                     Tất cả
                  </Button>
               </div>

               <div className={cn('category-item')}>
                  <Button border thinfont>
                     Kính nam
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button border thinfont>
                     Kính nữ
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button border thinfont>
                     Kính unisex
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button border thinfont>
                     Kính trẻ em
                  </Button>
               </div>
            </div>

            <h3 className={cn('title-list')}>Tất cả sản phẩm</h3>
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

export default Products;
