import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Recommend.module.scss';

const cn = classNames.bind(styles);

function Recommend() {
   document.title = 'Tìm kiếm kính theo gương mặt';

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('choose-img-area')}>
               <span>Chúng tôi cần ảnh gương mặt của bạn để có thể xác định hình dạng của nó</span>

               <div className={cn('choose-img-btn')}>
                  <label>
                     Chọn ảnh của bạn
                     <input
                        type="file"
                        onChange={(e) => {
                           var obj = document.querySelector('#preview');
                           obj.src = URL.createObjectURL(e.target.files[0]);
                        }}
                     />
                  </label>
               </div>
            </div>

            <img id="preview" src="" alt="Ảnh gương mặt" />
         </div>
      </div>
   );
}

export default Recommend;
