import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import classNames from 'classnames/bind';

import styles from './Recommend.module.scss';
import Button from '~/components/Button/index';

const cn = classNames.bind(styles);

function Recommend() {
   document.title = 'Tìm kiếm kính theo gương mặt';

   const imgRef = useRef();
   const canvasRef = useRef();

   const [img, setImg] = useState('');

   const handleDetection = async () => {
      const detection = await faceapi.detectAllFaces(imgRef.current).withFaceLandmarks().withFaceDescriptors();

      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);

      faceapi.matchDimensions(canvasRef.current, {
         width: 500,
         height: 500,
      });

      const resized = faceapi.resizeResults(detection, {
         width: 500,
         height: 500,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      resized.forEach((detection) => {
         const box = detection.detection.box;
         const drawBox = new faceapi.draw.DrawBox(box, {
            label: Math.round(detection.age) + ' year old - ' + detection.gender,
         });
         drawBox.draw(canvasRef.current);
      });
   };

   useEffect(() => {
      const loadModels = () => {
         Promise.all([
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
         ])
            .then(() => {
               console.log('Loaded models');
            })
            .catch((err) => console.log(err));
      };

      loadModels();
   }, []);

   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('choose-img-area')}>
               <span>Chúng tôi cần ảnh gương mặt của bạn để có thể xác định hình dạng của nó.</span>

               <div className={cn('choose-img-btn')}>
                  <label>
                     Chọn ảnh của bạn
                     <input
                        type="file"
                        onChange={(e) => {
                           setImg(e.target.files);

                           var obj = document.querySelector('#preview');
                           obj.src = URL.createObjectURL(e.target.files[0]);

                           var ctx = canvasRef.current.getContext('2d');
                           ctx.clearRect(0, 0, 700, 700);
                        }}
                     />
                  </label>
               </div>
            </div>

            {img ? (
               <div className={cn('comfirm-btn')}>
                  <Button onClick={handleDetection}>Nhận dạng</Button>
               </div>
            ) : (
               <></>
            )}

            <div className={cn('draw-area')}>
               <img ref={imgRef} id="preview" src="" alt="Ảnh gương mặt" width="500" height="500" />

               <canvas ref={canvasRef} width="500" height="500"></canvas>
            </div>
         </div>
      </div>
   );
}

export default Recommend;
