import React from "react";
import { Link } from "react-router-dom";

// ✅ Import images
import bgImg from "../../../images/bg/custom-bg.jpg";
import subLeftIcon from "../../../images/icon/sub-left-icon.png";
import aiGif from "../../../images/icon/artificial-intelligence-11761.gif";
import featureImg01 from "../../../images/feature/feature-img03.png";
import featureLogo from "../../../images/feature/logo.png";
import featureImg02 from "../../../images/feature/feature-img02.png";
import scanImg from "../../../images/feature/scan.png";
import featureImg03 from "../../../images/feature/feature-img04.png";
import circleImg from "../../../images/feature/circle.png";
import featureImg04 from "../../../images/feature/feature-img05.png";
import featureImg05 from "../../../images/feature/feature-img06.png";
import securityImg from "../../../images/feature/security.png";
import BrandSection from "./BrandSection";

const FeatureSection: React.FC = () => {
  return (
    <div
      className="bg_img"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* === Feature Section === */}
      <section id="features" className="feature pb-155">
        <div className="container">
          <div className="sec-title sec-title--two custom-sec-title feature-sec-title text-center mb-45">
            <span className="sub-title">
              <img src={subLeftIcon} alt="icon" /> Aivora AI Chatbot Features
            </span>
            <h2 className="title">
              <span>
                <img src={aiGif} alt="AI Animation" />
              </span>
              Build the perfect customer-facing AI agent
            </h2>

            <div className="xb-heading-btn d-inline">
              <Link className="thm-btn chatbot-btn" to="/contact">
                build your ai chatbot - it’s free
                <span className="arrow-icon">
                  {[...Array(2)].map((_, i) => (
                    <svg
                      key={i}
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
                  ))}
                </span>
                <span className="btn-bg">
                  <svg
                    width="484"
                    height="60"
                    viewBox="0 0 484 60"
                    fill="none"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="484"
                      height="60"
                      fill="url(#paint0_radial_2224_3385)"
                    />
                    <defs>
                      <radialGradient
                        id="paint0_radial_2224_3385"
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
              </Link>
            </div>
          </div>

          {/* === Features Grid === */}
          <div className="row mt-none-30">
            {/* Big Feature */}
            <div className="col-lg-8 mt-30">
              <div className="xb-feature-item-3 big-item">
                <div className="xb-item--inner xb-border">
                  <div className="xb-img">
                    <img src={featureImg01} alt="Automate feature" />
                    <span className="logo">
                      <img src={featureLogo} alt="logo" />
                    </span>
                  </div>
                  <div className="xb-item--holder">
                    <h2 className="xb-item--title">Automate with smart chatbot</h2>
                    <p className="xb-item--content">
                      Handle customer queries instantly, reduce repetitive manual tasks,
                      and boost satisfaction with 24/7 AI-powered chatbot automation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Smaller Features */}
            <div className="col-lg-4 col-md-6 mt-30 order-lg-first">
              <div className="xb-feature-item-3">
                <div className="xb-item--inner xb-border">
                  <div className="xb-img">
                    <img src={featureImg02} alt="Sync Data" />
                    <span className="scan-img updown-2">
                      <img src={scanImg} alt="scan" />
                    </span>
                  </div>
                  <div className="xb-item--holder">
                    <h2 className="xb-item--title">Sync with real-time data</h2>
                    <p className="xb-item--content">
                      Make faster, data-driven decisions powered by real-time AI analysis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mt-30">
              <div className="xb-feature-item-3">
                <div className="xb-item--inner xb-border">
                  <div className="xb-img">
                    <img src={featureImg03} alt="Multilingual" />
                    <span className="circle">
                      <img src={circleImg} alt="circle" />
                    </span>
                  </div>
                  <div className="xb-item--holder">
                    <h2 className="xb-item--title">Multilingual support</h2>
                    <p className="xb-item--content">
                      Connect globally with customers in their preferred language.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mt-30">
              <div className="xb-feature-item-3">
                <div className="xb-item--inner xb-border">
                  <div className="xb-img">
                    <img src={featureImg04} alt="Advanced Reporting" />
                  </div>
                  <div className="xb-item--holder">
                    <h2 className="xb-item--title">Advanced reporting</h2>
                    <p className="xb-item--content">
                      Gain insights and metrics to make data-backed business decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mt-30">
              <div className="xb-feature-item-3">
                <div className="xb-item--inner xb-border">
                  <div className="xb-img">
                    <img src={featureImg05} alt="Security" />
                    <span className="security">
                      <img src={securityImg} alt="security" />
                    </span>
                    <span className="animated-dot">
                      <span className="dot">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}></span>
                        ))}
                      </span>
                    </span>
                  </div>
                  <div className="xb-item--holder">
                    <h2 className="xb-item--title">Data privacy & security</h2>
                    <p className="xb-item--content">
                      Keep your customer data protected at all times with enterprise-grade security.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Brand Section === */}
      <BrandSection/>
    </div>
  );
};

export default FeatureSection;
