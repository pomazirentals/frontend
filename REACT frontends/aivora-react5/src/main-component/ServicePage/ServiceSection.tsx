import React from "react";
import { Link } from "react-router-dom";

// Background image
import serviceBg from "../../images/bg/service-gradient-bg.png";

// Service images
import img07 from "../../images/service/img07.jpg";
import img08 from "../../images/service/img08.jpg";
import img09 from "../../images/service/img09.jpg";
import img11 from "../../images/service/img11.jpg";

const ServiceSection: React.FC = () => {
  // ========================
  // ICON SVG
  // ========================
  const arrowIcon = (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="6.29004"
        y="21.4111"
        width="22.36"
        height="2.83936"
        transform="rotate(-40.2798 6.29004 21.4111)"
        fill="white"
      />
      <rect
        x="9.44824"
        y="7.57031"
        width="2.83936"
        height="2.83936"
        transform="rotate(-40.2798 9.44824 7.57031)"
        fill="white"
      />
      <rect
        x="13.4492"
        y="7.90015"
        width="2.83936"
        height="2.83936"
        transform="rotate(-40.2798 13.4492 7.90015)"
        fill="white"
      />
      <rect
        x="17.4512"
        y="8.23047"
        width="2.83936"
        height="2.83936"
        transform="rotate(-40.2798 17.4512 8.23047)"
        fill="white"
      />
      <rect
        x="21.123"
        y="12.5627"
        width="2.83936"
        height="2.83936"
        transform="rotate(-40.2798 21.123 12.5627)"
        fill="white"
      />
      <rect
        x="20.793"
        y="16.5649"
        width="2.83936"
        height="2.83936"
        transform="rotate(-40.2798 20.793 16.5649)"
        fill="white"
      />
      <rect
        x="20.4619"
        y="20.5669"
        width="2.83936"
        height="2.83936"
        transform="rotate(-40.2798 20.4619 20.5669)"
        fill="white"
      />
    </svg>
  );

  // ========================
  // ARRAY DATA
  // ========================
  const services = [
    {
      title: "AI saas product",
      content:
        "We build scalable AI-powered SaaS solutions that automate tasks, deliver insights, and boost business performance.",
      images: [img07, img07, img07, img07],
      link: "/service-details",
    },
    {
      title: "Data and intelligence..",
      content:
        "We turn complex data into clear, actionable insights using AI and advanced analytics—empowering smarter decisions.",
      images: [img08, img08, img08, img08],
      link: "/service-details",
    },
    {
      title: "AI for E-commerce",
      content:
        "We enhance e-commerce with AI-powered, dynamic pricing, and personalized customer experiences.",
      images: [img09, img09, img09, img09],
      link: "/service-details",
    },
    {
      title: "AI consulting",
      content:
        "We guide businesses in adopting AI strategies, optimizing processes, and integrating technologies for lasting success.",
      images: [img11, img11, img11, img11],
      link: "/service-details",
    },
    {
      title: "AI chatbot virtual",
      content:
        "We create intelligent chatbots and virtual assistants that improve customer support and automate interactions 24/7.",
      images: [img11, img11, img11, img11],
      link: "/service-details",
    },
    {
      title: "AI - marketing",
      content:
        "Use AI to target audiences, personalize campaigns, and analyze data for better engagement and results.",
      images: [img07, img07, img07, img07],
      link: "/service-details",
    },
  ];

  // ========================
  // RETURN SECTION
  // ========================
  return (
    <section
      className="service pos-rel bg_img"
      style={{ backgroundImage: `url(${serviceBg})` }}
    >
      <div className="container">
        <div className="row mt-none-30">
          {services.map((service, index) => (
            <div className="col-lg-6 mt-30" key={index}>
              <div className="xb-ser-item xb-border img-hove-effect">
                <div className="xb-item--inner">
                  <h3 className="xb-item--title border-effect">
                    <Link to={service.link}>{service.title}</Link>
                  </h3>

                  <Link className="xb-item--icon" to={service.link}>
                    {arrowIcon}
                  </Link>

                  <p className="xb-item--content">{service.content}</p>

                  <div className="xb-item--img xb-img">
                    {service.images.map((img, i) => (
                      <Link key={i} to={service.link}>
                        <img src={img} alt="service" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
