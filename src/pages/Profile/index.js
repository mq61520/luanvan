import { useEffect, useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './Profile.module.scss';
import Button from '~/components/Button';

const cn = classNames.bind(styles);

function Profile() {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [diaChi, setDiaChi] = useState('');
   const [phone, setPhone] = useState('');
   const [currentAvatar, setCurrentAvatar] = useState('');

   const [avatarUpload, setAvatarUpload] = useState('');

   const user_id = localStorage.getItem('current_user');

   const handleLoadInfo = async () => {
      try {
         if (user_id.length > 0) {
            const response = await axios.get('http://localhost:4000/account_id/' + user_id);

            setName(response.data[0].nd_hoten);
            setEmail(response.data[0].nd_email);
            setDiaChi(response.data[0].nd_diachi);
            setPhone(response.data[0].nd_sdt);
            setCurrentAvatar(response.data[0].nd_avatar);

            // console.log(response);
         } else {
            return;
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleUploadAvatar = async (e) => {
      const formData = new FormData();
      formData.append('image', avatarUpload[0]);
      formData.append('id', user_id);

      const uploadAvatar_response = await axios({
         method: 'POST',
         url: 'http://localhost:4000/upload_avatar/',
         data: formData,
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });

      console.log(uploadAvatar_response.data);

      if (uploadAvatar_response.data === 'No image') {
         console.log('No image');
         await toast.error('No image', { position: 'top-center' });
         return;
      }
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
                     currentAvatar
                        ? `http://localhost:4000/${currentAvatar}`
                        : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                  }
                  alt="Avatar"
               />

               <section>
                  <form onSubmit={handleUploadAvatar}>
                     <span>Cập nhật ảnh đại diện</span>

                     <input
                        className={cn('change-avatar-btn')}
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(e) => {
                           setAvatarUpload(e.target.files);
                        }}
                     />

                     <button type="button">Upload</button>

                     {/* {avatarUpload ? ( */}
                     {/* <div className={cn('upload-btn')}>
                        <Button thinfont border>
                           Cập nhật
                        </Button>
                     </div> */}
                     {/* ) : (
                        <></>
                     )} */}
                  </form>
               </section>
            </div>

            <div className={cn('info-field')}>
               <h2 className={cn('name')}>{name}</h2>
               <h3 className={cn('gender', 'mt')}>
                  <b>Email:</b> {email}
               </h3>
               <h3 className={cn('address', 'mt')}>
                  <b>Địa chỉ:</b> {diaChi}
               </h3>
               <h3 className={cn('phone', 'mt')}>
                  <b>Số điện thoại:</b> {phone}
               </h3>
            </div>
         </div>
      </div>
   );
}

export default Profile;
