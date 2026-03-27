import Marquee from "react-fast-marquee";

// ✅ Import your assets
import gradient1 from "../../images/industries/gradient.png";
import gradient2 from "../../images/industries/gradient02.png";
import indusLogo from "../../images/industries/indus-logo.png";
import shape from "../../images/shape/indus-shape.png";

const IndustriesMarqueeSection: React.FC = () => {

  const marqueeData = [
    { tag: "POST", number: "300", text: "users/d72d9c38-f0d7-32b6-8c53-508d2134354/1" },
    { tag: "GET", number: "200", text: "users/d72d9c38-f0d7-32b6-8c53-508d2134354/1" },
    { tag: "DELETE", number: "500", text: "users/d72d9c38-f0d7-32b6-8c53-508d2134354/1", red: true },
  ];

  return (
    <section className="industries pos-rel pt-145 pb-50 bg_img">
      <div className="container">
        <div className="sec-title sec-title-center text-center mb-40">
          <span className="sub-title mb-15">Professional & Trust-Building</span>
          <h2 className="title">Real-time AI for smarter business</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div className="xb-industries-wrapper">
              <div className="xb-industries-marquee">
                <div className="xb-indus-marquee-inner">
                  <Marquee
                    gradient={false}
                    speed={10}
                    pauseOnHover
                    direction="left"
                    className="xb-marquee-items marquee-horizontal-bottom"
                  >
                    {marqueeData.map((item, i) => (
                      <div key={i} className="xb-marquee-item">
                        <span className={`tag ${item.red ? "tag-red" : ""}`}>
                          {item.tag}
                        </span>
                        <span
                          className={`number ${item.red ? "number-red" : ""}`}
                        >
                          {item.number}
                        </span>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </Marquee>
                  <Marquee
                    gradient={false}
                    speed={15}
                    pauseOnHover
                    direction="left"
                    className="xb-marquee-items marquee-horizontal-bottom"
                  >
                    {marqueeData.map((item, i) => (
                      <div key={i} className="xb-marquee-item">
                        <span className={`tag ${item.red ? "tag-red" : ""}`}>
                          {item.tag}
                        </span>
                        <span
                          className={`number ${item.red ? "number-red" : ""}`}
                        >
                          {item.number}
                        </span>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </Marquee>
                  <Marquee
                    gradient={false}
                    speed={10}
                    pauseOnHover
                    direction="left"
                    className="xb-marquee-items marquee-horizontal-bottom"
                  >
                    {marqueeData.map((item, i) => (
                      <div key={i} className="xb-marquee-item">
                        <span className={`tag ${item.red ? "tag-red" : ""}`}>
                          {item.tag}
                        </span>
                        <span
                          className={`number ${item.red ? "number-red" : ""}`}
                        >
                          {item.number}
                        </span>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </Marquee>
                  <Marquee
                    gradient={false}
                    speed={15}
                    pauseOnHover
                    direction="left"
                    className="xb-marquee-items marquee-horizontal-bottom"
                  >
                    {marqueeData.map((item, i) => (
                      <div key={i} className="xb-marquee-item">
                        <span className={`tag ${item.red ? "tag-red" : ""}`}>
                          {item.tag}
                        </span>
                        <span
                          className={`number ${item.red ? "number-red" : ""}`}
                        >
                          {item.number}
                        </span>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </Marquee>
                  <Marquee
                    gradient={false}
                    speed={10}
                    pauseOnHover
                    direction="left"
                    className="xb-marquee-items marquee-horizontal-bottom"
                  >
                    {marqueeData.map((item, i) => (
                      <div key={i} className="xb-marquee-item">
                        <span className={`tag ${item.red ? "tag-red" : ""}`}>
                          {item.tag}
                        </span>
                        <span
                          className={`number ${item.red ? "number-red" : ""}`}
                        >
                          {item.number}
                        </span>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </Marquee>
                  <Marquee
                    gradient={false}
                    speed={15}
                    pauseOnHover
                    direction="left"
                    className="xb-marquee-items marquee-horizontal-bottom"
                  >
                    {marqueeData.map((item, i) => (
                      <div key={i} className="xb-marquee-item">
                        <span className={`tag ${item.red ? "tag-red" : ""}`}>
                          {item.tag}
                        </span>
                        <span
                          className={`number ${item.red ? "number-red" : ""}`}
                        >
                          {item.number}
                        </span>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </Marquee>

                </div>

                {/* ✅ Gradient Shapes */}
                <div className="xb-gardiant-shape">
                  <img src={gradient1} alt="gradient" />
                </div>
                <div className="xb-gardiant-shape-two updown-2">
                  <img src={gradient2} alt="gradient" />
                </div>
              </div>

              {/* ✅ Center Logo */}
              <div className="xb-industries-logo wow zoomIn">
                <img src={indusLogo} alt="logo" />
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Bottom Shape */}
        <div className="indu-shape">
          <img src={shape} alt="shape" />
        </div>
      </div>

      {/* ✅ Gradient Line Overlay */}
      <div className="xb-gradiant-line">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
  );
};

export default IndustriesMarqueeSection;
