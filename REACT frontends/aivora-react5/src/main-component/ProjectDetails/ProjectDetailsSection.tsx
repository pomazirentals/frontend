import React from "react";

// ---- image imports ----
import img07 from "../../images/project/img07.jpg";

import icon4 from "../../images/icon/project-icon04.svg";
import icon5 from "../../images/icon/project-icon05.svg";
import icon6 from "../../images/icon/project-icon06.svg";
import icon7 from "../../images/icon/project-icon07.svg";

// ---- check icon svg ----
const CheckIcon: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
);

// ==== full component ====
const ProjectDetailsSection: React.FC = () => {
    const projectMeta = [
        { icon: icon4, label: "services :", value: "Ai solutions" },
        { icon: icon5, label: "client :", value: "Aivora" },
        { icon: icon6, label: "location :", value: "New York,NY,USA" },
        { icon: icon7, label: "completed date :", value: "20-12-2025" },
    ];

    const requirementList = [
        "Intelligent Process Automation.",
        "Smart Alerts & Notifications",
        "Real-Time Data Monitoring.",
        "Natural Language Processing (NLP)",
        "Custom Dashboard Interface.",
        "Predictive Maintenance.",
        "Supply Chain Optimization.",
        "AI-Powered Decision Support.",
    ];

    return (
        <section className="project-details pb-90">
            <div className="container">
                {/* image */}
                <div className="single-item-image mb-75">
                    <img src={img07} alt="pimage" />
                </div>

                <h2 className="details-content-title mb-15">
                    AI solutions for smarter operations.
                </h2>

                <p>
                    Our AI solutions are designed to transform how businesses operate by automating repetitive tasks, optimizing workflows, and enabling data-driven decision-making. We develop intelligent systems that adapt to your unique processes—whether it's managing supply chains, improving customer service, or enhancing internal operations. With real-time analytics, predictive insights, and seamless integrations, our solutions help reduce operational costs, increase productivity, and deliver measurable outcomes. From startups to enterprise-level organizations, we tailor each project to support long-term efficiency and scalable growth powered by smart automation and machine learning.
                </p>

                <p className="mt-30">
                    By leveraging cutting-edge technologies like machine learning, natural language processing, and real-time data processing, we ensure our AI systems evolve with your business needs. Our goal isn’t just to implement tools—it’s to empower your teams with intelligent capabilities.
                </p>

                {/* meta icons */}
                <ul className="project-meta ul_li_between mt-120">
                    {projectMeta.map((item, i) => (
                        <li key={i}>
                            <img src={item.icon} alt="icon" /> <span>{item.label}</span>{" "}
                            {item.value}
                        </li>
                    ))}
                </ul>

                {/* requirements section */}
                <div className="services-outcome-wrap mt-115 mb-125">
                    <h2 className="details-content-title mb-15">Project requirement</h2>

                    <p>
                        The project aims to develop an AI-powered solution designed to optimize business operations through intelligent automation and real-time decision-making. The system should be capable of handling large volumes of data, generating actionable insights.
                    </p>

                    <ul className="service-outcome-list project-requerment list-unstyled mt-35">
                        {requirementList.map((text, index) => (
                            <li key={index}>
                                <span>
                                    <CheckIcon />
                                </span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                <h2 className="details-content-title mb-15">Solution and result</h2>

                <p>
                    The proposed AI solution leverages advanced machine learning algorithms, real-time data analytics, and automation technologies to transform traditional operations into intelligent, adaptive processes. By integrating predictive analytics, the system anticipates potential disruptions, optimizes resource allocation, and automates routine tasks, enabling businesses to operate with greater precision and efficiency.
                </p>

                <p className="mt-30">
                    he AI-driven insights empower decision-makers to respond swiftly to changing conditions, reducing downtime and operational costs significantly. Furthermore, continuous learning capabilities ensure that the system evolves alongside the business environment.
                </p>
            </div>
        </section>
    );
};

export default ProjectDetailsSection;
