import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import AboutSection from "../../components/AboutComponents/AboutSection/AboutSection";
import BrandSection from "../../components/AboutComponents/BrandSection/BrandSection";
import FeatureSection from "../../components/AboutComponents/FeatureSection/FeatureSection";
import TeamSection from "../../components/AboutComponents/TeamSection/TeamSection";
import AwardSection from "../../components/AboutComponents/AwardSection/AwardSection";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";

const AboutPage: React.FC = () => {
  return (
    <Fragment>
      <div className='about-page inner-page'>
        <div className="body_wrap o-clip">
          <Header />
          <main>
            <PageTitle pageTitle="About Us" pagesub="About Us" />
            <AboutSection />
            <BrandSection />
            <FeatureSection />
            <TeamSection />
            <AwardSection />
          </main>
          <Footer />
          <Scrollbar />
        </div>
      </div>
    </Fragment>
  );
};

export default AboutPage;
