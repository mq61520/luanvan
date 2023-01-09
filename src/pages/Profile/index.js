import classNames from 'classnames/bind';

import styles from './Profile.module.scss';

const cn = classNames.bind(styles);

function Profile() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('img-field')}>
               <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="Avatar" />
               <input className={cn('change-avatar-btn')} type="file" />
            </div>

            <div className={cn('info-field')}>
               <h2 className={cn('name', 'mt')}>Nguyen Van A</h2>
               <h3 className={cn('gender', 'mt')}>Gioi tinh: Nam</h3>
               <h3 className={cn('address', 'mt')}>Dia chi: 100 ap Cau Xang, xa Tan Binh, Phung Hiep, Hau Giang</h3>
               <h3 className={cn('phone', 'mt')}>SDT: 0123456789</h3>
            </div>
         </div>
      </div>
   );
}

export default Profile;
