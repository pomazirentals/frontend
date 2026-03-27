import React from "react";
import ctaBg from "../../../images/bg/cta-bg.jpg";
import subLeftIcon from "../../../images/icon/sub-left-icon.png";

const CTASection: React.FC = () => {
  return (
    <section
      className="cta pb-150 bg_img"
      style={{ backgroundImage: `url(${ctaBg})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="sec-title sec-title--two process-title">
              <span
                className="sub-title d-block mb-25 wow fadeInUp"
                data-wow-duration="600ms"
              >
                <img src={subLeftIcon} alt="icon" />
                Save hours with AI chatbot
              </span>

              <h2
                className="title wow fadeInUp"
                data-wow-delay="150ms"
                data-wow-duration="600ms"
              >
                Stop wasting time on support
              </h2>
            </div>

            {/* ✅ CTA Button */}
            <div
              className="cta-btn mt-40 wow fadeInUp"
              data-wow-duration="600ms"
            >
              <a className="thm-btn chatbot-btn" href="/contact">
                build your ai chatbot – it’s free
                <span className="arrow-icon">
                  {/* Arrow SVG (left) */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5.06592"
                      y="19.9785"
                      width="20.5712"
                      height="2.61221"
                      transform="rotate(-40.2798 5.06592 19.9785)"
                      fill="white"
                    />
                    <rect
                      x="7.97095"
                      y="7.24463"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 7.97095 7.24463)"
                      fill="white"
                    />
                    <rect
                      x="11.6523"
                      y="7.54834"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 11.6523 7.54834)"
                      fill="white"
                    />
                    <rect
                      x="15.334"
                      y="7.85205"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 15.334 7.85205)"
                      fill="white"
                    />
                    <rect
                      x="18.7119"
                      y="11.8374"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 18.7119 11.8374)"
                      fill="white"
                    />
                    <rect
                      x="18.4084"
                      y="15.52"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 18.4084 15.52)"
                      fill="white"
                    />
                    <rect
                      x="18.104"
                      y="19.2012"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 18.104 19.2012)"
                      fill="white"
                    />
                  </svg>

                  {/* Arrow SVG (right) */}
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="5.06592"
                      y="19.9785"
                      width="20.5712"
                      height="2.61221"
                      transform="rotate(-40.2798 5.06592 19.9785)"
                      fill="white"
                    />
                    <rect
                      x="7.97095"
                      y="7.24463"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 7.97095 7.24463)"
                      fill="white"
                    />
                    <rect
                      x="11.6523"
                      y="7.54834"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 11.6523 7.54834)"
                      fill="white"
                    />
                    <rect
                      x="15.334"
                      y="7.85205"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 15.334 7.85205)"
                      fill="white"
                    />
                    <rect
                      x="18.7119"
                      y="11.8374"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 18.7119 11.8374)"
                      fill="white"
                    />
                    <rect
                      x="18.4084"
                      y="15.52"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 18.4084 15.52)"
                      fill="white"
                    />
                    <rect
                      x="18.104"
                      y="19.2012"
                      width="2.61221"
                      height="2.61221"
                      transform="rotate(-40.2798 18.104 19.2012)"
                      fill="white"
                    />
                  </svg>
                </span>

                {/* Background Shape */}
                <span className="btn-bg">
                  <svg
                    width="750"
                    height="60"
                    viewBox="0 0 750 60"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="750"
                      height="60"
                      fill="url(#paint0_radial_2224_33833)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_2224_33833"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#00FF97" />
                        <stop
                          offset="1"
                          stopColor="#00020F"
                          stopOpacity="0"
                        />
                      </radialGradient>
                    </defs>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
