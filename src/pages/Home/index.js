import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import Product from '~/components/Product/index';

const cn = classNames.bind(styles);

function Home() {
   document.title = 'Store';

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('home-banner')}>
               <h1>Ví Handmade</h1>

               <div
                  style={{
                     backgroundImage: 'url(https://sovani.vn/wp-content/uploads/2020/03/xuong-san-xuat-vi-da.jpg)',
                  }}
               ></div>
            </div>

            <div className={cn('all-product')}>
               <h1>Tất cả sản phẩm</h1>

               <div className={cn('list-products')}>
                  <Product sale />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
               </div>
            </div>

            <div className={cn('hot-products')}></div>
         </div>
      </div>
   );
}

export default Home;
