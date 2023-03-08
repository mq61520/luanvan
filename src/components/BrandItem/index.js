import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './BrandItem.module.scss';

const cn = classNames.bind(styles);

function BrandItem({ brandname, logo, onClick }) {
   document.title = 'Brands';

   var link_logo = 'http://localhost:4000/' + logo;

   const [selected, setSelected] = useState('');

   const handleSelected = () => {
      if (selected === '') {
         setSelected('selected');
      } else {
         setSelected('');
      }
   };

   const props = { onClick };

   const cName = cn('wrapper', { selected });

   return (
      <div className={cName} {...props}>
         <div className={cn('inner-contents')}>
            <img src={link_logo} alt="Logo brand" />

            <h3>{brandname}</h3>
         </div>
      </div>
   );
}

export default BrandItem;
