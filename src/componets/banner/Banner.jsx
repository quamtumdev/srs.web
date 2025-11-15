import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import styles from "../banner/banner.module.css";

export const Banner = () => {
  return (
    <Swiper
      className={styles["banner-swiper"]}
      slidesPerView={1}
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      loop={false}
      grabCursor={true}
    >
      <SwiperSlide className={styles["banner-swiper-slide"]}>
        <img src="/assets/img/banner/banner1.jpg" alt="Banner" />
      </SwiperSlide>
    </Swiper>
  );
};
