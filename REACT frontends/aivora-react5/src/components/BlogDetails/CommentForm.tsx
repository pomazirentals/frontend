import React from "react";
import iconRotateArrow from "../../images/icon/rotate-arrow-black02.svg";

const CommentForm: React.FC = () => {
  return (
    <div className="xb-contact-form xb-comment-form xb-border">
      <div className="form-heading mb-25">
        <h3 className="title">Leave a reply</h3>
        <p className="sub-title">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>

      <form action="#!" className="xb-contact-input-form details-contact-input-form">
        <div className="row mt-none-20">

          <div className="col-lg-6 col-md-6 mt-20">
            <label htmlFor="author-name">Name*</label>
            <div className="xb-input-field">
              <input id="author-name" type="text" required />
            </div>
          </div>

          <div className="col-lg-6 col-md-6 mt-20">
            <label htmlFor="author-email">Email*</label>
            <div className="xb-input-field">
              <input id="author-email" type="email" required />
            </div>
          </div>

          <div className="col-lg-12 col-md-12 mt-20">
            <label htmlFor="message">Your Message..</label>
            <div className="xb-input-field xb-massage-field">
              <textarea id="message" required></textarea>
            </div>
          </div>

        </div>

        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="defaultCheck1" />
          <label className="form-check-label" htmlFor="defaultCheck1">
            Save my name, email, and website for next time.
          </label>
        </div>

        <div className="form-submit-btn mt-35">
          <button type="submit" className="thm-btn form-btn">
            Send your comment
            <span className="xb-icon">
              <img src={iconRotateArrow} alt="Rotate Arrow" />
              <img src={iconRotateArrow} alt="Rotate Arrow" />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
