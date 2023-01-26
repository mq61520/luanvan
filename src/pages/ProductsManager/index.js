import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faPlus } from '@fortawesome/free-solid-svg-icons/index';

import styles from './ProductsManager.module.scss';
import Button from '~/components/Button/index';
import currencyFormater from '~/common/formatCurrency';

const cn = classNames.bind(styles);

function ProductsManager() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Quản lý sản phẩm</h4>

            <div className={cn('product-crud')}>
               <div className={cn('crud-btn')}>
                  <div className={cn('add-btn')}>
                     <Button border>
                        <FontAwesomeIcon className={cn('add-btn-icon')} icon={faPlus} />
                     </Button>
                  </div>
               </div>

               <div className={cn('add-product-area')}></div>
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
                           Chỉnh sửa
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
                           Chỉnh sửa
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
