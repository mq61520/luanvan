import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './BrandItem.module.scss';

const cn = classNames.bind(styles);

function BrandItem({ onClick }) {
   document.title = 'Brands';

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
      <div className={cName} {...props} onClick={handleSelected}>
         <div className={cn('inner-contents')}>
            <img
               src="https://www.pngall.com/wp-content/uploads/11/Dolce-And-Gabbana-Logo-PNG-Pic.png"
               alt="Logo brand"
            />

            <h3>Docle & Gabbana</h3>
         </div>
      </div>
   );
}

export default BrandItem;
