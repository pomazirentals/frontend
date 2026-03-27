import React, { useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";

const ApplyForm: React.FC = () => {
  const [, forceUpdate] = useState(0);
  const validator = useRef(new SimpleReactValidator({ autoForceUpdate: { forceUpdate } })).current;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
    file: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id.replace("author-", "")]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validator.allValid()) {
      alert("Form submitted successfully!");
      // API submit here...
    } else {
      validator.showMessages();
      forceUpdate((n) => n + 1);
    }
  };

  return (
    <div className="xb-contact-form details-contact-form xb-border mt-100">
      <div className="form-heading mb-20">
        <h3 className="title">Apply for this job</h3>
        <p className="sub-title">
          Aivora doesn’t accept unsolicited resumes from recruiters or employment agencies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="xb-contact-input-form details-contact-input-form">
        <div className="row mt-none-20">
          
          {/* Name */}
          <div className="col-lg-6 col-md-6 mt-20">
            <label htmlFor="author-name">Your Name*</label>
            <div className="xb-input-field">
              <input
                id="author-name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
              <span className="text-danger">
                {validator.message("name", formData.name, "required|min:2")}
              </span>
            </div>
          </div>

          {/* Email */}
          <div className="col-lg-6 col-md-6 mt-20">
            <label htmlFor="author-email">Email*</label>
            <div className="xb-input-field">
              <input
                id="author-email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="text-danger">
                {validator.message("email", formData.email, "required|email")}
              </span>
            </div>
          </div>

          {/* Phone */}
          <div className="col-lg-6 col-md-6 mt-20">
            <label htmlFor="author-phone">Phone*</label>
            <div className="xb-input-field">
              <input
                id="author-phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
              />
              <span className="text-danger">
                {validator.message("phone", formData.phone, "required|min:6|max:15")}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="col-lg-6 col-md-6 mt-20">
            <label htmlFor="author-address">Address*</label>
            <div className="xb-input-field">
              <input
                id="author-address"
                type="text"
                value={formData.address}
                onChange={handleChange}
              />
              <span className="text-danger">
                {validator.message("address", formData.address, "required|min:3")}
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="col-lg-12 col-md-12 mt-20">
            <label htmlFor="massage">Message</label>
            <div className="xb-input-field xb-massage-field">
              <textarea
                id="massage"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <span className="text-danger">
                {validator.message("message", formData.message, "required|min:10")}
              </span>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div className="cp-contact-bottom ul_li_between mt-70">
          <div className="xb-upload_file">
            <label htmlFor="file">Upload your resume / CV</label>
            <input id="file" type="file" onChange={handleFileChange} />

            <p className="xb-content">
              <span>Accepted file types :</span> pdf, doc, jpg  
              <span> file size:</span> 15 MB.
            </p>

            <span className="text-danger">
              {validator.message(
                "file",
                formData.file,
                "required",
                {
                  messages: {
                    required: "Please upload a resume.",
                  },
                }
              )}
            </span>
          </div>

          {/* Submit Button */}
          <div className="form-submit-btn">
            <button className="thm-btn agency-btn" type="submit">
              <span className="text">Submit now</span>
              <span className="arrow">
                <span className="arrow-icon">
                  {/* You can keep your SVG icons */}
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="5.06" y="19.97" width="20.57" height="2.61" transform="rotate(-40.28 5.06 19.97)" fill="white"/>
                  </svg>
                </span>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplyForm;
