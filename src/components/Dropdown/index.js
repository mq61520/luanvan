import classNames from 'classnames/bind';

import styles from './Dropdown.module.scss';

const cn = classNames.bind(styles);

function Dropdown({ children }) {
   return <div className={cn('wrapper')}>{children}</div>;
}

export default Dropdown;
