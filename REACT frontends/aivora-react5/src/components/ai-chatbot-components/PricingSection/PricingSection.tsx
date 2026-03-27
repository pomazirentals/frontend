import React, { useEffect } from "react";

// ✅ Import all images
import bgImg from "../../../images/bg/pricing-bg.png";
import bgItemImg from "../../../images/bg/pricing-bg01.png";
import iconLeft from "../../../images/icon/sub-left-icon.png";
import iconRight from "../../../images/icon/sub-right-icon.png";
import moneyGif from "../../../images/icon/money-icegif-22-unscreen.gif";
import icon1 from "../../../images/icon/pricing-icon01.svg";
import icon2 from "../../../images/icon/pricing-icon02.svg";
import { Link } from "react-router-dom";

const PricingSection: React.FC = () => {
  useEffect(() => {
    // === PRICE TOGGLE LOGIC ===
    const toggleBtn = document.getElementById("price-toggle-btn");
    const time = document.getElementById("time");
    const dollarPrice = document.getElementById("dollar-price");

    if (!toggleBtn || !time || !dollarPrice) return;

    const handleToggle = () => {
      const isActive = toggleBtn.classList.toggle("active");

      if (isActive) {
        dollarPrice.textContent = dollarPrice.dataset.priceYear || "";
        time.textContent = time.dataset.timeYear || "";
      } else {
        dollarPrice.textContent = dollarPrice.dataset.priceMonth || "";
        time.textContent = time.dataset.timeMonth || "";
      }
    };

    toggleBtn.addEventListener("click", handleToggle);

    // Cleanup event
    return () => {
      toggleBtn.removeEventListener("click", handleToggle);
    };
  }, []);

  return (
    <section
      id="pricing"
      className="pricing pt-145 pb-150 bg_img"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="container">
        {/* === Section Title === */}
        <div className="sec-title sec-title--two pricing-sec-title text-center mb-30">
          <span className="sub-title wow fadeInUp" data-wow-duration="600ms">
            <img src={iconLeft} alt="icon" /> Pricing Plans{" "}
            <img src={iconRight} alt="icon" />
          </span>
          <h2
            className="title wow fadeInUp"
            data-wow-delay="150ms"
            data-wow-duration="600ms"
          >
            Simple & <img src={moneyGif} alt="shape" /> flexible pricing
          </h2>
        </div>

        <div className="row mt-none-30">
          {/* === Free Plan === */}
          <div className="col-lg-5 mt-30">
            <div
              className="pricing-item xb-border bg_img wow fadeInUp"
              data-wow-duration="600ms"
              style={{ backgroundImage: `url(${bgItemImg})` }}
            >
              <div className="xb-icon">
                <img src={icon1} alt="icon" />
              </div>
              <h2 className="xb-dollar">
                $0 <sub>/1-Month Trial</sub>
              </h2>

              <div className="pricing-btn mb-25">
                <Link className="thm-btn chatbot-btn" to="/contact">
                  <span className="text">get started free</span>
                  <span className="btn-bg">
                    <svg
                      width="800"
                      height="60"
                      viewBox="0 0 800 60"
                      fill="none"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="800"
                        height="60"
                        fill="url(#paint0_radial_2224_3388)"
                      />
                      <defs>
                        <radialGradient
                          id="paint0_radial_2224_3388"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#00FF97" />
                          <stop offset="1" stopColor="#00020F" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </span>
                </Link>
              </div>

              <ul className="pricing-list list-unstyled">
                {[
                  "Basic AI chatbot.",
                  "Up to 1,000 conversations/month.",
                  "Single language support.",
                  "Basic integrations (website widget only).",
                  "Standard response speed.",
                ].map((item, i) => (
                  <li key={i}>
                    <span>
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <span className="xb-tag xb-border">Free Plan</span>
            </div>
          </div>

          {/* === Premium Plan === */}
          <div className="col-lg-7 mt-30">
            <div
              className="pricing-item xb-border bg_img wow fadeInUp"
              data-wow-duration="600ms"
              style={{ backgroundImage: `url(${bgItemImg})` }}
            >
              <div className="xb-icon">
                <img src={icon2} alt="icon" />
              </div>

              <div className="ul_li_between">
                <h2 className="xb-dollar">
                  $
                  <span
                    id="dollar-price"
                    data-price-month="49"
                    data-price-year="529"
                  >
                    49
                  </span>
                  <sub
                    id="time"
                    data-time-month=" /Per-Month"
                    data-time-year=" /Per-Year"
                  >
                    /Per-Month
                  </sub>
                </h2>
                <div className="xb-price-chagne-btn">
                  <p>
                    Monthly{" "}
                    <span id="price-toggle-btn" className="toggle"></span> Yearly
                    10% off
                  </p>
                </div>
              </div>

              <div className="pricing-btn mb-25">
                <Link className="thm-btn chatbot-btn" to="/contact">
                  <span className="text">subscribe to pro</span>
                  <span className="btn-bg">
                    <svg
                      width="750"
                      height="60"
                      viewBox="0 0 750 60"
                      fill="none"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="750" height="60" fill="url(#paint0_radial_2224_3380)" />
                      <defs>
                        <radialGradient
                          id="paint0_radial_2224_3380"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0" stopColor="#00FF97" />
                          <stop offset="1" stopColor="#00020F" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </span>
                </Link>
              </div>

              <div className="pricing-list-wrap ul_li_between align-items-start">
                <ul className="pricing-list list-unstyled">
                  {[
                    "Everything in Free Plan +.",
                    "Unlimited conversations/month.",
                    "AI NLP training & smarter detection.",
                    "Priority customer support.",
                    "Multi-language chatbot (20+ languages).",
                  ].map((item, i) => (
                    <li key={i}>
                      <span>
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <ul className="pricing-list pricing-list--right list-unstyled">
                  {[
                    "Advanced analytics & conversation insights.",
                    "Integrations with WhatsApp, Messenger, Shopify, Zapier.",
                    "Enterprise-level security.",
                  ].map((item, i) => (
                    <li key={i}>
                      <span>
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="xb-tag premium-plan">Premium Plan</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ✅ SVG Check Icon
const CheckIcon: React.FC = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 21 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.1"
      d="M21 10.5C21 11.396 19.8993 12.1345 19.6787 12.9605C19.4513 13.8145 20.027 15.0045 19.5947 15.7517C19.1555 16.5112 17.8342 16.6022 17.2183 17.2183C16.6022 17.8342 16.5112 19.1555 15.7517 19.5947C15.0045 20.027 13.8145 19.4513 12.9605 19.6787C12.1345 19.8993 11.396 21 10.5 21C9.604 21 8.8655 19.8993 8.0395 19.6787C7.1855 19.4513 5.9955 20.027 5.24825 19.5947C4.48875 19.1555 4.39775 17.8342 3.78175 17.2183C3.16575 16.6022 1.8445 16.5112 1.40525 15.7517C0.973 15.0045 1.54875 13.8145 1.32125 12.9605C1.10075 12.1345 0 11.396 0 10.5C0 9.604 1.10075 8.8655 1.32125 8.0395C1.54875 7.1855 0.973 5.9955 1.40525 5.24825C1.8445 4.48875 3.16575 4.39775 3.78175 3.78175C4.39775 3.16575 4.48875 1.8445 5.24825 1.40525C5.9955 0.973 7.1855 1.54875 8.0395 1.32125C8.8655 1.10075 9.604 0 10.5 0C11.396 0 12.1345 1.10075 12.9605 1.32125C13.8145 1.54875 15.0045 0.973 15.7517 1.40525C16.5112 1.8445 16.6022 3.16575 17.2183 3.78175C17.8342 4.39775 19.1555 4.48875 19.5947 5.24825C20.027 5.9955 19.4513 7.1855 19.6787 8.0395C19.8993 8.8655 21 9.604 21 10.5Z"
      fill="#00FF97"
    />
    <path
      d="M13.5336 7.37076L9.53661 11.3678L7.46461 9.29751C7.01486 8.84776 6.28511 8.84776 5.83536 9.29751C5.38561 9.74726 5.38561 10.477 5.83536 10.9268L8.74211 13.8335C9.17961 14.271 9.89011 14.271 10.3276 13.8335L15.1611 9.00001C15.6109 8.55026 15.6109 7.82051 15.1611 7.37076C14.7114 6.92101 13.9834 6.92101 13.5336 7.37076Z"
      fill="#00FF97"
    />
  </svg>
);

export default PricingSection;
