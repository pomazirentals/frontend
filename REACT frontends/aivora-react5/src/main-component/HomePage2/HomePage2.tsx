import React, { Fragment, useEffect } from "react";
import HeaderTwo from "../../components/HeaderTwo/HeaderTwo";
import HeroSection from "../../components/ai-marketing-components/hero/Hero";
import AboutSection from "../../components/ai-marketing-components/AboutSection/AboutSection";
import AiServiceSection from "../../components/ai-marketing-components/AiServiceSection/AiServiceSection";
import AiBrandSection from "../../components/ai-marketing-components/AiBrandSection/AiBrandSection";
import ProjectSection from "../../components/ai-marketing-components/ProjectSection/ProjectSection";
import AwardSection from "../../components/ai-marketing-components/AwardSection/AwardSection";
import TestimonialSection from "../../components/ai-marketing-components/TestimonialSection/TestimonialSection";
import DownloadSection from "../../components/ai-marketing-components/DownloadSection/DownloadSection";
import AiFooterSection from "../../components/ai-marketing-components/AiFooterSection/AiFooterSection";
import Scrollbar from "../../components/scrollbar/scrollbar";


const HomePage2: React.FC = () => {
  useEffect(() => {
    document.title = "Ai Marketing | AI Agency & Technology React Template";
  }, []);

  return (
    <Fragment>
        <div className='ai-marketing'>
          <div className="body_wrap o-clip">
            <HeaderTwo />
            <main>
              <HeroSection/>
              <AboutSection/>
              <AiServiceSection/>
              <AiBrandSection/>
              <ProjectSection/>
              <AwardSection/>
              <TestimonialSection/>
              <DownloadSection/>
            </main>
            <AiFooterSection />
            <Scrollbar />
          </div>
        </div>
    </Fragment>
  );
};

export default HomePage2;
