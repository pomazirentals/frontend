import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// ✅ Import images
import bgImg from "../../../images/bg/testimonial-bg02.png";
import subLeftWhiteIcon from "../../../images/icon/sub_left-_white_icon.png";
import subRightWhiteIcon from "../../../images/icon/sub_right-_white_icon.png";
import animatedGif from "../../../images/icon/animated-gif03.gif";
import quoteIcon from "../../../images/testimonial/quote.png";
import author1 from "../../../images/avatar/author_01.png";
import author2 from "../../../images/avatar/author_02.png";
import author3 from "../../../images/avatar/author_03.png";

const TestimonialSection: React.FC = () => {
  return (
    <section
      className="testimonial pt-145 bg_img"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="container">
        <div className="sec-title sec-title--two tes-sec-title text-center mb-50">
          <span
            className="sub-title wow fadeInUp mb-20"
            data-wow-duration="600ms"
          >
            <img src={subLeftWhiteIcon} alt="icon" /> Testimonials{" "}
            <img src={subRightWhiteIcon} alt="icon" />
          </span>
          <h2
            className="title wow fadeInUp"
            data-wow-delay="150ms"
            data-wow-duration="600ms"
          >
            Hear from our <img src={animatedGif} alt="shape" /> happy customers
          </h2>
        </div>
      </div>

      <div className="testimonial-wrapper">
        <Swiper
          className="ac-testimonial-slider pb-150"
          modules={[Autoplay]}
          loop={true}
          speed={400}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1600: { slidesPerView: 3 },
            1200: { slidesPerView: 3 },
            1024: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            576: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          }}
        >
          {/* === Slide 1 === */}
          <SwiperSlide>
            <div className="ac-testimonial-item ul_li xb-border">
              <div className="xb-item--avatar">
                <img src={author1} alt="Priya Ramirez" />
              </div>
              <div className="xb-item--holder">
                <p className="xb-item--content">
                  "Aivora now automates over 70% of our customer queries,
                  saving hours of manual work daily. It’s improved both our
                  response time and overall customer satisfaction."
                </p>
                <div className="xb-item--author">
                  <h5 className="xb-item--name">Priya Ramirez</h5>
                  <p className="xb-item--desig">Manager - SwiftLogix</p>
                </div>
              </div>
              <div className="xb-item--quote">
                <img src={quoteIcon} alt="quote" />
              </div>
            </div>
          </SwiperSlide>

          {/* === Slide 2 === */}
          <SwiperSlide>
            <div className="ac-testimonial-item ul_li xb-border">
              <div className="xb-item--avatar">
                <img src={author2} alt="Sebastian Clark" />
              </div>
              <div className="xb-item--holder">
                <p className="xb-item--content">
                  "We launched Aivora in just minutes, and the impact was
                  immediate. Our support costs dropped by 50%, and customers
                  receive answers instantly, 24/7."
                </p>
                <div className="xb-item--author">
                  <h5 className="xb-item--name">Sebastian Clark</h5>
                  <p className="xb-item--desig">CEO & Founder - DocFlow</p>
                </div>
              </div>
              <div className="xb-item--quote">
                <img src={quoteIcon} alt="quote" />
              </div>
            </div>
          </SwiperSlide>

          {/* === Slide 3 === */}
          <SwiperSlide>
            <div className="ac-testimonial-item ul_li xb-border">
              <div className="xb-item--avatar">
                <img src={author3} alt="Miguel Torres" />
              </div>
              <div className="xb-item--holder">
                <p className="xb-item--content">
                  "Aivora’s powerful analytics give us deep insights into
                  customer needs. We’ve optimized our chatbot flows and seen
                  noticeable growth in conversions."
                </p>
                <div className="xb-item--author">
                  <h5 className="xb-item--name">Miguel Torres</h5>
                  <p className="xb-item--desig">Director - Finexa Capital</p>
                </div>
              </div>
              <div className="xb-item--quote">
                <img src={quoteIcon} alt="quote" />
              </div>
            </div>
          </SwiperSlide>

          {/* === Slide 4 === */}
          <SwiperSlide>
            <div className="ac-testimonial-item ul_li xb-border">
              <div className="xb-item--avatar">
                <img src={author1} alt="Priya Ramirez" />
              </div>
              <div className="xb-item--holder">
                <p className="xb-item--content">
                  "Aivora now automates over 70% of our customer queries,
                  saving hours of manual work daily. It’s improved both our
                  response time and overall customer satisfaction."
                </p>
                <div className="xb-item--author">
                  <h5 className="xb-item--name">Priya Ramirez</h5>
                  <p className="xb-item--desig">Manager - SwiftLogix</p>
                </div>
              </div>
              <div className="xb-item--quote">
                <img src={quoteIcon} alt="quote" />
              </div>
            </div>
          </SwiperSlide>

          {/* === Slide 5 === */}
          <SwiperSlide>
            <div className="ac-testimonial-item ul_li xb-border">
              <div className="xb-item--avatar">
                <img src={author3} alt="Miguel Torres" />
              </div>
              <div className="xb-item--holder">
                <p className="xb-item--content">
                  "Aivora’s powerful analytics give us deep insights into
                  customer needs. We’ve optimized our chatbot flows and seen
                  noticeable growth in conversions."
                </p>
                <div className="xb-item--author">
                  <h5 className="xb-item--name">Miguel Torres</h5>
                  <p className="xb-item--desig">Director - Finexa Capital</p>
                </div>
              </div>
              <div className="xb-item--quote">
                <img src={quoteIcon} alt="quote" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
