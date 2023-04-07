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
      } else {
         handleLoadInfo();
      }
   };

   const handleUpdateAddress = async () => {
      const new_address = prompt('Địa chỉ mới:');
      if (new_address == null) {
         return;
      } else {
         const address_response = await axios.post('http://localhost:4000/profile_address', {
            address: new_address,
            user_id: user_id,
         });
         if (address_response.data === 'UpdateSuccess') {
            alert('Cập nhật thành công');
            handleLoadInfo();
         } else {
            alert('Cập nhật không thành công');
         }
      }
   };

   const handleUpdatePhone = async () => {
      const new_phone = prompt('Địa chỉ mới:');
      if (new_phone == null) {
         return;
      } else {
         const phone_response = await axios.post('http://localhost:4000/profile_phone', {
            phone: new_phone,
            user_id: user_id,
         });
         if (phone_response.data === 'UpdateSuccess') {
            alert('Cập nhật thành công');
            handleLoadInfo();
         } else {
            alert('Cập nhật không thành công');
         }
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
                  <span>Cập nhật ảnh đại diện</span>

                  <input
                     className={cn('change-avatar-btn')}
                     type="file"
                     accept=".jpg, .jpeg, .png"
                     onChange={(e) => {
                        setAvatarUpload(e.target.files);
                     }}
                  />

                  {/* <button type="button">Upload</button> */}

                  {/* {avatarUpload ? ( */}
                  <div className={cn('upload-btn')}>
                     <Button thinfont border onClick={handleUploadAvatar}>
                        Cập nhật
                     </Button>
                  </div>
                  {/* ) : (
                        <></>
                     )} */}
               </section>
            </div>

            <div className={cn('info-field')}>
               <h2 className={cn('name')}>{name}</h2>

               <h3 className={cn('email', 'mt')}>
                  <b>Email:</b> {email}
               </h3>

               <div className={cn('info-item')}>
                  <h3 className={cn('address', 'mt')}>
                     <b>Địa chỉ:</b> {diaChi}
                  </h3>
                  <div className={cn('update-address-btn')}>
                     <Button onlytext thinfont onClick={handleUpdateAddress}>
                        Cập nhật
                     </Button>
                  </div>
               </div>

               <div className={cn('info-item')}>
                  <h3 className={cn('phone', 'mt')}>
                     <b>Số điện thoại:</b> {phone}
                  </h3>
                  <div className={cn('update-phone-btn')}>
                     <Button onlytext thinfont onClick={handleUpdatePhone}>
                        Cập nhật
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Profile;
