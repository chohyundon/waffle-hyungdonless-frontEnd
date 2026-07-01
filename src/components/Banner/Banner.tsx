'use client';

import { useRef } from 'react';
import styles from '@/components/Banner/Banner.module.css';
import bannerImage from '@/assets/icons/bannerImg.svg';
import prevIcon from '@/assets/icons/leftBannerIcon.svg';
import nextIcon from '@/assets/icons/rightBannerIcon.svg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { assetSrc } from '@/lib/assetSrc';

export const Banner = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const onSwiper = (swiper: any) => {
    setTimeout(() => {
      if (prevRef.current && nextRef.current && !swiper.destroyed) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    });
  };

  return (
    <section className={styles.sliderContainer}>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={2.5}
        loop={true}
        centeredSlides={true}
        spaceBetween={24}
        keyboard={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={onSwiper}
        breakpoints={{
          1820: { spaceBetween: 10 },
          1830: { spaceBetween: 0 },
          1900: { spaceBetween: -74 },
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <SwiperSlide key={i}>
            <img
              src={assetSrc(bannerImage)}
              alt={`메인 배너 ${i + 1}`}
              className={styles.img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.iconContainer}>
        <img
          ref={prevRef}
          src={assetSrc(prevIcon)}
          alt='이전 이미지'
          className={styles.prevIcon}
        />
        <img
          ref={nextRef}
          src={assetSrc(nextIcon)}
          alt='다음 이미지'
          className={styles.nextIcon}
        />
      </div>
    </section>
  );
};
