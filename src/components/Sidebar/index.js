import classNames from 'classnames/bind';
import Button from '../Button/index';

import styles from './Sidebar.module.scss';

const cn = classNames.bind(styles);

function Sidebar() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('category-manager')}>
               <h4 className={cn('sidebar-title')}>Danh mục</h4>

               <div className={cn('category-item')}>
                  <Button border to={'/admin'}>
                     Trang chủ
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button border to={'/admin/ordermanager'}>
                     Quản lý đơn hàng
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button border to={'/admin/productsmanager'}>
                     Quản lý hàng hóa
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button border to={'/admin/accountsmanager'}>
                     Quản lý tài khoản
                  </Button>
               </div>
               <div className={cn('category-item')}>
                  <Button border>Thống kê hàng hóa</Button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Sidebar;
