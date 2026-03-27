import React from "react";
import Marquee from "react-fast-marquee";

import subLeftIcon from "../../../images/icon/sub-left-icon.png";
import brandLogo1 from "../../../images/brand/logo01.png";
import brandLogo2 from "../../../images/brand/logo02.png";
import brandLogo3 from "../../../images/brand/logo03.png";
import brandLogo4 from "../../../images/brand/logo04.png";
import brandLogo5 from "../../../images/brand/logo05.png";
import brandLogo6 from "../../../images/brand/logo06.png";
import brandLogo7 from "../../../images/brand/logo07.png";
import brandLogo8 from "../../../images/brand/logo08.png";
import brandLogo9 from "../../../images/brand/logo09.png";
import brandLogo10 from "../../../images/brand/logo10.png";
import brandLogo11 from "../../../images/brand/logo11.png";

const BrandSection: React.FC = () => {
    return (

        <section className="brand">
            <div className="container">
                <div className="sec-title sec-title--two custom-sec-title text-center mb-30">
                    <span className="sub-title">
                        <img src={subLeftIcon} alt="icon" />
                        Trusted by 9000+ AI Assistants created
                        <img src={subLeftIcon} alt="icon" />
                    </span>
                </div>
            </div>

            <Marquee
                gradient={false}
                speed={30}
                pauseOnHover
                direction="left"
                className="brand-marquee ac-brand-marquee marquee-left"
            >
                <div className="ac-brand-inner ul_li_between">
                    {[brandLogo1, brandLogo2, brandLogo3, brandLogo4, brandLogo5, brandLogo6, brandLogo7, brandLogo8, brandLogo9, brandLogo10, brandLogo11].map(
                        (logo, i) => (
                            <div className="xb-brand-item" key={i}>
                                <img src={logo} alt={`brand-${i + 1}`} />
                            </div>
                        )
                    )}
                </div>
            </Marquee>
        </section>
    );
};

export default BrandSection;
