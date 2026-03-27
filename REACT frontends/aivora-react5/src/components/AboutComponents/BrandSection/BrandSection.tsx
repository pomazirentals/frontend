import React from "react";
import Marquee from "react-fast-marquee";

// === Import brand logos ===
import logo01 from "../../../images/brand/logo01.png";
import logo02 from "../../../images/brand/logo02.png";
import logo03 from "../../../images/brand/logo03.png";
import logo04 from "../../../images/brand/logo04.png";
import logo05 from "../../../images/brand/logo05.png";
import logo06 from "../../../images/brand/logo06.png";
import logo07 from "../../../images/brand/logo07.png";
import logo08 from "../../../images/brand/logo08.png";
import logo09 from "../../../images/brand/logo09.png";
import logo10 from "../../../images/brand/logo10.png";
import logo11 from "../../../images/brand/logo11.png";

const BrandSection: React.FC = () => {
    const brandLogos = [
        logo01,
        logo02,
        logo03,
        logo04,
        logo05,
        logo06,
        logo07,
        logo08,
        logo09,
        logo10,
        logo11,
    ];

    return (
        <section className="brand pb-150">
            <div className="container">
                <div className="sec-title sec-title-center brand-sec-title text-center mb-40">
                    <p className="sub-title">
                        World's Best <span>120 Companies</span> Work With Us
                    </p>
                </div>
            </div>

            {/* === Marquee (CSS handles smooth scroll) === */}
            <Marquee
                gradient={false}
                speed={30}
                pauseOnHover
                direction="left"
                className="brand-marquee ac-brand-marquee marquee-left"
            >
                <div className="ac-brand-inner ul_li_between">
                    {brandLogos.map((logo, i) => (
                        <div key={i} className="xb-brand-item">
                            <img src={logo} alt={`brand-logo-${i + 1}`} />
                        </div>
                    ))}
                </div>
            </Marquee>
        </section>
    );
};

export default BrandSection;
