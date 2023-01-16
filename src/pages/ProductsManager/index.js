import classNames from 'classnames/bind';

import styles from './ProductsManager.module.scss';

const cn = classNames.bind(styles);

function ProductsManager() {
   return <div className={cn('wrapper')}>productsmanager</div>;
}

export default ProductsManager;
