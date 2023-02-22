import classNames from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';

import styles from './Brand.module.scss';
import BrandItem from '~/components/BrandItem';

const cn = classNames.bind(styles);

function Brand() {
   return (
      <div className={cn('wrapper')}>
         <div className={cn('inner-contents')}>
            <div className={cn('brands-list')}>
               <Swiper
                  slidesPerView={5}
                  spaceBetween={15}
                  loop={true}
                  pagination={{
                     clickable: true,
                     enabled: false,
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  className="brands-list-swiper"
               >
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
                  <SwiperSlide>
                     <BrandItem />
                  </SwiperSlide>
               </Swiper>
            </div>
         </div>
      </div>
   );
}

export default Brand;
