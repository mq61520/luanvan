import classNames from 'classnames/bind';

import styles from './Admin.module.scss';

const cn = classNames.bind(styles);

function Admin() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <h4 className={cn('content-title')}>Trang chu Admin</h4>
         </div>
      </div>
   );
}

export default Admin;
