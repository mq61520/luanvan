import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import Button from '~/components/Button';

const cn = classNames.bind(styles);

function Profile() {
   const [name, setName] = useState('');
   const [diaChi, setDiaChi] = useState('');
   const [phone, setPhone] = useState('');

   const [avatar, setAvatar] = useState('');

   const user_id = localStorage.getItem('current_user');
   const avatar_img = localStorage.getItem('avatar_name');

   const handleLoadInfo = async () => {
      try {
         if (user_id.length > 0) {
            const response = await axios.get('http://localhost:4000/account_id/' + user_id);

            setName(response.data[0].nd_hoten);
            setDiaChi(response.data[0].nd_diachi);
            setPhone(response.data[0].nd_sdt);

            // console.log(response);
         } else {
            return;
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleUploadAvatar = async () => {
      const formData = new FormData();
      formData.append('image', avatar[0]);
      formData.append('id', user_id);

      await axios({
         method: 'POST',
         url: 'http://localhost:4000/upload_avatar/',
         data: formData,
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
   };

   useEffect(() => {
      handleLoadInfo();
   });

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('img-field')}>
               <img
                  src={
                     avatar_img
                        ? `http://localhost:4000/${avatar_img}`
                        : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                  }
                  alt="Avatar"
               />

               <form onSubmit={handleUploadAvatar}>
                  <input
                     className={cn('change-avatar-btn')}
                     type="file"
                     onChange={(e) => {
                        setAvatar(e.target.files);
                     }}
                  />

                  <div className={cn('upload-btn')}>
                     <Button>Upload</Button>
                  </div>
               </form>
            </div>

            <div className={cn('info-field')}>
               <h2 className={cn('name', 'mt')}>{name}</h2>
               <h3 className={cn('gender', 'mt')}>Gioi tinh: Nam</h3>
               <h3 className={cn('address', 'mt')}>Dia chi: {diaChi}</h3>
               <h3 className={cn('phone', 'mt')}>SDT: {phone}</h3>
            </div>
         </div>
      </div>
   );
}

export default Profile;
