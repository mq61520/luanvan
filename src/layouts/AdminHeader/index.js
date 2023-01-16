import classNames from 'classnames/bind';

import styles from './AdminHeader.module.scss';

const cn = classNames.bind(styles);

function AdminHeader() {
   return <div className={cn('wrapper')}></div>;
}

export default AdminHeader;
