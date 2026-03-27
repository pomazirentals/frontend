import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

// ✅ Images
import bgImage from "../../images/bg/testimonial-bg.png";
import gifShape from "../../images/icon/animated-gif03.gif";
import avatar1 from "../../images/avatar/img01.jpg";
import avatar2 from "../../images/avatar/img02.jpg";
import avatar3 from "../../images/avatar/img03.jpg";
import avatar4 from "../../images/avatar/img04.jpg";
import avatar5 from "../../images/avatar/img05.jpg";

const testimonials = [
  {
    id: 1,
    source: "GoodFirms",
    rating: "5.0",
    content:
      '“We saw a big boost in engagement and sales with their recommendation engine. It personalizes the shopping experience perfectly.”',
    name: "Riya Mehta",
    designation: "Manager - Trendico",
    avatar: avatar1,
  },
  {
    id: 2,
    source: "Clutch",
    rating: "4.9",
    content:
      '“Their NLP tool saves us hours by extracting key info from large documents instantly. It’s fast, accurate, and a huge time-saver.”',
    name: "Miguel Torres",
    designation: "CEO & Funder - DocFlow",
    avatar: avatar2,
  },
  {
    id: 3,
    source: "Clutch",
    rating: "5.0",
    content:
      '“Their automation solutions saved us countless hours. Tasks that took days are now completed in minutes. The ROI was almost immediate.”',
    name: "Sebastian Clark",
    designation: "Manager - SwiftLogix",
    avatar: avatar3,
  },
  {
    id: 4,
    source: "GoodFirms",
    rating: "5.0",
    content:
      '“The AI chatbot they developed has transformed our customer service. We now handle 70% of queries with higher customer satisfaction!”',
    name: "Priya Ramirez",
    designation: "CEO - BrightNest",
    avatar: avatar4,
  },
  {
    id: 5,
    source: "Clutch",
    rating: "4.7",
    content:
      '“We gained deep insights into customer behavior and performance. Their analytics made our decision-making sharper and more confident.”',
    name: "Sebastian Clark",
    designation: "Director - Finexa Capital",
    avatar: avatar5,
  },
  {
    id: 6,
    source: "Clutch",
    rating: "5.0",
    content:
      '“Their automation solutions saved us countless hours. Tasks that took days are now completed in minutes. The ROI was almost immediate.”',
    name: "Sebastian Clark",
    designation: "Manager - SwiftLogix",
    avatar: avatar3,
  },
];

const TestimonialSection: React.FC = () => {
  useEffect(() => {
    const bgEl = document.querySelector<HTMLElement>(".testimonial.bg_img");
    if (bgEl) bgEl.style.backgroundImage = `url(${bgImage})`;
  }, []);

  return (
    <section className="testimonial pb-150 bg_img">
      <div className="container">
        <div className="sec-title sec-title-center tes-sec-title text-center mb-50">
          <span className="sub-title mb-15">Our Testimonial</span>
          <h2 className="title">
            Hear from our
            <img src={gifShape} alt="shape" /> happy customers
          </h2>
        </div>
      </div>

      <div className="xb-testimonial-slider">
        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={400}
          spaceBetween={30}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1700: { slidesPerView: 5 },
            1600: { slidesPerView: 4 },
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            576: { slidesPerView: 1 },
            0: { slidesPerView: 1 },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="xb-testimonial-item">
                <div className="xb-item--inner xb-border">
                  <ul className="xb-item--rating list-unstyled ul_li">
                    <li>
                      <i className="fa-solid fa-star-sharp"></i>
                    </li>
                    <li>{item.source}</li>
                    <li>{item.rating}</li>
                  </ul>
                  <p className="xb-item--content">{item.content}</p>
                  <div className="xb-item--author ul_li">
                    <div className="xb-item--avatar">
                      <img src={item.avatar} alt={item.name} />
                    </div>
                    <div className="xb-item--holder">
                      <h3 className="xb-item--name">{item.name}</h3>
                      <span className="xb-item--desig">{item.designation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialSection;
