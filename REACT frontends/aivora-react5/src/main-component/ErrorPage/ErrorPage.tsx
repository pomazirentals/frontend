import React, { Fragment } from "react";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/pagetitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <Fragment>
      <div className='about-page inner-page'>
        <div className="body_wrap o-clip">
          <Header />
          <main>
            <PageTitle pageTitle="Error 404" pagesub="404" />
            <div className="error-page">
              <div className="container not-found-content">
                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    <div className="contant-wrapper text-center">
                      <div className="error-page__text">
                        <h2>404</h2>
                      </div>
                      <div className="error-page__content mb-50">
                        <h2>Hi Sorry We Can’t Find That Page!</h2>
                        <p>Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>

                        <div className="error-page-button">
                          <Link className="thm-btn agency-btn" to="/">
                            <span className="text">Back to Home</span>
                            <span className="arrow">
                              <span className="arrow-icon">
                                <svg
                                  width="28"
                                  height="28"
                                  viewBox="0 0 28 28"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="5.06592"
                                    y="19.9785"
                                    width="20.5712"
                                    height="2.61221"
                                    transform="rotate(-40.2798 5.06592 19.9785)"
                                    fill="white"
                                  />
                                  <rect
                                    x="7.97095"
                                    y="7.24463"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 7.97095 7.24463)"
                                    fill="white"
                                  />
                                  <rect
                                    x="11.6523"
                                    y="7.54834"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 11.6523 7.54834)"
                                    fill="white"
                                  />
                                  <rect
                                    x="15.334"
                                    y="7.85205"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 15.334 7.85205)"
                                    fill="white"
                                  />
                                  <rect
                                    x="18.7119"
                                    y="11.8374"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 18.7119 11.8374)"
                                    fill="white"
                                  />
                                  <rect
                                    x="18.4084"
                                    y="15.52"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 18.4084 15.52)"
                                    fill="white"
                                  />
                                  <rect
                                    x="18.104"
                                    y="19.2012"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 18.104 19.2012)"
                                    fill="white"
                                  />
                                </svg>
                                <svg
                                  width="28"
                                  height="28"
                                  viewBox="0 0 28 28"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="5.06592"
                                    y="19.9785"
                                    width="20.5712"
                                    height="2.61221"
                                    transform="rotate(-40.2798 5.06592 19.9785)"
                                    fill="white"
                                  />
                                  <rect
                                    x="7.97095"
                                    y="7.24463"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 7.97095 7.24463)"
                                    fill="white"
                                  />
                                  <rect
                                    x="11.6523"
                                    y="7.54834"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 11.6523 7.54834)"
                                    fill="white"
                                  />
                                  <rect
                                    x="15.334"
                                    y="7.85205"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 15.334 7.85205)"
                                    fill="white"
                                  />
                                  <rect
                                    x="18.7119"
                                    y="11.8374"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 18.7119 11.8374)"
                                    fill="white"
                                  />
                                  <rect
                                    x="18.4084"
                                    y="15.52"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 18.4084 15.52)"
                                    fill="white"
                                  />
                                  <rect
                                    x="18.104"
                                    y="19.2012"
                                    width="2.61221"
                                    height="2.61221"
                                    transform="rotate(-40.2798 18.104 19.2012)"
                                    fill="white"
                                  />
                                </svg>
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <Footer />
          <Scrollbar />
        </div>
      </div>
    </Fragment>
  );
};

export default ErrorPage;