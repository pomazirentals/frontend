import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

// ✅ Import images
import videoFrame from "../../../images/video/video-frame.png";
import dashboardIcon from "../../../images/icon/dash_board_icon.svg";
import documentIcon from "../../../images/icon/document_icon.svg";
import sheetIcon from "../../../images/icon/sheet_icon.svg";
import whiteboardIcon from "../../../images/icon/sheet_icon.svg";

import tabImg1 from "../../../images/video/img01.jpg";
import tabImg2 from "../../../images/video/img02.jpg";
import tabImg3 from "../../../images/video/img03.jpg";
import tabImg4 from "../../../images/video/img04.jpg";

import shape1 from "../../../images/shape/video-shape01.png";
import shape2 from "../../../images/shape/video-shape02.png";
import shape3 from "../../../images/shape/video-shape03.png";
import shape4 from "../../../images/shape/video-shape04.png";
import robotImg from "../../../images/video/robot-img.png";

const VideoSection: React.FC = () => {
    const tabs = [
        { id: "dashboard", label: "Dashboard", icon: dashboardIcon, img: tabImg1 },
        { id: "document", label: "Document", icon: documentIcon, img: tabImg2 },
        { id: "sheet", label: "Sheet", icon: sheetIcon, img: tabImg3 },
        { id: "whiteboard", label: "Whiteboard", icon: whiteboardIcon, img: tabImg4 },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    // ✅ Auto tab rotation every 3 seconds
    useEffect(() => {
        const intervalTime = 3000; // 3 seconds
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % tabs.length);
        }, intervalTime);

        return () => clearInterval(interval);
    }, [tabs.length]);

    return (
        <section className="video z-1 pt-25 pb-70 pos-rel">
            <div className="container">
                <div className="xb-video-frame pos-rel">
                    <div className="xb-img">
                        <img src={videoFrame} alt="video frame" />
                    </div>

                    <div className="xb-video-wrap">
                        {/* === Tabs Navigation === */}
                        <ul className="xb-video-nav nav nav-pills mb-3" role="tablist">
                            {tabs.map((tab, index) => (
                                <li className="nav-item xb-video-nav-item" key={tab.id}>
                                    <button
                                        className={`nav-link ${activeIndex === index ? "active" : ""}`}
                                        onClick={() => setActiveIndex(index)}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeIndex === index}
                                    >
                                        <img src={tab.icon} alt={`${tab.label} icon`} />
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* === Tab Content === */}
                        <div className="tab-content">
                            {tabs.map((tab, index) => (
                                <div
                                    key={tab.id}
                                    className={`tab-pane fade ${activeIndex === index ? "show active" : ""
                                        }`}
                                >
                                    <div className="xb-tab-img">
                                        <img src={tab.img} alt={`${tab.label} preview`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* === Floating Shapes === */}
                    <div className="xb-video-shape">
                        <div className="shape shape--1">
                            <img src={shape1} alt="shape" />
                        </div>
                        <div className="shape shape--2 updown-2">
                            <img src={shape2} alt="shape" />
                        </div>
                        <div className="shape shape--3 zoominup">
                            <img src={shape3} alt="shape" />
                        </div>
                    </div>
                </div>
            </div>

            {/* === Gradient Background === */}
            <div className="xb-linear-gradient">
                <span className="gradient gradient--1"></span>
                <span className="gradient gradient--2"></span>
                <span className="gradient gradient--3"></span>
                <span className="gradient gradient--4"></span>
                <span className="gradient gradient--dot-img">
                    <img src={shape4} alt="dot shape" />
                </span>
            </div>

            {/* === Scrolling Text (Marquee) === */}
            <Marquee
                gradient={false}
                speed={50}
                pauseOnHover
                direction="left"
                className="xb-text-marquee-wrap marquee-left"
            >
                <div className="xb-text-marquee-item">
                    <h2 className="title">24/7 instant support</h2>
                    <span className="img">
                        <img src={robotImg} alt="robot" />
                    </span>
                    <h2 className="title">No-code chatbot builder</h2>
                    <span className="img">
                        <img src={robotImg} alt="robot" />
                    </span>
                </div>
            </Marquee>
        </section>
    );
};

export default VideoSection;
