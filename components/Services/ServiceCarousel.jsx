import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const ServiceCarousel = () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      navigation
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      <SwiperSlide>
        <div className="service-item">
          <div className="service-icon">💻</div>
          <h3 className="service-title">IT Consulting</h3>
          <p className="service-description">
            Helping you make the most out of your technology, whether it's setting up new systems or fixing the old ones, so you can focus on what you do best.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service-item">
          <div className="service-icon">📈</div>
          <h3 className="service-title">Data Analysis</h3>
          <p className="service-description">
            Turning your data into easy-to-understand insights, helping you see the bigger picture and make smarter decisions.
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="service-item">
          <div className="service-icon">🧑🏽‍💻</div>
          <h3 className="service-title">Website Development</h3>
          <p className="service-description">
            Creating user-friendly websites that not only look great but are also easy to navigate, ensuring your online presence truly reflects your brand.
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default ServiceCarousel;
