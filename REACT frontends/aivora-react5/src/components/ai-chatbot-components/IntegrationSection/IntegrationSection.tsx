import React from "react";
import ComparisonSection from "./Comparison";

// ✅ Import assets
import bgImg from "../../../images/bg/integrations-bg.png";

import microsoft from "../../../images/integration/microsoft.png";
import telegram from "../../../images/integration/telegram.png";
import slack from "../../../images/integration/slack.png";
import line from "../../../images/integration/line.png";
import mailchimp from "../../../images/integration/mailchimp.png";

import apple from "../../../images/integration/apple.png";
import messenger from "../../../images/integration/messenger.png";
import linkedin from "../../../images/integration/linkedin.png";
import googleMeet from "../../../images/integration/google-meet.png";
import paypal from "../../../images/integration/paypal.png";

import platform from "../../../images/integration/plateform.png";
import airtable from "../../../images/integration/airtable.png";
import whatsapp from "../../../images/integration/whatsapp.png";
import android from "../../../images/integration/android.png";
import instagram from "../../../images/integration/instagram.png";

import shazam from "../../../images/integration/shazam.png";
import shopify from "../../../images/integration/shopify.png";
import loom from "../../../images/integration/loom.png";
import snapchat from "../../../images/integration/snapchat.png";
import discord from "../../../images/integration/discord.png";
import subIcon from "../../../images/icon/sub-left-icon.png";

const IntegrationComparisonSection: React.FC = () => {
    const logosRow1 = [microsoft, telegram, slack, line, mailchimp];
    const logosRow2 = [apple, messenger, linkedin, googleMeet, paypal];
    const logosRow3 = [platform, airtable, whatsapp, android, instagram];
    const logosRow4 = [shazam, shopify, loom, snapchat, discord];

    return (
        <section
            id="integration"
            className="integration-conparison pt-40 pb-150 bg_img"
            style={{ backgroundImage: `url(${bgImg})` }}
        >
            <div className="container">
                {/* ================= LEFT CONTENT ================= */}
                <div className="integration-container">
                    <div className="row mt-none-30 align-items-center">
                        <div className="col-lg-6 mt-30">
                            <div className="integration-content">
                                <div className="sec-title sec-title--two process-title mb-10">
                                    <span className="sub-title d-block mb-30">
                                        <img src={subIcon} alt="icon" />
                                        Easy integrations
                                    </span>
                                    <h2 className="title">Connect your favourite tools</h2>
                                </div>

                                <ul className="integration-list list-unstyled">
                                    <li>
                                        <span>✔</span> Messaging Platforms Integration.
                                    </li>
                                    <li>
                                        <span>✔</span> Web & E-commerce Integration.
                                    </li>
                                    <li>
                                        <span>✔</span> Customer Support & CRM Integration.
                                    </li>
                                    <li>
                                        <span>✔</span> Automation & API Tools Integration.
                                    </li>
                                </ul>

                                <div className="integration-btn mt-45">
                                    <div className="cta-btn mt-40 wow fadeInUp" data-wow-duration="600ms">
                                        <a className="thm-btn chatbot-btn" href="/contact">
                                            Build your AI chatbot — it’s free
                                            <span className="arrow-icon">
                                                {/* Arrow animation (two layers for motion) */}
                                                {[...Array(2)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        width="28"
                                                        height="28"
                                                        viewBox="0 0 28 28"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            x="5.06592"
                                                            y="19.9785"
                                                            width="20.5712"
                                                            height="2.61221"
                                                            transform="rotate(-40.2798 5.06592 19.9785)"
                                                            fill="white"
                                                        />
                                                        <rect
                                                            x="7.97095"
                                                            y="7.24463"
                                                            width="2.61221"
                                                            height="2.61221"
                                                            transform="rotate(-40.2798 7.97095 7.24463)"
                                                            fill="white"
                                                        />
                                                        <rect
                                                            x="11.6523"
                                                            y="7.54834"
                                                            width="2.61221"
                                                            height="2.61221"
                                                            transform="rotate(-40.2798 11.6523 7.54834)"
                                                            fill="white"
                                                        />
                                                        <rect
                                                            x="15.334"
                                                            y="7.85205"
                                                            width="2.61221"
                                                            height="2.61221"
                                                            transform="rotate(-40.2798 15.334 7.85205)"
                                                            fill="white"
                                                        />
                                                        <rect
                                                            x="18.7119"
                                                            y="11.8374"
                                                            width="2.61221"
                                                            height="2.61221"
                                                            transform="rotate(-40.2798 18.7119 11.8374)"
                                                            fill="white"
                                                        />
                                                        <rect
                                                            x="18.4084"
                                                            y="15.52"
                                                            width="2.61221"
                                                            height="2.61221"
                                                            transform="rotate(-40.2798 18.4084 15.52)"
                                                            fill="white"
                                                        />
                                                        <rect
                                                            x="18.104"
                                                            y="19.2012"
                                                            width="2.61221"
                                                            height="2.61221"
                                                            transform="rotate(-40.2798 18.104 19.2012)"
                                                            fill="white"
                                                        />
                                                    </svg>
                                                ))}
                                            </span>

                                            {/* Gradient background */}
                                            <span className="btn-bg">
                                                <svg
                                                    width="750"
                                                    height="60"
                                                    viewBox="0 0 750 60"
                                                    fill="none"
                                                    preserveAspectRatio="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        width="750"
                                                        height="60"
                                                        fill="url(#paint0_radial_2224_33833)"
                                                    />
                                                    <defs>
                                                        <radialGradient
                                                            id="paint0_radial_2224_33833"
                                                            cx="0"
                                                            cy="0"
                                                            r="1"
                                                            gradientTransform="matrix(-667.5 -25 0.582116 -49.7476 497 39)"
                                                            gradientUnits="userSpaceOnUse"
                                                        >
                                                            <stop offset="0" stopColor="#00FF97" />
                                                            <stop offset="1" stopColor="#00020F" stopOpacity="0" />
                                                        </radialGradient>
                                                    </defs>
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ================= LOGO MARQUEES ================= */}
                        <div className="col-lg-6 mt-30">
                            <div className="integration-logo-wrap ul_li">
                                <div className="integration-logo-inner marquee-first">
                                    {logosRow1.concat(logosRow1).map((logo, i) => (
                                        <div className="integration-logo" key={`row1-${i}`}>
                                            <img src={logo} alt="logo" />
                                        </div>
                                    ))}
                                </div>

                                <div className="integration-logo-inner marquee2">
                                    {logosRow2.concat(logosRow2).map((logo, i) => (
                                        <div className="integration-logo" key={`row2-${i}`}>
                                            <img src={logo} alt="logo" />
                                        </div>
                                    ))}
                                </div>

                                <div className="integration-logo-inner marquee-first">
                                    {logosRow3.concat(logosRow3).map((logo, i) => (
                                        <div className="integration-logo" key={`row3-${i}`}>
                                            <img src={logo} alt="logo" />
                                        </div>
                                    ))}
                                </div>

                                <div className="integration-logo-inner marquee2">
                                    {logosRow4.concat(logosRow4).map((logo, i) => (
                                        <div className="integration-logo" key={`row4-${i}`}>
                                            <img src={logo} alt="logo" />
                                        </div>
                                    ))}
                                </div>

                                <div className="xb-shape">
                                    <div className="shape shape--1"></div>
                                    <div className="shape shape--2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= COMPARISON SECTION ================= */}
                <ComparisonSection />
            </div>
        </section>
    );
};

export default IntegrationComparisonSection;
