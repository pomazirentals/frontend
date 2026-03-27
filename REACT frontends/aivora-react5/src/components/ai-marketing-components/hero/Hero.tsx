import React from "react";
import { Link } from "react-router-dom";

import gif1 from "../../../images/icon/b10c3e43e836d32554bf.gif";
import gif2 from "../../../images/icon/animated-gif02.gif";
import audience1 from "../../../images/hero/audience-img01.png";
import audience2 from "../../../images/hero/audience-img02.png";
import audience3 from "../../../images/hero/audience-img03.png";
import heroPoster from "../../../images/bg/hero-bg03_1.jpg";
import heroBg from "../../../images/bg/hero-bg03.jpg";

const HeroSection: React.FC = () => {
  return (
    <section
      className="hero ai-marketing-hero pos-rel bg_img"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-style hero-style--three sec-border pos-rel">
        <div className="container-fluid">
          <div className="hero-content hero-content--three">
            {/* Top Content */}
            <div
              className="xb-content-holder wow fadeInUp"
              data-wow-duration="600ms"
            >
              <h2 className="title">
                AI Marketing{" "}
                <img src={gif1} alt="animated gif" /> for Smarter Insights and
              </h2>
              <p className="sub-title">
                AI audience & media solutions for Global Brands to increase media
                Efficiency & ROI
              </p>
              <span className="hero-shape">
                <img src={gif2} alt="animated gif" />
              </span>
            </div>

            {/* Bottom Content */}
            <div
              className="hero-content-bottom ul_li_between wow fadeInUp"
              data-wow-delay="150ms"
              data-wow-duration="600ms"
            >
              <div className="xb-item--holder ul_li">
                <p className="xb-item--text">
                  Successfully <br /> <span>AI audience</span>
                </p>
                <div className="xb-item--audience ul_li">
                  <img src={audience1} alt="Audience 1" />
                  <img src={audience2} alt="Audience 2" />
                  <img src={audience3} alt="Audience 3" />
                </div>
              </div>

              <h2 className="title">Campaigns</h2>

              <Link to="/contact" className="ai-marketing-btn">
                <span className="arrow">
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
                </span>
                <span className="text">
                  <span>Book a Free Discovery Session</span>
                  <span>Book a Free Discovery Session</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Background Video */}
        <div className="background_video">
          <video
            className="responsive-video"
            src="https://www.pexels.com/download/video/32399073/"
            loop
            muted
            playsInline
            autoPlay
            poster={heroPoster}
          ></video>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
