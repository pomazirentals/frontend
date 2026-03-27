import React, { useState } from "react";
import { Link } from "react-router-dom";

// ✅ Import images
import netImg from "../../../images/download/net-img.png";
import pdfBook1 from "../../../images/download/pdf-book.png";
import pdfBook2 from "../../../images/download/pdf-book02.png";
import pdfBook3 from "../../../images/download/pdf-book03.png";
import downloadIcon from "../../../images/icon/doenload-icon.svg";

const DownloadSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const bookList = [
    {
      title: "The Ultimate Guide to Smarter Marketing Campaigns",
      img: pdfBook1,
    },
    {
      title: "Audience Insights Playbook: Turning Data Into Growth",
      img: pdfBook2,
    },
    {
      title: "The Complete Handbook for Optimizing Media Performance",
      img: pdfBook3,
    },
  ];

  const handleMouseEnter = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="download pt-80">
      <div className="container-fluid">
        <div className="ai-download-wrap ul_li_between mlr-20">
          <div className="sec-title-three download-sec-title">
            <span className="sub-title mb-25">Download Guide</span>
            <h2 className="title xb-text-reveal">
              Download the Complete Playbook
            </h2>
          </div>

          <div
            className="ai-download-inner ul_li wow fadeInRightBig"
            data-wow-duration="600ms"
          >
            <div className="bg-shape">
              <img src={netImg} alt="background" />
            </div>

            <div className="ai-download-book">
              {bookList.map((book, index) => (
                <div
                  key={index}
                  className={`book-item ${
                    index === currentIndex ? "active" : ""
                  }`}
                >
                  <img src={book.img} alt={`book ${index + 1}`} />
                </div>
              ))}
            </div>

            <ul className="ai-download-book-list list-unstyled">
              {bookList.map((book, index) => (
                <li
                  key={index}
                  className={`list ${index === currentIndex ? "current" : ""}`}
                  onMouseEnter={() => handleMouseEnter(index)}
                >
                  <Link to="/service-details">
                    {book.title}
                    <img src={downloadIcon} alt="icon" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
