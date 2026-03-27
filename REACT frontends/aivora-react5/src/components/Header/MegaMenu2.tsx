import React from "react";
import { Link } from "react-router-dom";

// Adjust these imports based on your image folder
import m05 from "../../images/icon/m_05.svg";
import serviceImg from "../../images/service/img21.png";

const MegaMenuServices: React.FC = () => {
  return (
    <ul className="submenu">
      <li>
        <div className="mega_menu_wrapper">
          <div className="container-fluid p-0">
            <div className="mega_menu_wrapper_inner megamenu_widget_wrapper">
              <div className="row justify-content-lg-between">
                {/* ---------- Left Main Column ---------- */}
                <div className="col-xl-9 col-lg-8">
                  <div className="mega_menu_box">
                    <div className="megamenu_widget_inner">
                      <div className="row">
                        {/* Column 1 */}
                        <div className="col-xl-4 col-lg-6 megamenu-col">
                          <div className="megamenu_widget">
                            <ul className="icon_list unordered_list_block">
                              {[
                                "AI saas product.",
                                "Data and intelligence.",
                                "AI for E-commerce.",
                                "AI consulting.",
                              ].map((text, index) => (
                                <li key={index}>
                                  <Link to="/service-details">
                                    <span className="icon_list_text">
                                      {text}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="col-xl-8 col-lg-6 megamenu-col">
                          <div className="megamenu_widget">
                            <ul className="icon_list unordered_list_block">
                              {[
                                "AI chatbot virtual.",
                                "AI - marketing.",
                                "Machine learning.",
                                "AI integration.",
                              ].map((text, index) => (
                                <li key={index}>
                                  <Link to="/service-details">
                                    <span className="icon_list_text">
                                      {text}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ---------- Social + Service Link ---------- */}
                    <div className="social_area">
                      <div className="row mt-none-30 align-items-center">
                        <div className="col-xl-4 mt-30">
                          <div className="social_inner ul_li">
                            <span>Follow Us:</span>
                            <ul className="social_icons_list unordered_list">
                              <li>
                                <a href="#!">
                                  <i className="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <i className="fab fa-linkedin-in"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.6774 7.62177L17.2342 0H15.6805L9.98719 6.61788L5.43998 0H0.195312L7.07159 10.0074L0.195312 18H1.74916L7.76141 11.0113L12.5636 18H17.8083L10.677 7.62177H10.6774ZM8.54921 10.0956L7.8525 9.09906L2.30903 1.16971H4.69564L9.16929 7.56895L9.866 8.56546L15.6812 16.8835H13.2946L8.54921 10.096V10.0956Z"
                                      fill="#FFF"
                                    />
                                  </svg>
                                </a>
                              </li>
                              <li>
                                <a href="#!">
                                  <i className="fab fa-dribbble"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Service Link */}
                        <div className="col-xl-8 mt-30">
                          <div className="service_link">
                            <div className="xb-item--inner">
                              <div className="xb-item--holder ul_li">
                                <span className="xb-item--icon">
                                  <img src={m05} alt="icon" />
                                </span>
                                <h3 className="xb-item--title">
                                  <Link to="/contact">
                                    Need any custom AI services.
                                  </Link>
                                </h3>
                              </div>
                              <p className="xb-item--text">
                                Discover our core offerings.
                              </p>
                            </div>

                            <Link to="/contact" className="xb-item--btn">
                              {/* First SVG */}
                              <svg
                                width="31"
                                height="31"
                                viewBox="0 0 31 31"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="6.29297"
                                  y="21.4106"
                                  width="22.36"
                                  height="2.83936"
                                  transform="rotate(-40.2798 6.29297 21.4106)"
                                  fill="white"
                                />
                                <rect
                                  x="9.44922"
                                  y="7.56982"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 9.44922 7.56982)"
                                  fill="white"
                                />
                                <rect
                                  x="13.4492"
                                  y="7.89941"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 13.4492 7.89941)"
                                  fill="white"
                                />
                                <rect
                                  x="17.4492"
                                  y="8.23047"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 17.4492 8.23047)"
                                  fill="white"
                                />
                                <rect
                                  x="21.1211"
                                  y="12.562"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 21.1211 12.562)"
                                  fill="white"
                                />
                                <rect
                                  x="20.7969"
                                  y="16.5645"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 20.7969 16.5645)"
                                  fill="white"
                                />
                                <rect
                                  x="20.4648"
                                  y="20.5664"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 20.4648 20.5664)"
                                  fill="white"
                                />
                              </svg>

                              {/* Second SVG */}
                              <svg
                                width="31"
                                height="31"
                                viewBox="0 0 31 31"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="6.29297"
                                  y="21.4106"
                                  width="22.36"
                                  height="2.83936"
                                  transform="rotate(-40.2798 6.29297 21.4106)"
                                  fill="white"
                                />
                                <rect
                                  x="9.44922"
                                  y="7.56982"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 9.44922 7.56982)"
                                  fill="white"
                                />
                                <rect
                                  x="13.4492"
                                  y="7.89941"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 13.4492 7.89941)"
                                  fill="white"
                                />
                                <rect
                                  x="17.4492"
                                  y="8.23047"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 17.4492 8.23047)"
                                  fill="white"
                                />
                                <rect
                                  x="21.1211"
                                  y="12.562"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 21.1211 12.562)"
                                  fill="white"
                                />
                                <rect
                                  x="20.7969"
                                  y="16.5645"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 20.7969 16.5645)"
                                  fill="white"
                                />
                                <rect
                                  x="20.4648"
                                  y="20.5664"
                                  width="2.83936"
                                  height="2.83936"
                                  transform="rotate(-40.2798 20.4648 20.5664)"
                                  fill="white"
                                />
                              </svg>
                            </Link>

                            <Link to="/contact" className="xb-overlay"></Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---------- Right Image Column ---------- */}
                <div className="col-xl-3 col-lg-4">
                  <div className="megamenu_case">
                    <div className="xb-item--inner">
                      <div className="xb-item--img">
                        <img src={serviceImg} alt="AI Service" />
                      </div>
                      <div className="xb-item--holder">
                        <h3 className="xb-item--title">General AI projects..</h3>
                        <p className="xb-item--text">
                          We deliver AI solutions that streamline operations and
                          boost efficiency.
                        </p>
                        <Link className="thm-btn agency-btn megamenu-btn" to="/project">
                          <span className="text">read more project</span>
                          <span className="arrow">
                            <span className="arrow-icon">
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="5.22852"
                                  y="17.3296"
                                  width="17.888"
                                  height="2.27149"
                                  transform="rotate(-40.2798 5.22852 17.3296)"
                                  fill="white"
                                />
                                <rect
                                  x="7.75781"
                                  y="6.25635"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 7.75781 6.25635)"
                                  fill="white"
                                />
                                <rect
                                  x="10.959"
                                  y="6.52002"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 10.959 6.52002)"
                                  fill="white"
                                />
                                <rect
                                  x="14.1562"
                                  y="6.78516"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 14.1562 6.78516)"
                                  fill="white"
                                />
                                <rect
                                  x="17.0957"
                                  y="10.25"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 17.0957 10.25)"
                                  fill="white"
                                />
                                <rect
                                  x="16.832"
                                  y="13.4517"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 16.832 13.4517)"
                                  fill="white"
                                />
                                <rect
                                  x="16.5684"
                                  y="16.6538"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 16.5684 16.6538)"
                                  fill="white"
                                />
                              </svg>

                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="5.22852"
                                  y="17.3296"
                                  width="17.888"
                                  height="2.27149"
                                  transform="rotate(-40.2798 5.22852 17.3296)"
                                  fill="white"
                                />
                                <rect
                                  x="7.75781"
                                  y="6.25635"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 7.75781 6.25635)"
                                  fill="white"
                                />
                                <rect
                                  x="10.959"
                                  y="6.52002"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 10.959 6.52002)"
                                  fill="white"
                                />
                                <rect
                                  x="14.1562"
                                  y="6.78516"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 14.1562 6.78516)"
                                  fill="white"
                                />
                                <rect
                                  x="17.0957"
                                  y="10.25"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 17.0957 10.25)"
                                  fill="white"
                                />
                                <rect
                                  x="16.832"
                                  y="13.4517"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 16.832 13.4517)"
                                  fill="white"
                                />
                                <rect
                                  x="16.5684"
                                  y="16.6538"
                                  width="2.27149"
                                  height="2.27149"
                                  transform="rotate(-40.2798 16.5684 16.6538)"
                                  fill="white"
                                />
                              </svg>
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ---------- END Right Column ---------- */}
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default MegaMenuServices;
