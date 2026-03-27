import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";

// ✅ Import background and icons
import bgImg from "../../images/bg/industries-bg02.png";
import icon01 from "../../images/icon/service-icon01.svg";
import icon02 from "../../images/icon/service-icon02.svg";
import icon03 from "../../images/icon/service-icon03.svg";
import icon04 from "../../images/icon/service-icon04.svg";
import icon05 from "../../images/icon/service-icon05.svg";
import icon06 from "../../images/icon/service-icon06.svg";
import icon07 from "../../images/icon/service-icon07.svg";

const IndustriesSection: React.FC = () => {
  useEffect(() => {
    // ✅ Set background dynamically (optional)
    const section = document.querySelector<HTMLElement>(".industries.bg-wrap");
    if (section) {
      section.style.backgroundImage = `url(${bgImg})`;
    }
  }, []);

  // ✅ Industries data
  const industries = [
    { icon: icon01, title: "Education" },
    { icon: icon02, title: "Logistics" },
    { icon: icon03, title: "Marketing" },
    { icon: icon04, title: "Healthcare" },
    { icon: icon05, title: "Finance" },
    { icon: icon06, title: "Manufacturing" },
    { icon: icon07, title: "E-commerce" },
  ];

  return (
    <section className="industries pb-165 bg_img bg-wrap">
      <div className="container">
        <div className="sec-title sec-title-center text-center mb-50">
          <span className="sub-title mb-15">Industries Served</span>
          <h2 className="title">Industries we served with AI</h2>
        </div>
      </div>

      <div className="xb-industries-wrapper d-inline-block">
        <Marquee
          direction="right"
          speed={40}
          gradient={false}
          pauseOnHover={true}
          className="marquee-right"
        >
          <div className="xb-industries-inner ul_li">
            {industries.map((item, index) => (
              <div className="xb-industries-item xb-border" key={index}>
                <div className="xb-icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <h3 className="xb-title">{item.title}</h3>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default IndustriesSection;
