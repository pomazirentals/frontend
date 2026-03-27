import React from "react";
import { Link } from "react-router-dom";

// === Image Imports ===
import img01 from "../../images/career/img01.jpg";
import img02 from "../../images/career/img02.jpg";
import img03 from "../../images/career/img03.jpg";
import img04 from "../../images/career/img04.jpg";
import img05 from "../../images/career/img05.jpg";

const arrowIcon = (
  <>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5.065" y="19.978" width="20.571" height="2.612" transform="rotate(-40.2798 5.06592 19.9785)" fill="white" />
      <rect x="7.97" y="7.244" width="2.612" height="2.612" transform="rotate(-40.2798 7.97095 7.24463)" fill="white" />
      <rect x="11.65" y="7.548" width="2.612" height="2.612" transform="rotate(-40.2798 11.6523 7.54834)" fill="white" />
      <rect x="15.334" y="7.852" width="2.612" height="2.612" transform="rotate(-40.2798 15.334 7.85205)" fill="white" />
      <rect x="18.711" y="11.837" width="2.612" height="2.612" transform="rotate(-40.2798 18.7119 11.8374)" fill="white" />
      <rect x="18.408" y="15.52" width="2.612" height="2.612" transform="rotate(-40.2798 18.4084 15.52)" fill="white" />
      <rect x="18.104" y="19.201" width="2.612" height="2.612" transform="rotate(-40.2798 18.104 19.2012)" fill="white" />
    </svg>

    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect x="5.065" y="19.978" width="20.571" height="2.612" transform="rotate(-40.2798 5.06592 19.9785)" fill="white" />
      <rect x="7.97" y="7.244" width="2.612" height="2.612" transform="rotate(-40.2798 7.97095 7.24463)" fill="white" />
      <rect x="11.65" y="7.548" width="2.612" height="2.612" transform="rotate(-40.2798 11.6523 7.54834)" fill="white" />
      <rect x="15.334" y="7.852" width="2.612" height="2.612" transform="rotate(-40.2798 15.334 7.85205)" fill="white" />
      <rect x="18.711" y="11.837" width="2.612" height="2.612" transform="rotate(-40.2798 18.7119 11.8374)" fill="white" />
      <rect x="18.408" y="15.52" width="2.612" height="2.612" transform="rotate(-40.2798 18.4084 15.52)" fill="white" />
      <rect x="18.104" y="19.201" width="2.612" height="2.612" transform="rotate(-40.2798 18.104 19.2012)" fill="white" />
    </svg>
  </>
);

// === Career Image List ===
const careerImages = [img01, img02, img03, img04, img05];

const GallerySection: React.FC = () => {
  return (
    <section className="career">
      <div className="container">
        
        {/* Gallery */}
        <div className="career-gallary ul_li_between">
          {careerImages.map((image, index) => (
            <div key={index} className="xb-image-item img-hove-effect">
              <div className="xb-img">
                {[...Array(4)].map((_, i) => (
                  <Link key={i} to="/career-details">
                    <img src={image} alt="career" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="xb-career-btn text-center">
          <Link className="thm-btn agency-btn" to="/contact">
            <span className="text">Begin Today with us</span>
            <span className="arrow">
              <span className="arrow-icon">{arrowIcon}</span>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default GallerySection;
