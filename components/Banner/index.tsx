import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';

import styles from './styles.module.css';

export const Banner = () => {
    return (
        <div className={styles.container}>
            <Swiper
                slidesPerView={1}
                className={styles.swiper}
                loop={true}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false
                }}
                modules={[Autoplay]}
            >
                <SwiperSlide className={styles.slide}>
                    <div className={styles.slideImg}>1</div>
                </SwiperSlide>
                <SwiperSlide className={styles.slide}>
                <div className={styles.slideImg}>2</div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}