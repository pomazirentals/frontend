import React from "react";
import { Link } from "react-router-dom";

import avatar2 from "../../images/avatar/author-img02.png";
import avatar3 from "../../images/avatar/author-img03.png";
import avatar4 from "../../images/avatar/author-img04.png";

const CommentsArea: React.FC = () => {
  return (
    <div className="comment_area mb-70">
      <h3 className="comment-title">Comments (3)</h3>

      <ul className="comments_list unordered_list_block list-unstyled">

        {/* COMMENT 1 */}
        <li>
          <div className="comment_item">
            <div className="comment_author_thumbnail">
              <img src={avatar2} alt="Avatar" />
            </div>

            <div className="comment_author_content">
              <h4 className="comment_author_name">Ethan Reynolds</h4>
              <div className="comment_time">November 24, 2025</div>
              <p>“Their next-gen AI solutions helped us cut operational costs while improving accuracy. The integration with our existing systems was smooth and efficient.”</p>

              <Link to="/blod-details" className="comment_reply_btn xb-border">
                Reply
              </Link>
            </div>
          </div>

          {/* REPLY TO COMMENT 1 */}
          <ul className="comments_list unordered_list_block list-unstyled">
            <li>
              <div className="comment_item">
                <div className="comment_author_thumbnail">
                  <img src={avatar3} alt="Avatar" />
                </div>

                <div className="comment_author_content">
                  <h4 className="comment_author_name">Priya Ramirez</h4>
                  <div className="comment_time">November 26, 2025</div>
                  <p>“Their team took the time to understand our challenges and delivered tailored automation tools that truly elevated our business processes.”</p>

                  <Link to="/blod-details" className="comment_reply_btn xb-border">
                    Reply
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </li>

        {/* COMMENT 2 */}
        <li>
          <div className="comment_item">
            <div className="comment_author_thumbnail">
              <img src={avatar4} alt="Avatar" />
            </div>

            <div className="comment_author_content">
              <h4 className="comment_author_name">Carter Vaughn</h4>
              <div className="comment_time">November 28, 2025</div>
              <p>“This agency’s automation tools scaled effortlessly with our growing business needs. Their expertise made the entire process hassle-free and rewarding.”</p>

              <Link to="/blod-details" className="comment_reply_btn xb-border">
                Reply
              </Link>
            </div>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default CommentsArea;
