import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import aboutImg from "../../../images/about/img09.png";
import downArrow from "../../../images/icon/down-white-icon.svg";

// ✅ Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

const AboutSection: React.FC = () => {

  // === Smooth Scroll with GSAP ===
  useEffect(() => {
    const scrollLinks = document.querySelectorAll<HTMLAnchorElement>(
      "a.scrollspy-btn[href^='#']"
    );

    const handleScroll = (e: Event) => {
      e.preventDefault();
      const link = e.currentTarget as HTMLAnchorElement;
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
    };

    scrollLinks.forEach((link) => link.addEventListener("click", handleScroll));

    return () => {
      scrollLinks.forEach((link) =>
        link.removeEventListener("click", handleScroll)
      );
    };
  }, []);
  return (
    <section className="about o-clip pos-rel">
      <div className="container-fluid">
        <div className="ai-about-wrap mlr-20">
          <div className="ai-about-inner">
            <div className="sec-title-three">
              <span className="sub-title">What do we do</span>
              <h2 className="title xb-text-reveal">
                We provide AI Marketing Solutions to get better audience insight
                and optimize your media campaigns
              </h2>
            </div>

            <div className="ai-about-bottom ul_li">
              <p>
                Unlock deeper audience insights and optimize every step of your
                media strategy with AI-driven marketing.
              </p>
              <Link className="ai-marketing-btn" to="/contact">
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

            <a href="#service" className="down-arrow scrollspy-btn">
              <img src={downArrow} alt="icon" /> Scroll Down
            </a>
          </div>

          <div className="ai-circle-img">
            <img src={aboutImg} alt="About" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
