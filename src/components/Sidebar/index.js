import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';

const cn = classNames.bind(styles);

function Sidebar() {
   return <div className={cn('wrapper')}>Sidebar</div>;
}

export default Sidebar;
