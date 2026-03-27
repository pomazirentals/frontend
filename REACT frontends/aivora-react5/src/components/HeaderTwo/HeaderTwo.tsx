import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo/logo-two.svg";
import MobileMenu from "../MobileMenu/MobileMenu";
import MegaMenu1 from "../Header/MegaMenu1";
import MegaMenuServices from "../Header/MegaMenu2";
import { tenantConfig } from "../../config/tenantConfig";


const HeaderTwo: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const lastScrollY = useRef<number>(0);

  // Scroll behavior: sticky appears on scroll-up, hides on scroll-down
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Scroll up — smooth show
      if (currentScroll < lastScrollY.current && currentScroll > 100) {
        setIsSticky(true);
        setTimeout(() => setIsVisible(true), 10);
      }
      // Scroll down — instant hide
      else if (currentScroll > lastScrollY.current) {
        setIsVisible(false);
        setTimeout(() => setIsSticky(false), 100);
      }

      // Reset near top
      if (currentScroll <= 100) {
        setIsSticky(false);
        setIsVisible(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="xb-header-area"
      className="header-area header-style--two header-style--three header-transparent is-sticky"
    >
      <div
        className={`xb-header stricky ${isSticky ? "xb-header-area-sticky" : ""
          } ${isVisible ? "xb-header-fixed" : "xb-header-hidden"}`}
      >
        <div className="container-fluid plr-30">
          <div className="header__wrap ul_li_between">
            {/* ===== Logo ===== */}
            <div className="xb-header-logo">
              <Link to="/" className="logo1">
                <img src={logo} alt="Aivora Logo" />
              </Link>
            </div>

            {/* ===== Main Navigation ===== */}
            <div className="main-menu__wrap navbar navbar-expand-lg p-0">
              <nav className="main-menu collapse navbar-collapse">
                <ul>
                  <li className="menu-item-has-children active">
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                    <ul className="submenu">
                      <li>
                        <Link to="/">
                          <span>Ai Agency</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/ai-marketing">
                          <span>Ai Marketing</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/ai-chatbot">
                          <span>Ai Chatbot</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <Link to="/about">
                      <span>About Us</span>
                    </Link>
                  </li>

                  {/* Pages */}
                  <li className="menu-item-has-children megamenu">
                    <Link to="#">
                      <span>Pages</span>
                    </Link>
                    <MegaMenu1 />
                  </li>

                  {/* Services */}
                  <li className="menu-item-has-children megamenu">
                    <Link to="#">
                      <span>Services</span>
                    </Link>
                    <MegaMenuServices />
                  </li>

                  {/* Blog */}
                  <li className="menu-item-has-children">
                    <Link to="/blog">
                      <span>Blog</span>
                    </Link>
                    <ul className="submenu">
                      <li>
                        <Link to="/blog">
                          <span>Blog</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/blog-details">
                          <span>Blog Details</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a href={tenantConfig.contact_url}>
                      <span>Contact Us</span>
                    </a>
                  </li>
                <li>
                    <a href={tenantConfig.login_url}>
                      <span>Login</span>
                    </a>
                  </li>
                  <li>
                    <a href={tenantConfig.register_url}>
                      <span>Register</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* ===== Right Section ===== */}
            <div className="header-right">
              <a className="ai-marketing-btn" href={tenantConfig.contact_url}>
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
              </a>
            </div>

            {/* ===== Mobile Toggle ===== */}
            <div className="header-bar-mobile side-menu d-lg-none">
              <button
                className="xb-nav-mobile"
                onClick={() => setMobileActive(!mobileActive)}
              >
                <i className="far fa-bars"></i>
              </button>
            </div>
          </div>

          {/* ===== Mobile Menu ===== */}
          <div className="xb-header-wrap">
            <div className={`xb-header-menu ${mobileActive ? "active" : ""}`}>
              <div className="xb-header-menu-scroll">
                <div
                  className="xb-menu-close xb-hide-xl xb-close"
                  onClick={() => setMobileActive(false)}
                ></div>
                <div className="xb-logo-mobile xb-hide-xl">
                  <Link to="/" rel="home">
                    <img src={logo} alt="Aivora Logo" />
                  </Link>
                </div>
                <div className="xb-header-mobile-search xb-hide-xl">
                  <form role="search" onSubmit={(e) => e.preventDefault()}>
                    <input
                      type="text"
                      placeholder="Search..."
                      name="s"
                      className="search-field"
                    />
                    <button className="search-submit" type="submit">
                      <i className="far fa-search"></i>
                    </button>
                  </form>
                </div>
                <nav className="xb-header-nav">
                  <MobileMenu />
                </nav>
              </div>
            </div>
            <div className="xb-header-menu-backdrop"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderTwo;
