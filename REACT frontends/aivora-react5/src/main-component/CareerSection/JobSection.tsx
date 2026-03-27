import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// Images
import jobBg from "../../images/bg/job-bg.png";
import diamondIcon from "../../images/icon/diamond-icon02.gif";

import locIcon from "../../images/icon/location-icon02.svg";
import clockIcon from "../../images/icon/clock-icon.svg";
import { Link } from "react-router-dom";

// JOB DATA
const jobs = [
  {
    id: 1,
    title: "Fintech Software Engineer",
    category: ["cat2", "cat4"],
    location: "Remote, (USA)",
    type: "Full time",
  },
  {
    id: 2,
    title: "Data Scientist (Deduplication)",
    category: ["cat1", "cat2"],
    location: "In House, (USA)",
    type: "Full time",
  },
  {
    id: 3,
    title: "AI Product Manager",
    category: ["cat1", "cat3"],
    location: "Remote, (USA)",
    type: "Full time",
  },
  {
    id: 4,
    title: "UX Designer (Financial Dashboards)",
    category: ["cat3", "cat4"],
    location: "Remote, (USA)",
    type: "Full time",
  },
  {
    id: 5,
    title: "Customer Success (Property Managers)",
    category: ["cat4", "cat1"],
    location: "Remote, (USA)",
    type: "Full time",
  },
];

const filters = [
  { label: "View all", value: "*" },
  { label: "Technical", value: "cat1" },
  { label: "Business", value: "cat2" },
  { label: "Marketing", value: "cat3" },
  { label: "Leadership", value: "cat4" },
];

const JobSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("*");
  const itemsRef = useRef<HTMLDivElement[]>([]);

  // Filtering + animation
  useEffect(() => {
    itemsRef.current.forEach((el) => {
      if (!el) return;

      const categories = el.dataset.category?.split(" ") ?? [];
      const show = activeFilter === "*" || categories.includes(activeFilter);

      // Animate show/hide with GSAP
      if (show) {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          pointerEvents: "auto",
        });
      } else {
        gsap.to(el, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          pointerEvents: "none",
        });
      }
    });
  }, [activeFilter]);

  return (
    <section
      className="job_section pt-90 pb-150 bg_img"
      style={{ backgroundImage: `url(${jobBg})` }}
    >
      <div className="container">

        {/* TITLE */}
        <div className="sec-title sec-title-center fea-sec-title text-center mb-40">
          <span className="sub-title">Open Positions</span>
          <h2 className="title">
            Be part of{" "}
            <span>
              <img src={diamondIcon} alt="icon" />
            </span>
            the team
          </h2>
        </div>

        {/* FILTER BUTTONS */}
        <div className="text-center">
          <div className="career-menu ul_li">
            {filters.map((btn, i) => (
              <button
                key={i}
                className={activeFilter === btn.value ? "active" : ""}
                onClick={() => setActiveFilter(btn.value)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* JOB GRID */}
        <div className="career-nav-wrapper grid mt-40">
          {jobs.map((job, i) => (
            <div
              key={job.id}
              ref={(el) => { itemsRef.current[i] = el!; }}
              className="xb-career-item grid-item xb-border"
              data-category={job.category.join(" ")}
              style={{ opacity: 1 }} // default visible
            >
              <div className="xb-item--content">
                <h2 className="xb-item--title">
                  <Link to="/career-details">{job.title}</Link>
                </h2>

                <ul className="xb-item--holder ul_li list-unstyled">
                  <li>
                    <img src={locIcon} alt="location" /> {job.location}
                  </li>
                  <li>
                    <img src={clockIcon} alt="clock" /> {job.type}
                  </li>
                </ul>
              </div>

              {/* BUTTON */}
              <div className="team-btn">
                <Link className="thm-btn agency-btn" to="/career-details">
                  <span className="text">view job</span>
                  <span className="arrow">
                    <span className="arrow-icon">
                      {/* Your SVG ICON */}
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JobSection;
