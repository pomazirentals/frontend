import React, { useRef, useState } from "react"
import img13 from "../../images/service/img13.jpg";
import ServiceFaq from "./ServiceFaq";
import GallerySection from "./GallerySection";

const VIDEO_URL = "https://www.youtube.com/embed/F8NKVhkZZWI?autoplay=1";

const ServiceDetails: React.FC = () => {


    const [isOpen, setIsOpen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    const openVideo = () => {
        setIsOpen(true);
        requestAnimationFrame(() => {
            if (iframeRef.current) iframeRef.current.src = VIDEO_URL;
        });
    };

    const closeVideo = () => {
        if (iframeRef.current) iframeRef.current.src = "about:blank"; // Stop video playback
        setIsOpen(false);
    };



    const outcomeItems = [
        "AI-Powered Data Analysis.",
        "Real-Time Analytics.",
        "Scalable Data Infrastructure.",
        "Enterprise System Integration.",
        "Automated Data Processing.",
        "Smart Decision Support.",
    ];


    return (
        <section className="service-details pos-rel">
            <div className="container">
                {/* ========= SERVICE IMAGE + VIDEO ========= */}
                <div className="single-item-image service-det-img mb-75">
                    <img src={img13} alt="simage" />

                    <button
                        className="popup-video btn-video btn-video-center" onClick={openVideo}
                    >
                        <span>
                            <svg
                                width="27"
                                height="30"
                                viewBox="0 0 27 30"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M25.0957 13.268C26.429 14.0378 26.429 15.9623 25.0957 16.7321L3.95285 28.9389C2.61951 29.7087 0.952845 28.7465 0.952845 27.2069L0.952846 2.79319C0.952846 1.25359 2.61951 0.291337 3.95285 1.06114L25.0957 13.268Z"
                                    fill="#00020F"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
                {/* ========= TITLE & TEXT ========= */}
                <h2 className="details-content-title mb-15">
                    Data and intelligence solutions for smarter.
                </h2>

                <p>
                    Unlock the true value of your data with our comprehensive AI-driven data and intelligence solutions. We help businesses collect, organize, and analyze vast amounts of information to extract meaningful insights and make smarter, faster decisions. By leveraging advanced analytics, machine learning, and real-time data processing, we transform raw data into powerful tools for innovation, strategy, and growth. Whether you're looking to optimize operations, improve customer experiences, or forecast trends, our solutions provide the intelligence you need to stay ahead in a competitive, data-driven world.
                </p>

                <p className="mt-30">
                    We turn complex information into clear, actionable insights. These insights empower smarter decisions, streamline operations, enhance customer experiences, and drive measurable business growth. Whether you're navigating market trends, optimizing workflows, or building data-driven strategies, we provide the tools and expertise to help you lead with confidence in a data-first world.
                </p>

                {/* ========= SERVICE PROCESS ========= */}
                <ServiceFaq />


                {/* ========= SERVICES OUTCOME ========= */}
                <div className="services-outcome-wrap">
                    <h2 className="details-content-title mb-15">Services outcome</h2>
                    <p>
                        We help Fortune 500 companies accelerate innovation through advanced data and intelligence solutions. Using AI, machine learning, and real-time analytics, we turn complex data into actionable insights. Our services empower smarter decisions, improve performance.
                    </p>

                    <ul className="service-outcome-list list-unstyled mt-35">
                        {outcomeItems.map((item, i) => (
                            <li key={i}>
                                <span>
                                    {/* green check icon */}
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            opacity="0.2"
                                            d="M24 12C24 13.024 22.742 13.868 22.49 14.812C22.23 15.788 22.888 17.148 22.394 18.002C21.892 18.87 20.382 18.974 19.678 19.678C18.974 20.382 18.87 21.892 18.002 22.394C17.148 22.888 15.788 22.23 14.812 22.49C13.868 22.742 13.024 24 12 24C10.976 24 10.132 22.742 9.188 22.49C8.212 22.23 6.852 22.888 5.998 22.394C5.13 21.892 5.026 20.382 4.322 19.678C3.618 18.974 2.108 18.87 1.606 18.002C1.112 17.148 1.77 15.788 1.51 14.812C1.258 13.868 0 13.024 0 12C0 10.976 1.258 10.132 1.51 9.188C1.77 8.212 1.112 6.852 1.606 5.998C2.108 5.13 3.618 5.026 4.322 4.322C5.026 3.618 5.13 2.108 5.998 1.606C6.852 1.112 8.212 1.77 9.188 1.51C10.132 1.258 10.976 0 12 0C13.024 0 13.868 1.258 14.812 1.51C15.788 1.77 17.148 1.112 18.002 1.606C18.87 2.108 18.974 3.618 19.678 4.322C20.382 5.026 21.892 5.13 22.394 5.998C22.888 6.852 22.23 8.212 22.49 9.188C22.742 10.132 24 10.976 24 12Z"
                                            fill="#00FF97"
                                        />
                                        <path
                                            d="M15.5559 9.14076L11.3992 13.178L9.24437 11.0869C8.77664 10.6326 8.01773 10.6326 7.55001 11.0869C7.08229 11.5412 7.08229 12.2783 7.55001 12.7326L10.5729 15.6686C11.0279 16.1105 11.7668 16.1105 12.2218 15.6686L17.2484 10.7864C17.7162 10.3321 17.7162 9.59504 17.2484 9.14076C16.7807 8.68648 16.0236 8.68648 15.5559 9.14076Z"
                                            fill="#00FF97"
                                        />
                                    </svg>
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ========= GALLERY ========= */}
                <GallerySection/>

            </div>

            {/* ✅ Custom lightweight modal */}
            {isOpen && (
                <div
                    className="video-popup-overlay"
                    role="dialog"
                    aria-modal="true"
                    onClick={closeVideo}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.85)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        animation: "fadeIn 0.3s ease-in-out",
                    }}
                >
                    <div
                        className="video-popup"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "relative",
                            width: "min(900px, 90vw)",
                            aspectRatio: "16 / 9",
                            background: "#000",
                            borderRadius: 12,
                            overflow: "hidden",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                        }}
                    >
                        <iframe
                            ref={iframeRef}
                            title="Ai Video"
                            width="100%"
                            height="100%"
                            src="about:blank"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            frameBorder={0}
                        />
                        <button
                            onClick={closeVideo}
                            aria-label="Close video"
                            style={{
                                position: "absolute",
                                top: 10,
                                right: 14,
                                background: "transparent",
                                color: "#fff",
                                border: 0,
                                fontSize: 24,
                                cursor: "pointer",
                                lineHeight: 1,
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ServiceDetails;
