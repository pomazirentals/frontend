import React, { useEffect, useRef, useState } from "react";
import contactBg from "../../images/bg/contact-bg.png";
import gifShape from "../../images/icon/b10c3e43e836d32554bf.gif";
import shape1 from "../../images/shape/contact-shape01.png";
import shape2 from "../../images/shape/contact-shape02.png";
import ContactForm from "../ContactFrom/ContactForm";

const ContactSection: React.FC = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [clientSatisfaction, setClientSatisfaction] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ Animate numbers when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let project = 0;
            let client = 0;

            const projectInterval = setInterval(() => {
              project += 1;
              if (project >= 5) clearInterval(projectInterval);
              setProjectCount(project);
            }, 200);

            const clientInterval = setInterval(() => {
              client += 5;
              if (client >= 95) clearInterval(clientInterval);
              setClientSatisfaction(client);
            }, 50);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="contact-section pt-150 pb-140 bg_img"
      ref={sectionRef}
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="container">
        <div className="row mt-none-50 justify-content-center">
          {/* Left side - Text and Stats */}
          <div className="col-lg-6 mt-50">
            <div className="xb-content-wrap">
              <div className="sec-title contact-sec-title">
                <span className="sub-title mb-15">Our Achievements</span>
                <h2 className="title horizontal-shape">
                  We are trusted{" "}
                  <img src={gifShape} alt="animated-shape" /> AI agency
                </h2>
              </div>

              <div className="xb-contact-conent">
                <div className="xb-contact-inner ul_li_between">
                  <div className="xb-contact-item">
                    <h3 className="xb-item--number">
                      <span className="xbo">{projectCount}</span>
                      <span className="suffix">K+</span>
                    </h3>
                    <p className="xb-item--content">
                      Projects Successfully Delivered
                    </p>
                  </div>

                  <div className="xb-contact-item">
                    <h3 className="xb-item--number">
                      <span className="xbo">{clientSatisfaction}</span>
                      <span className="suffix">%</span>
                    </h3>
                    <p className="xb-item--content">
                      Client Satisfaction Rate on Our Results
                    </p>
                  </div>
                </div>

                {/* Shapes */}
                <div className="shape shape--1">
                  <img src={shape1} alt="shape" />
                </div>
                <div className="shape shape--2">
                  <img src={shape2} alt="shape" />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="col-lg-6 mt-50">
            <div className="xb-contact-form xb-border">
              <div className="form-heading text-center mb-30">
                <h3 className="title">Ready to collaborate with us?</h3>
                <p className="sub-title">
                  Who knows where a single message might lead you.
                </p>
              </div>
              <ContactForm/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
