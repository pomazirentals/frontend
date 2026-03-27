import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
// ---- image imports ----
import img01 from "../../images/team/img01.jpg";
import img02 from "../../images/team/img02.jpg";
import img03 from "../../images/team/img03.jpg";
import img04 from "../../images/team/img04.jpg";
import img05 from "../../images/team/img05.jpg";
import img06 from "../../images/team/img06.jpg";
import img07 from "../../images/team/img07.jpg";
import img08 from "../../images/team/img08.jpg";
import img09 from "../../images/team/img09.jpg";
import img10 from "../../images/team/img10.jpg";

import bgLarge from "../../images/team/noice-bg02.png";
import bgSmall from "../../images/team/noice-bg.png";


// ---- team data ----
const teamMembers = [
  {
    name: "Sebastian Patel",
    role: "CEO & Chairman at, Aivora",
    img: img09,
    big: true,
  },
  {
    name: "Lennox Gabriel",
    role: "Chief Operating Officer at, Aivora",
    img: img10,
    big: true,
  },
  {
    name: "Ethan Reynolds",
    role: "AI Engineer",
    img: img01,
    big: false,
  },
  {
    name: "Priya Ramirez",
    role: "Data Scientist",
    img: img02,
    big: false,
  },
  {
    name: "Aiden Brooks",
    role: "AI Researcher",
    img: img03,
    big: false,
  },
  {
    name: "Grayson Cole",
    role: "AI Solutions Architect",
    img: img04,
    big: false,
  },
  {
    name: "Eliana Rose",
    role: "Intelligence Analyst",
    img: img05,
    big: false,
  },
  {
    name: "Carter Vaughn",
    role: "AI Project Manager",
    img: img06,
    big: false,
  },
  {
    name: "Logan Pierce",
    role: "AI Solutions Architect",
    img: img07,
    big: false,
  },
  {
    name: "Emerson Tate",
    role: "AI Product Manager",
    img: img08,
    big: false,
  },
];

const TeamPage: React.FC = () => {
  return (
    <Fragment>
      <div className='about-page inner-page'>
        <div className="body_wrap o-clip">
          <Header />
          <main>
            <PageTitle pageTitle="Our team" pagesub="Our team" />
            <section className="team">
              <div className="container">
                <div className="row mt-none-55">
                  {teamMembers.map((item, idx) => (
                    <div
                      key={idx}
                      className={
                        item.big
                          ? "col-xl-6 col-lg-6 col-md-8 mt-55"
                          : "col-xl-3 col-lg-4 col-md-6 col-sm-6 mt-55"
                      }
                    >
                      <div
                        className={
                          item.big
                            ? "xb-team-item xb-team-item-big xb-border"
                            : "xb-team-item xb-border"
                        }
                      >
                        <div className="xb-item--img">
                          <img src={item.img} alt={item.name} />
                        </div>

                        <div className="xb-item--holder ul_li_between">
                          <div className="xb-item--author">
                            <h2 className="xb-item--name">{item.name}</h2>
                            <span className="xb-item--desig">{item.role}</span>
                          </div>

                          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="xb-item--social xb-border">
                            <i className="fa-brands fa-linkedin-in"></i>
                          </a>
                        </div>

                        <div className="xb-bg">
                          <img src={item.big ? bgLarge : bgSmall} alt="background" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <Scrollbar />
        </div>
      </div>
    </Fragment>
  );
};

export default TeamPage;
