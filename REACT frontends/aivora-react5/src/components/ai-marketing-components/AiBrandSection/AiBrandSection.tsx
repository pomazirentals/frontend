import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import gifIcon from "../../../images/icon/animated-gif02.gif";
import brand01 from "../../../images/brand/brand01.png";
import brand02 from "../../../images/brand/brand02.png";
import brand03 from "../../../images/brand/brand03.png";
import brand04 from "../../../images/brand/brand04.png";
import brand05 from "../../../images/brand/brand05.png";
import brand06 from "../../../images/brand/brand06.png";
import brand07 from "../../../images/brand/brand07.png";

const AiBrandSection: React.FC = () => {

  // === Brand Hover Animation ===
  useEffect(() => {
    const listItems = document.querySelectorAll<HTMLLIElement>(".ai-brand-list li");
    const logos = document.querySelectorAll<HTMLLIElement>(".ai-brand-logo li");

    let currentIndex = 0;

    const setActive = (index: number) => {
      listItems.forEach((li, i) => {
        li.classList.toggle("current", i === index);
        li.classList.toggle("mleave", i !== index);
      });
      logos.forEach((li, i) => {
        li.classList.toggle("active", i === index);
      });
      currentIndex = index;
    };

    listItems.forEach((li, index) => {
      li.addEventListener("mouseenter", () => setActive(index));
      li.addEventListener("click", () => setActive(index));
    });

    const listContainer = document.querySelector(".ai-brand-list");
    listContainer?.addEventListener("mouseleave", () => setActive(currentIndex));

    // Default activate first brand
    setActive(0);

    return () => {
      listItems.forEach((li) => {
        li.replaceWith(li.cloneNode(true));
      });
    };
  }, []);

  const ArrowIcon = () => (
    <svg
      width="16"
      height="28"
      viewBox="0 0 16 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="11.9299"
        y="12.4632"
        width="3.80516"
        height="3.83411"
        transform="rotate(-0.1709 11.9299 12.4632)"
        fill="black"
      />
      <rect
        x="0.843506"
        y="0.994343"
        width="3.83411"
        height="3.83411"
        transform="rotate(-0.1709 0.843506 0.994343)"
        fill="black"
      />
      <rect
        x="4.68921"
        y="4.81607"
        width="3.83411"
        height="3.83411"
        transform="rotate(-0.1709 4.68921 4.81607)"
        fill="black"
      />
      <rect
        x="8.53442"
        y="8.63861"
        width="3.83411"
        height="3.83411"
        transform="rotate(-0.1709 8.53442 8.63861)"
        fill="black"
      />
      <rect
        x="8.55786"
        y="16.3068"
        width="3.83411"
        height="3.83411"
        transform="rotate(-0.1709 8.55786 16.3068)"
        fill="black"
      />
      <rect
        x="4.73535"
        y="20.1535"
        width="3.83411"
        height="3.83411"
        transform="rotate(-0.1709 4.73535 20.1535)"
        fill="black"
      />
      <rect
        x="0.912354"
        y="23.9985"
        width="3.83411"
        height="3.83411"
        transform="rotate(-0.1709 0.912354 23.9985)"
        fill="black"
      />
    </svg>
  );

  const brandNames = [
    "Nestlé",
    "Danone",
    "Kellogg's",
    "Diageo",
    "Johnson & Johnson",
    "Reckitt",
    "Coca-Cola",
  ];

  const brandLogos = [
    brand01,
    brand02,
    brand03,
    brand04,
    brand05,
    brand06,
    brand07,
  ];

  return (
    <section className="brand mt-80">
      <div className="container-fluid">
        <div className="sec-border mlr-20">
          <div className="ai-brand-heading mt-45 mb-60 ul_li_between">
            <div className="sec-title-three">
              <span className="sub-title mb-25">Trusted by Leading Brands</span>
              <h2 className="title xb-text-reveal">
                Proud to Work with the World’s Most Recognized Brands
              </h2>
            </div>
            <div className="shape">
              <img src={gifIcon} alt="icon" />
            </div>
          </div>

          <div className="ai-brand-wrap pos-rel">
            <div className="ai-brand-content">
              <p className="content">
                Our AI-powered solutions address critical pain points that global brands face today.
              </p>

              <div className="ai-brand-inner ul_li align-items-start">
                {/* === Brand Names === */}
                <ul className="ai-brand-list list-unstyled">
                  {brandNames.map((name, index) => (
                    <li key={index} className={index === 0 ? "current" : ""}>
                      <Link to="/service-details">
                        <span>{name}</span>
                        <svg
                          width="10"
                          height="12"
                          viewBox="0 0 10 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.53033 6.53033C9.82322 6.23744 9.82322 5.76256 9.53033 5.46967L4.75736 0.6967C4.46447 0.403806 3.98959 0.403806 3.6967 0.696699C3.40381 0.989593 3.40381 1.46447 3.6967 1.75736L7.93934 6L3.6967 10.2426C3.40381 10.5355 3.40381 11.0104 3.6967 11.3033C3.98959 11.5962 4.46447 11.5962 4.75736 11.3033L9.53033 6.53033ZM0 6L0 6.75L9 6.75L9 6L9 5.25L0 5.25L0 6Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* === Brand Logos === */}
                <ul className="ai-brand-logo list-unstyled text-center">
                  {brandLogos.map((logo, index) => (
                    <li key={index} className={index === 0 ? "active" : ""}>
                      <img src={logo} alt="logo" />
                    </li>
                  ))}
                </ul>
              </div>

              <p className="content">
                Want to be one of our successful clients? Let’s begin.
              </p>

              <Link to="/contact" className="ai-marketing-btn mt-30">
                <span className="arrow">
                  <ArrowIcon />
                </span>
                <span className="text">
                  <span>Book a Free Discovery Session</span>
                  <span>Book a Free Discovery Session</span>
                </span>
              </Link>
            </div>

            {/* === Background Video === */}
            <div className="background_video">
              <video
                className="responsive-video"
                src="https://www.pexels.com/download/video/28425784/"
                loop
                muted
                playsInline
                autoPlay
                poster="assets/img/bg/brand-bg.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiBrandSection;
