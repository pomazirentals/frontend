import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// ✅ Import images
import footerBg from "../../../images/bg/footer-bg02.png";
import diamondIcon from "../../../images/icon/diamond-icon02.gif";
import { Link } from "react-router-dom";

// ✅ Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);


const Footer: React.FC = () => {
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

    // === Newsletter Submit Handler ===
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Newsletter form submitted!");
    };

    return (
        <footer
            className="footer pos-rel z-1 pt-80 bg_img"
            style={{ backgroundImage: `url(${footerBg})` }}
        >
            <div className="ac-footer-wrap xb-border mxw-1650 m-0 m-auto wow fadeInUp" data-wow-duration="600ms">
                <div className="container">
                    <div className="pos-rel z-1">
                        {/* === Footer Nav === */}
                        <ul className="ac-footer-nav list-unstyled ul_li">
                            <li><a className="scrollspy-btn" href="#features">Features</a></li>
                            <li><a className="scrollspy-btn" href="#process">Process</a></li>
                            <li><a className="scrollspy-btn" href="#integration">Integration</a></li>
                            <li><a className="scrollspy-btn" href="#pricing">Pricing</a></li>
                            <li><a className="scrollspy-btn" href="#faq">Faq’s</a></li>
                            <li><Link to="/contact">Contact us</Link></li>
                        </ul>

                        <div className="xb-footer-inner">
                            <div className="row g-0">
                                {/* === Social Media === */}
                                <div className="col-lg-3 col-md-5 footer-col">
                                    <div className="xb-footer-item xb-social_media">
                                        <p className="sub-title">Join our social group</p>
                                        <ul className="xb-social_icon ul_li list-unstyled">
                                            <li>
                                                <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                                                    <svg
                                                        width="14"
                                                        height="14"
                                                        viewBox="0 0 14 14"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M13.9849 14L8.51285 5.8405L8.52224 5.8482L13.4561 0H11.8073L7.78803 4.76L4.59629 0H0.272142L5.38088 7.6179L-0.0078125 14H1.64093L6.1094 8.7042L9.66075 14H13.9849ZM3.94303 1.2727L11.6206 12.7273H10.3141L2.63021 1.2727H3.94303Z"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                                    <svg
                                                        width="20"
                                                        height="16"
                                                        viewBox="0 0 20 16"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M12.3224 2.34636C10.6442 3.04236 7.28939 4.48456 2.25941 6.67146C1.44264 6.99576 1.01406 7.31296 0.975281 7.62286C0.909116 8.14806 1.56767 8.35476 2.46211 8.63456C2.58434 8.67336 2.71088 8.71206 2.84031 8.75516C3.72185 9.04066 4.90673 9.37506 5.52211 9.38796C6.08152 9.39946 6.7056 9.16986 7.39444 8.69916C12.0937 5.53206 14.5196 3.93206 14.672 3.89756C14.7799 3.87316 14.9294 3.84166 15.0301 3.93206C15.1307 4.02106 15.1207 4.19036 15.1106 4.23626C15.0445 4.51326 12.4647 6.90826 11.1274 8.14806C10.7104 8.53416 10.4156 8.80826 10.3552 8.87136C10.2201 9.01056 10.082 9.14396 9.94971 9.27176C9.13003 10.0581 8.51745 10.6494 9.98419 11.6137C10.6888 12.0772 11.2525 12.4604 11.8147 12.8421C12.4288 13.2597 13.0414 13.6758 13.8351 14.1953C14.0365 14.3273 14.2292 14.4636 14.4175 14.5971C15.1322 15.1065 15.775 15.5628 16.5688 15.4911C17.0289 15.448 17.5063 15.0161 17.7478 13.726C18.3187 10.6752 19.4433 4.06836 19.7035 1.34476C19.7194 1.11856 19.7097 0.891358 19.6747 0.667358C19.6539 0.486458 19.5656 0.320058 19.4275 0.201058C19.2218 0.0331581 18.9025 -0.002742 18.7588 0.000158001C18.1103 0.011558 17.1152 0.357458 12.3224 2.34636Z"
                                                            fill="#FFF"
                                                        />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                                    <i className="fa-brands fa-github"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* === Newsletter === */}
                                <div className="col-lg-6 col-md-7 footer-col">
                                    <div className="xb-footer-item xb-newsletter">
                                        <p className="sub-title">Subscribe to our newsletter</p>
                                        <form
                                            className="xb-footer-input-form"
                                            onSubmit={handleSubmit}
                                        >
                                            <input type="email" placeholder="Enter your email" required />
                                            <button type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>

                                {/* === CTA Button === */}
                                <div className="col-lg-3 col-md-5 footer-col">
                                    <div className="xb-footer-item xb-footer-btn">
                                        <p className="sub-title">You can’t afford it?</p>
                                        <div className="footer-btn">
                                            <Link className="thm-btn chatbot-btn" to="/contact">
                                                start for free
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
                                                        width="450"
                                                        height="60"
                                                        viewBox="0 0 450 60"
                                                        fill="none"
                                                        preserveAspectRatio="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect width="450" height="60" fill="url(#paint0_radial_2224_33830)" />
                                                        <defs>
                                                            <radialGradient
                                                                id="paint0_radial_2224_33830"
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* === Copyright === */}
                        <div className="xb-copyright ul_li_between">
                            <p>
                                Copyright © 2025 <Link to="/ai-chatbot">Aivora</Link>, All rights reserved.
                            </p>
                            <ul className="ai-footer-links ul_li">
                                <li><Link to="/contact">Terms & Conditions</Link></li>
                                <li><Link to="/contact">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* === Footer Title === */}
            <div className="xb-footer-bottom-title wow fadeInUp" data-wow-duration="600ms">
                <h2 className="title">
                    Aivora AI <span>chatbot</span>
                    <img src={diamondIcon} alt="icon" />
                </h2>
            </div>

            <span className="xb-footer-linear"></span>
        </footer>
    );
};

export default Footer;
