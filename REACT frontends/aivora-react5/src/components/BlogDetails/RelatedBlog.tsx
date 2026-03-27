import React from "react";
import { Link } from "react-router-dom";

// Image imports
import img02 from "../../images/blog/img02.jpg";
import img03 from "../../images/blog/img03.jpg";
import img12 from "../../images/blog/img12.jpg";

import blogIcon01 from "../../images/icon/blog-icon01.svg";
import blogIcon02 from "../../images/icon/blog-icon02.svg";

const RelatedBlog: React.FC = () => {
  return (
    <div className="related-blog pt-130">
      <h2 className="related-blog-title">Browse related blog</h2>

      <div className="row mt-none-30">

        {/* BLOG ITEM 1 */}
        <div className="col-lg-4 col-md-6 mt-30">
          <div className="xb-blog-item xb-small-blog-item">
            <div className="xb-item--inner img-hove-effect xb-border">
              <div className="xb-img">
                <Link to="/blog-details"><img src={img02} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img02} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img02} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img02} alt="bimage" /></Link>
              </div>

              <div className="xb-item--holder">
                <ul className="xb-item--meta list-unstyled ul_li">
                  <li>
                    <img src={blogIcon01} alt="icon" />
                    chatbots tips
                  </li>
                  <li>
                    <img src={blogIcon02} alt="icon" />
                    April 27, 2025
                  </li>
                </ul>

                <h2 className="xb-item--title border-effect-2">
                  <Link to="/blog-details">
                    AI chatbots vs human support which is best for?..
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* BLOG ITEM 2 */}
        <div className="col-lg-4 col-md-6 mt-30">
          <div className="xb-blog-item xb-small-blog-item">
            <div className="xb-item--inner img-hove-effect xb-border">
              <div className="xb-img">
                <Link to="/blog-details"><img src={img03} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img03} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img03} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img03} alt="bimage" /></Link>
              </div>

              <div className="xb-item--holder">
                <ul className="xb-item--meta list-unstyled ul_li">
                  <li>
                    <img src={blogIcon01} alt="icon" />
                    ai business
                  </li>
                  <li>
                    <img src={blogIcon02} alt="icon" />
                    March 17, 2025
                  </li>
                </ul>

                <h2 className="xb-item--title border-effect-2">
                  <Link to="/blog-details">
                    How E-commerce brands use AI to increase sales..
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* BLOG ITEM 3 */}
        <div className="col-lg-4 col-md-6 mt-30">
          <div className="xb-blog-item xb-small-blog-item">
            <div className="xb-item--inner img-hove-effect xb-border">
              <div className="xb-img">
                <Link to="/blog-details"><img src={img12} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img12} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img12} alt="bimage" /></Link>
                <Link to="/blog-details"><img src={img12} alt="bimage" /></Link>
              </div>

              <div className="xb-item--holder">
                <ul className="xb-item--meta list-unstyled ul_li">
                  <li>
                    <img src={blogIcon01} alt="icon" />
                    ai business tips
                  </li>
                  <li>
                    <img src={blogIcon02} alt="icon" />
                    March 22, 2025
                  </li>
                </ul>

                <h2 className="xb-item--title border-effect-2">
                  <Link to="/blog-details">
                    How AI is transforming modern business..
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RelatedBlog;
