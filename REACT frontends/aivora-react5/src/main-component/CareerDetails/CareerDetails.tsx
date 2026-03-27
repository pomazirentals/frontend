import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import ApplyForm from "./ApplyForm";

const CareerDetails: React.FC = () => {
    return (
        <Fragment>
            <div className='about-page inner-page'>
                <div className="body_wrap o-clip">
                    <Header />
                    <main>
                        <PageTitle pageTitle="Career details" pagesub="Career details" />
                        <section className="career-details">
                            <div className="container">
                                <div className="cp-details-wrap">

                                    {/* Manager Info */}
                                    <div className="cp-manager_info">
                                        <h2 className="details-content-title mb-30">
                                            Technical project manager - (Full-time)
                                        </h2>

                                        <ul className="xb-details-content list-unstyled mb-35">
                                            <li><span>Department :</span> Technical Project Manager</li>
                                            <li><span>No. of Openings :</span> (3)</li>
                                            <li><span>FullJob Type :</span> -Time</li>
                                            <li><span>Location :</span> San Francisco, USA.</li>
                                            <li><span>Working days :</span> $80k to $100k (Based on your experience).</li>
                                            <li><span>Deadline :</span> December 10, 2025</li>
                                            <li><span>Experience Required :</span> 5+ Years</li>
                                        </ul>

                                        <p className="mb-30">
                                            We’re looking for a Technical Project Manager and knowledgeable Product Designer
                                            to join our technical team in Warsaw, Poland. You’ll be expected to utilize
                                            bleeding-edge technology and robust techniques. You should be an excellent
                                            communicator and comfortable managing multiple tasks. You also need to be a
                                            team player and have a problem-solving aptitude.
                                        </p>

                                        <p>
                                            Working quickly and creatively should come naturally to you, as well as being
                                            an innovative problem-solver who takes pride in producing logical, simple, and
                                            effective solutions to what are often very new and complex issues.
                                        </p>
                                    </div>

                                    {/* What you'll do */}
                                    <div className="xb-details-item">
                                        <h3 className="details-title mt-70">What you'll get to do...</h3>
                                        <ul className="content-list mt-25">
                                            <li>Refactor current code to service-oriented architecture.</li>
                                            <li>Collaborate with engineering, product, and operations team members.</li>
                                            <li>Solve technical problems that few have solved before.</li>
                                            <li>Participate in decision-making — we want you to speak up.</li>
                                            <li>Mentor team members and share engineering passion.</li>
                                            <li>Improve quality, performance, and scalability.</li>
                                            <li>Participate in on-call rotation.</li>
                                        </ul>
                                    </div>

                                    {/* Experience section */}
                                    <div className="xb-details-item">
                                        <h3 className="details-title mt-70">Your experience should include...</h3>
                                        <ul className="content-list mt-25">
                                            <li>6+ years of professional Project Management experience.</li>
                                            <li><span>Technical Expertise:</span> Strong technical understanding.</li>
                                            <li><span>Stakeholder Management:</span> Proven alignment skills.</li>
                                            <li><span>Agile Methodologies:</span> Hands-on Agile experience.</li>
                                            <li><span>Risk Management:</span> Identify and mitigate risks.</li>
                                            <li><span>Team Leadership:</span> Inspire and motivate teams.</li>
                                            <li><span>Communication Skills:</span> Excellent technical communication.</li>
                                            <li><span>Problem-Solving:</span> Proactive critical thinker.</li>
                                            <li><span>Quality Assurance:</span> Maintain high standards.</li>
                                        </ul>
                                    </div>

                                    {/* You might have */}
                                    <div className="xb-details-item">
                                        <h3 className="details-title mt-70">You might also have...</h3>
                                        <ul className="content-list mt-25">
                                            <li>Experience with AWS.</li>
                                            <li>Experience building CI/CD automation pipelines.</li>
                                            <li>Experience with Puppet or infrastructure-as-code.</li>
                                            <li>Passion for technology and innovation.</li>
                                            <li>High standards and desire to create real impact.</li>
                                            <li>Continuous improvement mindset.</li>
                                        </ul>
                                    </div>

                                    {/* Benefits */}
                                    <div className="xb-details-item">
                                        <h3 className="details-title mt-70">Great benefits...</h3>
                                        <ul className="content-list mt-25">
                                            <li>Company-wide 401(k) plan.</li>
                                            <li>Life & disability insurance.</li>
                                            <li>Competitive salary, bonus & equity.</li>
                                            <li>Medical, dental, and vision coverage.</li>
                                            <li>Flexible paid time off & sick leave.</li>
                                        </ul>
                                    </div>
                                    
                                    {/* ApplyForm */}
                                    <ApplyForm />

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

export default CareerDetails;
