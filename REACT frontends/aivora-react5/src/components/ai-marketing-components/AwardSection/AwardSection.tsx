import React, { useEffect } from "react";
import { HoverImgFx } from "./hoverImageEffect";

// ✅ Import images
import awardImg01 from "../../../images/award/award-img01.jpg";
import awardImg02 from "../../../images/award/award-img02.jpg";
import awardImg03 from "../../../images/award/award-img03.jpg";
import awardImg04 from "../../../images/award/award-img04.jpg";

const AwardSection: React.FC = () => {
  useEffect(() => {
    const wrappers = document.querySelectorAll<HTMLElement>(".xb-img-reveal-wrapper");
    wrappers.forEach((el) => (el.style.opacity = "0"));

    const items = document.querySelectorAll<HTMLElement>(".xb-img-reveal-item");

    items.forEach((el) => {
      if (el.dataset.fxInitialized === "true") return;

      new HoverImgFx(el);
      el.dataset.fxInitialized = "true";
    });
    return () => {
      document.querySelectorAll(".xb-img-reveal-wrapper").forEach((el) => {
        if (!document.body.contains(el)) el.remove();
      });
    };
  }, []);

  return (
    <section className="award">
      <div className="container-fluid">
        <div className="ai-award-wrap mlr-20">
          <div className="sec-title-three">
            <span className="sub-title mb-70">
              Awards That Define Our Journey
            </span>
          </div>

          {/* === Award 1 === */}
          <div
            className="ai-award-item xb-img-reveal-item wow fadeInUp"
            data-wow-duration="600ms"
            data-img={awardImg01}
            data-fx="1"
          >
            <h3 className="xb-item--title xb-text-reveal">
              🏆 Global marketing <span>excellence 2024</span>
            </h3>
            <p className="xb-item--details">
              <span>Awarded By:</span> International Marketing Association
            </p>
          </div>

          {/* === Award 2 === */}
          <div
            className="ai-award-item xb-img-reveal-item wow fadeInUp"
            data-wow-delay="150ms"
            data-wow-duration="600ms"
            data-img={awardImg02}
            data-fx="1"
          >
            <h3 className="xb-item--title xb-text-reveal">
              🥇 Best Digital Innovation <span>Award 2023</span>
            </h3>
            <p className="xb-item--details">
              <span>Awarded By:</span> ITechWorld Summit
            </p>
          </div>

          {/* === Award 3 === */}
          <div
            className="ai-award-item xb-img-reveal-item wow fadeInUp"
            data-wow-delay="300ms"
            data-wow-duration="600ms"
            data-img={awardImg03}
            data-fx="1"
          >
            <h3 className="xb-item--title xb-text-reveal">
              🌍 Top Emerging Martech <span>Company 2022</span>
            </h3>
            <p className="xb-item--details">
              <span>Awarded By:</span> Global Business Leaders Forum
            </p>
          </div>

          {/* === Award 4 === */}
          <div
            className="ai-award-item xb-img-reveal-item wow fadeInUp"
            data-wow-delay="450ms"
            data-wow-duration="600ms"
            data-img={awardImg04}
            data-fx="1"
          >
            <h3 className="xb-item--title xb-text-reveal">
              🥂 Excellence Data-<span>Driven Marketing 2021</span>
            </h3>
            <p className="xb-item--details">
              <span>Awarded By:</span> CX Asia Awards
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardSection;
