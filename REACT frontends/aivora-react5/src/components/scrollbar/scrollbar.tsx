import React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./style.css";

const Scrollbar: React.FC = () => {
  return (
    <div className="col-lg-12">
      <div className="header-menu">
        <ul className="smothscroll">
          <li>
            <AnchorLink
              href="#scrool"
              aria-label="Scroll to top"
              className="scroll-to-top"
            >
              <i className="ti-arrow-up" aria-hidden="true"></i>
            </AnchorLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Scrollbar;
