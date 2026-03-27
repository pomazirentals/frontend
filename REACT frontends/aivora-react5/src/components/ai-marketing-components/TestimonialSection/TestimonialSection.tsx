import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay, EffectFade, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

// ✅ Import images
import testimonialImg01 from "../../../images/testimonial/testimonial-img01.jpg";
import testimonialImg02 from "../../../images/testimonial/testimonial-img02.jpg";
import testimonialImg03 from "../../../images/testimonial/testimonial-img03.jpg";
import testimonialImg04 from "../../../images/testimonial/testimonial-img04.jpg";

import brand01 from "../../../images/testimonial/brand.png";
import brand02 from "../../../images/testimonial/brand02.png";
import brand03 from "../../../images/testimonial/brand03.png";
import brand04 from "../../../images/testimonial/brand04.png";

import quoteIcon from "../../../images/icon/quote-icon.png";

const TestimonialSection: React.FC = () => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

    return (
        <section className="testimonial mt-30">
            <div className="container-fluid">
                <div className="ai-testimonial-wrapper pos-rel mlr-20 sec-border">
                    <div className="ai-testimonial-heading mt-100 mb-60">
                        <div className="sec-title-three">
                            <span className="sub-title">Testimonials</span>
                            <h2 className="title xb-text-reveal">
                                Hear from top brands who have worked with us
                            </h2>
                        </div>
                    </div>

                    <div className="ai-testimonial-inner pos-rel z-1">
                        {/* === Image Slider === */}
                        <Swiper
                            className="ai-testimonial-slider-img"
                            modules={[Navigation, Thumbs, Autoplay, EffectFade]}
                            loop={true}
                            spaceBetween={0}
                            slidesPerView={1}
                            effect="fade"
                            autoplay={{ delay: 6000, disableOnInteraction: false }}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                            thumbs={{ swiper: thumbsSwiper }}
                        >
                            {[testimonialImg01, testimonialImg02, testimonialImg03, testimonialImg04].map(
                                (img, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="ai-tes-img">
                                            <img src={img} alt={`testimonial-${i + 1}`} />
                                        </div>
                                    </SwiperSlide>
                                )
                            )}
                        </Swiper>

                        {/* === Text Slider (Nav) === */}
                        <Swiper
                            className="ai-testimonial-slider-nav"
                            modules={[FreeMode, Thumbs, EffectFade]}
                            onSwiper={setThumbsSwiper}
                            loop={true}
                            spaceBetween={0}
                            slidesPerView={1}
                            freeMode={true}
                            watchSlidesProgress={true}
                            allowTouchMove={true}
                            effect="fade"
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                576: { slidesPerView: 1 },
                                768: { slidesPerView: 1 },
                                992: { slidesPerView: 1 },
                            }}
                        >
                            {/* === Slide 1 === */}
                            <SwiperSlide>
                                <div className="ai-testimonial-item">
                                    <div className="xb-item--inner">
                                        <div className="xb-item--content">
                                            <div className="xb-item--quote">
                                                <img src={quoteIcon} alt="icon" />
                                            </div>
                                            <p className="xb-item--comment">
                                                "Working with this team transformed how we run campaigns.
                                                Their insights gave us clarity, and the results spoke for
                                                themselves — higher engagement and lower costs."
                                            </p>
                                            <div className="xb-item--holder">
                                                <p className="xb-item--name">
                                                    Sarah L. Marketing Director, Danone
                                                </p>
                                                <div className="xb-item--brand">
                                                    <img src={brand01} alt="logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* === Slide 2 === */}
                            <SwiperSlide>
                                <div className="ai-testimonial-item">
                                    <div className="xb-item--inner">
                                        <div className="xb-item--content">
                                            <div className="xb-item--quote">
                                                <img src={quoteIcon} alt="icon" />
                                            </div>
                                            <p className="xb-item--comment">
                                                "They understood our challenges from day one and delivered
                                                solutions that made a real difference. Our customer
                                                engagement improved dramatically."
                                            </p>
                                            <div className="xb-item--holder">
                                                <p className="xb-item--name">
                                                    James R., Founder, Dummy Shoes Co.
                                                </p>
                                                <div className="xb-item--brand">
                                                    <img src={brand02} alt="logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* === Slide 3 === */}
                            <SwiperSlide>
                                <div className="ai-testimonial-item">
                                    <div className="xb-item--inner">
                                        <div className="xb-item--content">
                                            <div className="xb-item--quote">
                                                <img src={quoteIcon} alt="icon" />
                                            </div>
                                            <p className="xb-item--comment">
                                                "Professional, innovative, and results-driven. Their approach
                                                helped us connect with our audience in ways we never thought
                                                possible."
                                            </p>
                                            <div className="xb-item--holder">
                                                <p className="xb-item--name">
                                                    Elena M., Brand Manager, Luxury Perfume Co.
                                                </p>
                                                <div className="xb-item--brand">
                                                    <img src={brand03} alt="logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* === Slide 4 === */}
                            <SwiperSlide>
                                <div className="ai-testimonial-item">
                                    <div className="xb-item--inner">
                                        <div className="xb-item--content">
                                            <div className="xb-item--quote">
                                                <img src={quoteIcon} alt="icon" />
                                            </div>
                                            <p className="xb-item--comment">
                                                "A true partner in every sense. Their data-driven solutions
                                                helped us streamline campaigns across multiple regions while
                                                keeping performance high."
                                            </p>
                                            <div className="xb-item--holder">
                                                <p className="xb-item--name">David K., Senior Strategist, IBM</p>
                                                <div className="xb-item--brand">
                                                    <img src={brand04} alt="logo" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>

                        {/* === Navigation Buttons === */}
                        <div className="ai-slide-btn">
                            <div className="swiper-button-next">
                                <svg
                                    width="12"
                                    height="28"
                                    viewBox="0 0 16 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="11.9302"
                                        y="12.4629"
                                        width="3.80516"
                                        height="3.83411"
                                        transform="rotate(-0.1709 11.9302 12.4629)"
                                        fill="black"
                                    />
                                    <rect
                                        x="0.84375"
                                        y="0.994141"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(-0.1709 0.84375 0.994141)"
                                        fill="black"
                                    />
                                    <rect
                                        x="4.68945"
                                        y="4.81592"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(-0.1709 4.68945 4.81592)"
                                        fill="black"
                                    />
                                    <rect
                                        x="8.53467"
                                        y="8.63818"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(-0.1709 8.53467 8.63818)"
                                        fill="black"
                                    />
                                    <rect
                                        x="8.55811"
                                        y="16.3066"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(-0.1709 8.55811 16.3066)"
                                        fill="black"
                                    />
                                    <rect
                                        x="4.7356"
                                        y="20.1533"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(-0.1709 4.7356 20.1533)"
                                        fill="black"
                                    />
                                    <rect
                                        x="0.912598"
                                        y="23.998"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(-0.1709 0.912598 23.998)"
                                        fill="black"
                                    />
                                </svg>
                            </div>

                            <div className="swiper-button-prev">
                                <svg
                                    width="12"
                                    height="28"
                                    viewBox="0 0 16 28"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect
                                        x="4.06995"
                                        y="15.5371"
                                        width="3.80516"
                                        height="3.83411"
                                        transform="rotate(179.829 4.06995 15.5371)"
                                        fill="black"
                                    />
                                    <rect
                                        x="15.1564"
                                        y="27.0059"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(179.829 15.1564 27.0059)"
                                        fill="black"
                                    />
                                    <rect
                                        x="11.3108"
                                        y="23.1841"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(179.829 11.3108 23.1841)"
                                        fill="black"
                                    />
                                    <rect
                                        x="7.46533"
                                        y="19.3618"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(179.829 7.46533 19.3618)"
                                        fill="black"
                                    />
                                    <rect
                                        x="7.44214"
                                        y="11.6934"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(179.829 7.44214 11.6934)"
                                        fill="black"
                                    />
                                    <rect
                                        x="11.2645"
                                        y="7.84668"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(179.829 11.2645 7.84668)"
                                        fill="black"
                                    />
                                    <rect
                                        x="15.0875"
                                        y="4.00195"
                                        width="3.83411"
                                        height="3.83411"
                                        transform="rotate(179.829 15.0875 4.00195)"
                                        fill="black"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
