import classNames from 'classnames/bind';

import styles from './FillterSidebar.module.scss';

const cn = classNames.bind(styles);

function FillterSidebar() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('fillter-type')}>
               <h4>Lọc theo thương hiệu</h4>
            </div>

            <div className={cn('fillter-type')}>
               <h4>Lọc theo danh mục</h4>

               <div className={cn('category-list')}>
                  <input type="checkbox" />
               </div>
            </div>

            <div className={cn('fillter-type')}>
               <h4>Lọc theo giá</h4>

               <input type="range" />
            </div>
         </div>
      </div>
   );
}

export default FillterSidebar;
