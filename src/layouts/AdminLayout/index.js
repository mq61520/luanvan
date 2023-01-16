import AdminHeader from '../AdminHeader';
import classNames from 'classnames/bind';

import styles from './AdminLayout.module.scss';
import Sidebar from '~/components/Sidebar/index';

const cn = classNames.bind(styles);

function AdminLayout({ children }) {
   return (
      <div>
         <AdminHeader />
         <div className={cn('main-contents')}>
            <Sidebar />
            {children}
         </div>
      </div>
   );
}

export default AdminLayout;
