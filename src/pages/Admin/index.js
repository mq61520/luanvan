import classNames from 'classnames/bind';

import styles from './Admin.module.scss';

const cn = classNames.bind(styles);

function Admin() {
   return <div className={cn('wrapper')}>Admin</div>;
}

export default Admin;
