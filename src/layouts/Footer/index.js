import classNames from 'classnames/bind';

import styles from './Footer.module.scss';

const cn = classNames.bind(styles);

function Footer() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('title')}>
               <h2>Luận văn tốt nghiệp KTPM</h2>
            </div>

            <div className={cn('contact')}>
               <h4>Nguyễn Minh Quân | B1805807</h4>
            </div>
         </div>
      </div>
   );
}

export default Footer;
