import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import logo from "../../images/logo/logo.svg";
import { tenantConfig } from "../../config/tenantConfig";


gsap.registerPlugin(ScrollToPlugin);

const HeaderThree: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Scroll up → show header smoothly
      if (currentScroll < lastScrollY.current && currentScroll > 100) {
        setIsSticky(true);
        setTimeout(() => setIsVisible(true), 10);
      }
      // Scroll down → hide header instantly
      else if (currentScroll > lastScrollY.current) {
        setIsVisible(false);
        setTimeout(() => setIsSticky(false), 150);
      }

      // Near top → reset
      if (currentScroll <= 100) {
        setIsSticky(false);
        setIsVisible(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === Smooth Scroll with GSAP ===
  useEffect(() => {
    const scrollLinks = document.querySelectorAll<HTMLAnchorElement>(
      "a.scrollspy-btn[href^='#']"
    );

    scrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        if (!targetId) return;
        const target = document.querySelector(targetId);
        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: target, offsetY: 80 },
            ease: "power2.out",
          });
        }
        setMenuOpen(false);
      });
    });

    return () => {
      scrollLinks.forEach((link) =>
        link.removeEventListener("click", () => { })
      );
    };
  }, []);

  return (
    <header id="xb-header-area" className="header-area header-style--two header-transparent">
      <div
        className={`xb-header stricky ${isSticky ? "xb-header-area-sticky" : ""
          } ${isVisible ? "xb-header-fixed" : "xb-header-hidden"}`}
      >
        <div className="container">
          <div className="header__wrap xb-border ul_li_between">
            {/* === Logo === */}
            <div className="xb-header-logo">
              <Link to="/" className="logo1">
                <img src={logo} alt="Aivora Logo" />
              </Link>
            </div>

            {/* === Desktop Menu === */}
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
                          <span>AI Agency</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/ai-marketing">
                          <span>AI Marketing</span>
                        </Link>
                      </li>
                      <li className="active">
                        <Link to="/ai-chatbot">
                          <span>AI Chatbot</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#features">
                      <span>Features</span>
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#process">
                      <span>Process</span>
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#integration">
                      <span>Integration</span>
                    </a>
                  </li>
                  <li>
                    <a className="scrollspy-btn" href="#pricing">
                      <span>Pricing</span>
                    </a>
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

            {/* === Header Right === */}
            <div className="header-right ul_li">
              <div className="header-btn">
                <div className="header-btn">
                  <a className="thm-btn chatbot-btn" href={tenantConfig.contact_url}>
                    Contact Us
                    <span className="rotate-icon">
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="3.54883"
                          y="13.0542"
                          width="13.815"
                          height="1.75429"
                          transform="rotate(-40.2798 3.54883 13.0542)"
                          fill="white"
                        />
                        <rect
                          x="5.49902"
                          y="4.50244"
                          width="1.75429"
                          height="1.75429"
                          transform="rotate(-40.2798 5.49902 4.50244)"
                          fill="white"
                        />
                        <rect
                          x="7.97168"
                          y="4.70605"
                          width="1.75429"
                          height="1.75429"
                          transform="rotate(-40.2798 7.97168 4.70605)"
                          fill="white"
                        />
                        <rect
                          x="10.4434"
                          y="4.91016"
                          width="1.75429"
                          height="1.75429"
                          transform="rotate(-40.2798 10.4434 4.91016)"
                          fill="white"
                        />
                        <rect
                          x="12.7129"
                          y="7.58691"
                          width="1.75429"
                          height="1.75429"
                          transform="rotate(-40.2798 12.7129 7.58691)"
                          fill="white"
                        />
                        <rect
                          x="12.5088"
                          y="10.0596"
                          width="1.75429"
                          height="1.75429"
                          transform="rotate(-40.2798 12.5088 10.0596)"
                          fill="white"
                        />
                        <rect
                          x="12.3047"
                          y="12.5317"
                          width="1.75429"
                          height="1.75429"
                          transform="rotate(-40.2798 12.3047 12.5317)"
                          fill="white"
                        />
                      </svg>
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
                        <rect width="484" height="60" fill="url(#paint0_radial_2224_3383)" />
                        <defs>
                          <radialGradient
                            id="paint0_radial_2224_3383"
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
                  </a>
                </div>
              </div>
            </div>

            {/* === Mobile Menu Icon === */}
            <div className="header-bar-mobile side-menu d-lg-none">
              <button
                className={`xb-nav-mobile ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <i className={menuOpen ? "far fa-times" : "far fa-bars"}></i>
              </button>
            </div>
          </div>

          {/* === Mobile Menu === */}
          <div className="xb-header-wrap">
            <div className={`xb-header-menu ${menuOpen ? "active" : ""}`}>
              <div className="xb-header-menu-scroll">
                <div
                  className="xb-menu-close xb-hide-xl xb-close"
                  onClick={() => setMenuOpen(false)}
                ></div>

                <div className="xb-logo-mobile xb-hide-xl">
                  <Link to="/" rel="home">
                    <img src={logo} alt="Aivora Logo" />
                  </Link>
                </div>

                <nav className="xb-header-nav">
                  <ul className="xb-menu-primary clearfix">
                    <li>
                      <a className="scrollspy-btn" href="#features">
                        <span>Features</span>
                      </a>
                    </li>
                    <li>
                      <a className="scrollspy-btn" href="#process">
                        <span>Process</span>
                      </a>
                    </li>
                    <li>
                      <a className="scrollspy-btn" href="#integration">
                        <span>Integration</span>
                      </a>
                    </li>
                    <li>
                      <a className="scrollspy-btn" href="#pricing">
                        <span>Pricing</span>
                      </a>
                    </li>
                    <li>
                      <a href={tenantConfig.contact_url}>
                        <span>Contact Us</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* === Backdrop === */}
            <div
              className="xb-header-menu-backdrop"
              onClick={() => setMenuOpen(false)}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderThree;
