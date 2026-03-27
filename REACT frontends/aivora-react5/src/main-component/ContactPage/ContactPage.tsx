import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import ContactInfoSection from "./ContactInfoSection";
import ContactForm from "../../components/ContactFrom/ContactForm";

// import background image
import contactBg from "../../images/bg/contact-bg02.png";

const ContactPage: React.FC = () => {
  return (
    <Fragment>
      <div className='about-page inner-page'>
        <div className="body_wrap o-clip">
          <Header />
          <main>
            <PageTitle pageTitle="Contact us" pagesub="Contact us" />
            <ContactInfoSection />
            <section className="contact">
              <div className="container">
                <div
                  className="xb-contact-wrap xb-border bg_img"
                  style={{
                    backgroundImage: `url(${contactBg})`,
                  }}
                >
                  <div className="xb-contact-form xb-main-contact xb-border">
                    <div className="form-heading text-center mb-30">
                      <h3 className="title">Ready to collaborate with us?</h3>
                      <p className="sub-title clr-white">
                        Who knows where a single message might lead you.
                      </p>
                    </div>

                    <ContactForm/>
                  </div>

                  {/* Google Map Embed */}
                  <div className="google-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.254272231177!2d90.3654215!3d23.7985508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1592852423971!5m2!1sen!2sbd"
                      loading="lazy"
                      title="gmap"
                      referrerPolicy="no-referrer-when-downgrade"
                      style={{ width: "100%", height: "100%", border: 0 }}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
          <Scrollbar />
        </div>
      </div>
    </Fragment>
  );
};

export default ContactPage;