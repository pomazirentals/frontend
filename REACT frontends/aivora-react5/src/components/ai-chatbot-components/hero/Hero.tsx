import { Link } from "react-router-dom";

// ✅ Import images
import heroBg from "../../../images/bg/hero_bg02.jpg";
import heroImg from "../../../images/hero/hero-img01.png";
import textImg1 from "../../../images/hero/text-img01.png";
import textImg2 from "../../../images/hero/text-img02.png";
import textImg3 from "../../../images/hero/text-img03.png";
import textImg4 from "../../../images/hero/text-img04.png";
import textImg5 from "../../../images/hero/text-img05.png";
import glassyEffect from "../../../images/hero/glassy-effect-img.png";

const HeroSection: React.FC = () => {

  return (
    <section
      className="hero hero-style hero-style--two pos-rel bg_img" id="home"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="container">
        <div className="row">
          {/* === Left Column === */}
          <div className="col-lg-6">
            <div className="hero-content hero-content--two">
              <h2 className="title scale-animation wow">
                Save your time, chat smarter with AI chatbot
              </h2>
              <p className="sub-title scale-animation wow">
                Automate your repetitive support, and let AI assist you when you
                need to jump in. Reply faster, stay personal, and automate the
                rest.
              </p>

              <div className="hero-btn scale-animation wow">
                <Link className="thm-btn chatbot-btn" to="/contact">
                  build your ai chatbot — it’s free
                  <span className="arrow-icon">
                    {/* === SVG Arrows === */}
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

                  {/* === Button Background === */}
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
                        fill="url(#paint0_radial_2224_3384)"
                      />
                      <defs>
                        <radialGradient
                          id="paint0_radial_2224_3384"
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

          {/* === Right Column === */}
          <div className="col-lg-6">
            <div className="hero-img-container">
              <div
                className="xb-img"
                data-wow-delay="0ms"
                data-wow-duration="800ms"
              >
                <img src={heroImg} alt="AI Chatbot" />
              </div>

              <div className="xb-text-left wow updown">
                <div className="img img--1">
                  <img src={textImg1} alt="text-img1" />
                </div>
                <div className="img img--2">
                  <img src={textImg2} alt="text-img2" />
                </div>
              </div>

              <div className="xb-glassy-effect-img wow">
                <img src={glassyEffect} alt="Glassy Effect" />
              </div>

              <div className="xb-text-right wow updown">
                <div className="img img--1">
                  <img src={textImg3} alt="text-img3" />
                </div>
                <div className="img img--2">
                  <img src={textImg4} alt="text-img4" />
                </div>
                <div className="img img--3">
                  <img src={textImg5} alt="text-img5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Bottom Linear Element === */}
      <div className="hero-linear"></div>
    </section>
  );
};

export default HeroSection;
