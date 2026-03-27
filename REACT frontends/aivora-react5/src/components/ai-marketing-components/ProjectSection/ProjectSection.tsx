import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Image imports
import img1 from "../../../images/project/img08.png";
import img2 from "../../../images/project/img11.png";
import img3 from "../../../images/project/img10.png";
import img4 from "../../../images/project/img09.png";

// Register plugin
gsap.registerPlugin(ScrollTrigger);


const ProjectSection: React.FC = () => {
  // === GSAP Activation ===
  useEffect(() => {
    const projectScale = () => {
      const tl = gsap.timeline();
      const mm = gsap.matchMedia();

      mm.add("(min-width: 767px)", () => {
        const panels = document.querySelectorAll<HTMLElement>(".des-portfolio-panel");

        panels.forEach((panel) => {
          gsap.set(panel, { scale: 1 });

          tl.to(panel, {
            scale: 0.8,
            scrollTrigger: {
              trigger: panel,
              pin: panel,
              scrub: 1,
              start: "top top",
              end: "bottom 60%",
              endTrigger: ".des-portfolio-wrap",
              pinSpacing: false,
              markers: false,
            },
          });
        });
      });
    };

    projectScale();
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="project mt-70 mb-30">
      <div className="container-fluid">
        <div className="mlr-20">
          <div className="ai-portfolio-wrap des-portfolio-wrap">

            {/* Project 1 */}
            <div className="ai-project-item des-portfolio-panel pos-rel not-hide-cursor mb-30" data-cursor="View<br>Demo">
              <Link className="cursor-hide" to="/project-details">
                <div className="ai-portfolio-thumb">
                  <img src={img1} alt="GROK" />
                </div>
                <span className="ai-category">Case Study : <span>GROK</span></span>
              </Link>

              <div className="ai-project-content ul_li_between">
                <span className="content">
                  <span>Challenge:</span> GROK needed to improve its digital outreach and maximize audience engagement for product launches.
                </span>
                <Link className="ai-marketing-btn" to="/project">
                  <span className="arrow"><ArrowIcon /></span>
                  Read Full Case Study
                </Link>
                <p className="content text-end">
                  <span className="text-green">Solution:</span> AI Media Interactive Dashboard for real-time visibility and adjustments.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="ai-project-item des-portfolio-panel pos-rel not-hide-cursor mb-30" data-cursor="View<br>Demo">
              <Link className="cursor-hide" to="/project-details">
                <div className="ai-portfolio-thumb">
                  <img src={img2} alt="Dummy Shoes Company" />
                </div>
                <span className="ai-category">Case Study : <span>Dummy Shoes Company</span></span>
              </Link>

              <div className="ai-project-content ul_li_between">
                <p className="content"><span>Challenge:</span> Stand out in a competitive e-commerce market.</p>
                <Link className="ai-marketing-btn" to="/project">
                  <span className="arrow"><ArrowIcon /></span>
                  Read Full Case Study
                </Link>
                <p className="content text-end">
                  <span className="text-green">Solution:</span> Used AI agent for personalized recommendations and guided shopping.
                </p>
              </div>
            </div>

            {/* Project 3 */}
            <div className="ai-project-item des-portfolio-panel pos-rel not-hide-cursor mb-30" data-cursor="View<br>Demo">
              <Link className="cursor-hide" to="/project-details">
                <div className="ai-portfolio-thumb">
                  <img src={img3} alt="Perfume Brand" />
                </div>
                <span className="ai-category">Case Study : <span>Perfume Brand</span></span>
              </Link>

              <div className="ai-project-content ul_li_between">
                <p className="content"><span>Challenge:</span> Expand digital footprint while maintaining luxury appeal.</p>
                <Link className="ai-marketing-btn" to="/project">
                  <span className="arrow"><ArrowIcon /></span>
                  Read Full Case Study
                </Link>
                <p className="content text-end">
                  <span className="text-green">Solution:</span> AI insights helped identify key audiences and optimize campaigns.
                </p>
              </div>
            </div>

            {/* Project 4 */}
            <div className="ai-project-item des-portfolio-panel pos-rel not-hide-cursor" data-cursor="View<br>Demo">
              <Link className="cursor-hide" to="/project-details">
                <div className="ai-portfolio-thumb">
                  <img src={img4} alt="IBM" />
                </div>
                <span className="ai-category">Case Study : <span>IBM</span></span>
              </Link>

              <div className="ai-project-content ul_li_between">
                <p className="content"><span>Challenge:</span> IBM needed to understand enterprise customer behavior.</p>
                <Link className="ai-marketing-btn" to="/project">
                  <span className="arrow"><ArrowIcon /></span>
                  <span className="text">
                    <span>Read Full Case Study</span>
                    <span>Read Full Case Study</span>
                  </span>
                </Link>
                <p className="content text-end">
                  <span className="text-green">Solution:</span> Combined AI Behavioral Data with dashboards for deep insights.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

// SVG Arrow Component
const ArrowIcon: React.FC = () => (
  <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="11.9299" y="12.4632" width="3.80516" height="3.83411" fill="black" />
    <rect x="0.843506" y="0.994343" width="3.83411" height="3.83411" fill="black" />
    <rect x="4.68921" y="4.81607" width="3.83411" height="3.83411" fill="black" />
    <rect x="8.53442" y="8.63861" width="3.83411" height="3.83411" fill="black" />
    <rect x="8.55786" y="16.3068" width="3.83411" height="3.83411" fill="black" />
    <rect x="4.73535" y="20.1535" width="3.83411" height="3.83411" fill="black" />
    <rect x="0.912354" y="23.9985" width="3.83411" height="3.83411" fill="black" />
  </svg>
);

export default ProjectSection;
