import React from "react";
import { Link } from "react-router-dom";

import iconCalendar from "../../images/icon/calendar-icon.svg";
import iconUserGradient from "../../images/icon/user-gradient-icon.svg";
import iconComment from "../../images/icon/comment-icon.svg";
import iconEye from "../../images/icon/eye-icon.svg";
import iconLink from "../../images/icon/link-icon.svg";
import iconBookmark from "../../images/icon/bookmark-icon.svg";

const ItemDetailsContent: React.FC = () => {
  return (
    <div className="item_details_content pb-80">
      <ul className="post_meta ul_li list-unstyled mb-25">
        <li>
          <Link to="/blog-details">
            <span className="meta_label1">#ai tools tips</span>
          </Link>
        </li>

        <li>
          <Link to="/blog-details">
            <span className="meta_icon">
              <img src={iconCalendar} alt="Calendar" />
            </span>
            <span className="meta_label">Last Update: 02/12/2025</span>
          </Link>
        </li>
      </ul>

      <h2 className="details-content-title mb-15">
        How our AI agency delivers next-gen <br /> automation tools to help
        businesses.
      </h2>

      <p className="mb-35">
        Our AI agency builds next-gen automation tools that help businesses
        streamline operations, reduce manual work, and improve overall
        efficiency...
      </p>

      {/* AUTHOR / META INFO */}
      <div className="post-meta-wrap">
        <div className="row mt-none-15">
          {/* LEFT SIDE */}
          <div className="col-md-6 mt-15">
            <ul className="post_meta list-unstyled ul_li">
              <li>
                <Link to="/blog-details">
                  <span className="meta_icon">
                    <img src={iconUserGradient} alt="User" />
                  </span>
                  <span className="meta_label">by Madura</span>
                </Link>
              </li>

              <li>
                <Link to="/blog-details">
                  <span className="meta_icon">
                    <img src={iconComment} alt="Comments" />
                  </span>
                  <span className="meta_label">50 Comments</span>
                </Link>
              </li>

              <li>
                <Link to="/blog-details">
                  <span className="meta_icon">
                    <img src={iconEye} alt="Views" />
                  </span>
                  <span className="meta_label">20k Views</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-md-6 mt-15">
            <ul className="post_meta list-unstyled ul_li justify-content-md-end">
              <li>
                <Link to="/blog-details">
                  <span className="meta_icon">
                    <img src={iconLink} alt="Copy Link" />
                  </span>
                  <span className="meta_label">Copy Link</span>
                </Link>
              </li>

              <li>
                <Link to="/blog-details">
                  <span className="meta_icon">
                    <img src={iconBookmark} alt="Bookmark" />
                  </span>
                  <span className="meta_label">Bookmark</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsContent;
