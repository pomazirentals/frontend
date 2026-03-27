import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Mark from '../components/mark'
import Card from '../components/card'
import Accordion from '../components/accordion'
import Includes from '../components/includes'
import Excludes from '../components/excludes'
import Review from '../components/review'
import Article from '../components/article'
import FAQ from '../components/faq'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container1">
      <Helmet>
        <title>Planical modern - Template</title>
        <meta property="og:title" content="Planical modern - Template" />
        <link
          rel="canonical"
          href="https://planical-modern-template-s1pglx.teleporthq.app/"
        />
        <meta
          property="og:url"
          content="https://planical-modern-template-s1pglx.teleporthq.app/"
        />
      </Helmet>
      <Navbar rootClassName="navbarroot-class-name"></Navbar>
      <label>Name</label>
      <label>Email</label>
      <animate-on-reveal delay="2s">
        <form
          data-thq-animate-on-reveal="true"
          data-form-id="22e26492-57f4-4439-a415-4f3e28c078c4"
          className="home-form"
        >
          <input
            type="text"
            id="thq_driverslicense_C7c5"
            name="driverslicense"
            tabIndex="-1"
            spellCheck="false"
            autoCorrect="off"
            placeholder="driverslicense"
            autoComplete="new-password"
            autoCapitalize="off"
            data-form-field-id="thq_driverslicense_C7c5"
            className="home-textinput1 input"
          />
          <div className="home-container2">
            <input
              type="text"
              id="thq_name_WQ82"
              name="name"
              placeholder="Name"
              data-form-field-id="thq_name_WQ82"
              className="home-textinput2 input"
            />
          </div>
          <div className="home-container3">
            <input
              type="email"
              id="thq_email_Qji7"
              name="email"
              placeholder="Email"
              data-form-field-id="thq_email_Qji7"
              className="home-textinput3 input"
            />
          </div>
        </form>
      </animate-on-reveal>
      <button
        id="thq_button_WgKE"
        name="button"
        type="submit"
        data-form-field-id="thq_button_WgKE"
        className="home-button button"
      >
        Submit
      </button>
      <section className="home-thq-section-elm10">
        <div className="home-thq-hero-elm">
          <div className="home-thq-content-elm1">
            <main className="home-thq-main-elm1">
              <header className="home-thq-header-elm10">
                <h1 className="home-thq-heading-elm10">
                  The fastest way to make a doctor appointment
                </h1>
                <span className="home-thq-caption-elm1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt.
                </span>
              </header>
              <div className="home-thq-buttons-elm1">
                <div className="home-thq-get-started-elm1 button">
                  <span className="home-thq-text-elm10">Get started</span>
                </div>
                <div className="home-thq-get-started-elm2 button">
                  <span className="home-thq-text-elm11">View features</span>
                </div>
              </div>
            </main>
            <div className="home-thq-highlight-elm">
              <div className="home-thq-avatars-elm">
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1552234994-66ba234fd567?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDN8fHBvdHJhaXR8ZW58MHx8fHwxNjY3MjQ0ODcx&amp;ixlib=rb-4.0.3&amp;w=200"
                  className="home-thq-image-elm1 avatar"
                />
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHBvdHJhaXR8ZW58MHx8fHwxNjY3MjQ0ODcx&amp;ixlib=rb-4.0.3&amp;w=200"
                  className="home-thq-image-elm2 avatar"
                />
                <img
                  alt="image"
                  src="https://images.unsplash.com/photo-1618151313441-bc79b11e5090?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDEzfHxwb3RyYWl0fGVufDB8fHx8MTY2NzI0NDg3MQ&amp;ixlib=rb-4.0.3&amp;w=200"
                  className="home-image1 avatar"
                />
              </div>
              <label className="home-thq-caption-elm2">
                Loved by 10,000+ people like you.
              </label>
            </div>
          </div>
          <div className="home-thq-image-elm3">
            <animate-on-reveal
              animation="none"
              duration="300ms"
              delay="0s"
              direction="normal"
              easing="ease"
              iteration="1"
            >
              <img
                alt="image"
                src="/SectionImages/heroimage-1500h.png"
                loading="lazy"
                data-thq-animate-on-reveal="true"
                className="home-image2"
              />
            </animate-on-reveal>
          </div>
          <div className="home-thq-image-elm4">
            <img
              alt="image"
              src="/SectionImages/heroimage-1500h.png"
              className="home-image3"
            />
          </div>
        </div>
      </section>
      <section className="home-thq-section-elm11">
        <h2 className="home-text12">
          Our doctors and therapists are here, 24/7.
        </h2>
        <div className="home-thq-features-elm1">
          <header className="feature feature-active home-thq-feature-elm1">
            <h3 className="home-text13">Urgent Care</h3>
            <p className="home-text14">Doloremque laudantium</p>
          </header>
          <header className="feature home-thq-feature-elm2">
            <h3 className="home-text15">Chronic Care</h3>
            <p className="home-text16">Doloremque laudantium</p>
          </header>
          <header className="feature home-thq-feature-elm3">
            <h3 className="home-text17">Mental Health</h3>
            <p className="home-text18">Doloremque laudantium</p>
          </header>
        </div>
        <div className="home-thq-note-elm1">
          <div className="home-thq-content-elm2">
            <main className="home-thq-main-elm2">
              <h2 className="home-thq-heading-elm11">
                Accessing this Medicare benefit is easy
              </h2>
              <p className="home-thq-paragraph-elm1">
                <span>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae.
                </span>
                <br></br>
                <br></br>
                <span>
                  Doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                  illo inventore veritatis et quasi architecto beatae.
                </span>
                <br></br>
              </p>
            </main>
            <div className="home-thq-explore-more-elm">
              <p className="home-thq-text-elm12">Explore more -&gt;</p>
            </div>
          </div>
          <div className="home-thq-image-elm5">
            <animate-on-reveal
              animation="fadeIn"
              duration="300ms"
              delay="0s"
              direction="normal"
              easing="ease"
              iteration="1"
            >
              <img
                alt="image"
                src="/SectionImages/group%201490-1200w.png"
                data-thq-animate-on-reveal="true"
                className="home-image4"
              />
            </animate-on-reveal>
          </div>
        </div>
      </section>
      <section className="home-thq-section-elm12">
        <header className="home-thq-header-elm11">
          <h2 className="home-text24">Why do you need a mobile medical app?</h2>
          <span className="home-text25">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </span>
        </header>
        <section className="home-thq-note-elm2">
          <div className="home-thq-image-elm6">
            <img
              alt="image"
              src="/SectionImages/group%201428-1200w.png"
              className="home-image5"
            />
          </div>
          <div className="home-thq-content-elm3">
            <div className="home-thq-main-elm3">
              <div className="home-thq-caption-elm3">
                <span className="section-head">Tempor incididunt</span>
              </div>
              <div className="home-thq-heading-elm12">
                <h2 className="section-heading">
                  We provide compassionate care from start to finish.
                </h2>
                <p className="section-description">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae.
                </p>
              </div>
            </div>
            <div className="home-thq-get-started-elm3 button">
              <span className="home-thq-text-elm13">Get started</span>
            </div>
          </div>
        </section>
        <section className="home-thq-note-elm3">
          <div className="home-thq-image-elm7">
            <img
              alt="image"
              src="/SectionImages/group%201449-1200w.png"
              className="home-image6"
            />
          </div>
          <div className="home-thq-content-elm4">
            <main className="home-thq-main-elm4">
              <header className="home-thq-caption-elm4">
                <span className="home-thq-section-elm14 section-head">
                  Tempor incididunt
                </span>
              </header>
              <main className="home-thq-heading-elm14">
                <header className="home-thq-header-elm12">
                  <h2 className="section-heading">
                    Great care, wherever you are
                  </h2>
                  <p className="section-description">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium.
                  </p>
                </header>
                <div className="home-thq-checkmarks-elm">
                  <Mark></Mark>
                  <Mark label="Quis nostrud exercitation ullamco"></Mark>
                  <Mark label="Reprehenderit qui in ea voluptate velit"></Mark>
                </div>
              </main>
            </main>
            <div className="home-thq-get-started-elm4 button">
              <span className="home-thq-text-elm14">Get started</span>
            </div>
          </div>
        </section>
      </section>
      <section className="home-thq-section-elm15">
        <header className="home-thq-header-elm13">
          <header className="home-thq-left-elm1">
            <span className="section-head">Tempor incididunt</span>
            <h2 className="section-heading">
              <span>Meet our network</span>
              <br></br>
              <span>of licensed providers</span>
            </h2>
          </header>
          <div className="home-thq-right-elm1">
            <p className="home-thq-paragraph-elm4 section-description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>
        </header>
        <main className="home-thq-cards-elm1">
          <Card rootClassName="cardroot-class-name"></Card>
          <Card
            icon="/Icons/group%201314-200h.png"
            rootClassName="cardroot-class-name1"
          ></Card>
          <Card
            icon="/Icons/group%201317-200h.png"
            rootClassName="cardroot-class-name2"
          ></Card>
        </main>
      </section>
      <section className="home-thq-section-elm17">
        <div className="home-thq-note-elm4">
          <div className="home-thq-image-elm8">
            <img
              alt="image"
              src="/SectionImages/iphone%2014%20pro%20max-1200w.png"
              className="home-image7"
            />
          </div>
          <div className="home-thq-content-elm5">
            <div className="home-thq-caption-elm5">
              <span className="section-head">Tempor incididunt</span>
            </div>
            <div className="home-thq-heading-elm17">
              <div className="home-thq-header-elm14">
                <h2 className="section-heading">
                  Tips to get care, answers and advice faster
                </h2>
              </div>
              <Accordion rootClassName="accordionroot-class-name"></Accordion>
            </div>
          </div>
        </div>
      </section>
      <section className="home-thq-section-elm19">
        <div className="home-thq-cube-elm1">
          <div className="home-thq-top-elm1 side"></div>
          <div className="home-thq-front-elm1 side"></div>
          <div className="home-thq-left-elm2 side"></div>
        </div>
        <main className="home-thq-banner-elm">
          <div className="home-thq-header-elm15">
            <h2 className="section-heading">
              Planical makes online doctor visits easier
            </h2>
            <p className="home-thq-description-elm1 section-description">
              Lorem ipsum dolor sit amet!
            </p>
          </div>
          <div className="home-thq-buttons-elm2">
            <div className="home-thq-get-started-elm5 button">
              <span className="home-thq-text-elm15">Get started</span>
            </div>
            <div className="home-thq-book-demo-elm button">
              <span className="home-thq-text-elm16">Book a demo</span>
            </div>
          </div>
        </main>
      </section>
      <section className="home-thq-section-elm20">
        <div className="home-thq-cube-elm2">
          <div className="home-thq-top-elm2 side"></div>
          <div className="home-thq-front-elm2 side"></div>
          <div className="home-thq-left-elm3 side"></div>
        </div>
        <main className="home-thq-pricing-elm1">
          <header className="home-thq-header-elm16">
            <header className="home-thq-left-elm4">
              <span className="section-head">Pricing</span>
              <h2 className="section-heading home-thq-heading-elm20">
                Start small, think big
              </h2>
            </header>
            <div className="home-thq-right-elm2">
              <p className="home-thq-paragraph-elm5 section-description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </div>
          </header>
          <div className="home-thq-plans-container-elm">
            <div className="home-thq-switch-elm1">
              <div className="switch">
                <label className="home-text29">Monthly</label>
              </div>
              <div className="home-thq-switch-elm3 switch">
                <label className="home-text30">Yearly</label>
              </div>
            </div>
            <main className="home-thq-plans-elm">
              <div className="home-thq-plan-elm1">
                <div className="home-thq-details-elm1">
                  <div className="home-thq-header-elm17">
                    <label className="home-thq-name-elm1">Basic</label>
                    <div className="home-thq-pricing-elm2">
                      <h1 className="home-thq-price-elm1">$9</h1>
                      <span className="home-thq-duration-elm1">/mo</span>
                    </div>
                  </div>
                  <p className="home-thq-description-elm2">
                    Good for sed quia consequuntur magni dolores eos qui
                    ratione.
                  </p>
                </div>
                <div className="home-thq-buy-details-elm1">
                  <div className="home-thq-buy-elm1 button">
                    <span className="home-thq-text-elm17">
                      <span>Start Basic</span>
                      <br></br>
                    </span>
                  </div>
                  <div className="home-thq-features-elm2">
                    <span className="home-thq-heading-elm21">You will get</span>
                    <div className="home-thq-list-elm1">
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-thq-plan-elm2">
                <div className="home-thq-details-elm2">
                  <div className="home-thq-header-elm18">
                    <label className="home-thq-name-elm2">Professional</label>
                    <div className="home-thq-pricing-elm3">
                      <h1 className="home-thq-price-elm2">$15</h1>
                      <span className="home-thq-duration-elm2">/mo</span>
                    </div>
                  </div>
                  <p className="home-thq-description-elm3">
                    Good for sed quia consequuntur magni dolores eos qui
                    ratione.
                  </p>
                </div>
                <div className="home-thq-buy-details-elm2">
                  <div className="home-thq-buy-elm2 button">
                    <span className="home-thq-text-elm18">
                      <span>Start Professional</span>
                      <br></br>
                    </span>
                  </div>
                  <div className="home-thq-features-elm3">
                    <span className="home-thq-heading-elm22">You will get</span>
                    <div className="home-thq-list-elm2">
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                      <Excludes rootClassName="excludesroot-class-name"></Excludes>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-thq-plan-elm3">
                <div className="home-thq-details-elm3">
                  <div className="home-thq-header-elm19">
                    <label className="home-thq-name-elm3">Enterprise</label>
                    <div className="home-thq-pricing-elm4">
                      <span className="home-thq-price-elm3">$99</span>
                      <span className="home-thq-duration-elm3">/mo</span>
                    </div>
                  </div>
                  <p className="home-thq-description-elm4">
                    Good for sed quia consequuntur magni dolores eos qui
                    ratione.
                  </p>
                </div>
                <div className="home-thq-buy-details-elm3">
                  <div className="home-thq-buy-elm3 button">
                    <span className="home-thq-text-elm19">
                      <span>Start Enterprise</span>
                      <br></br>
                    </span>
                  </div>
                  <div className="home-thq-features-elm4">
                    <span className="home-thq-heading-elm23">You will get</span>
                    <div className="home-thq-list-elm3">
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                      <Includes rootClassName="includesroot-class-name"></Includes>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </main>
        <div className="home-thq-help-elm">
          <span className="home-text37">
            <span>Need any help?</span>
            <br></br>
          </span>
          <div className="home-thq-contact-support-elm">
            <p className="home-thq-text-elm20">Contact support -&gt;</p>
          </div>
        </div>
      </section>
      <section className="home-thq-section-elm22">
        <header className="home-thq-header-elm20">
          <header className="home-thq-left-elm5">
            <span className="section-head">Tempor incididunt</span>
            <h2 className="home-thq-heading-elm24 section-heading">
              What users say about us
            </h2>
          </header>
          <div className="home-thq-right-elm3">
            <p className="home-thq-paragraph-elm6 section-description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam.
            </p>
          </div>
        </header>
        <main className="home-thq-cards-elm2">
          <div className="home-container4">
            <Review rootClassName="reviewroot-class-name"></Review>
            <Review
              quote="“Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.\u2028\u2028Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.”"
              rootClassName="reviewroot-class-name"
            ></Review>
          </div>
          <div className="home-container5">
            <Review
              quote="“Illum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”"
              rootClassName="reviewroot-class-name"
            ></Review>
            <Review
              quote="“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.”"
              rootClassName="reviewroot-class-name"
            ></Review>
          </div>
          <div className="home-container6">
            <Review
              quote="“Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.”"
              rootClassName="reviewroot-class-name"
            ></Review>
            <Review
              quote="“Doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.”"
              rootClassName="reviewroot-class-name"
            ></Review>
          </div>
        </main>
        <div className="home-thq-view-more-elm">
          <p className="home-thq-text-elm21">View more</p>
        </div>
      </section>
      <section className="home-thq-section-elm24">
        <header className="home-thq-header-elm21">
          <span className="section-head">Articles about us</span>
          <h2 className="home-thq-heading-elm25 section-heading">
            We’re the app on everyone’s lips
          </h2>
        </header>
        <main className="home-thq-cards-elm3">
          <Article rootClassName="articleroot-class-name"></Article>
          <Article
            header="techeu"
            specialHeader="eu"
            rootClassName="articleroot-class-name"
          ></Article>
          <Article
            header="sifted/"
            rootClassName="articleroot-class-name"
          ></Article>
        </main>
      </section>
      <section className="home-thq-section-elm26">
        <header className="home-thq-header-elm22">
          <span className="section-head">FAQ</span>
          <h2 className="home-thq-heading-elm26 section-heading">
            Frequently asked questions
          </h2>
        </header>
        <main className="home-thq-accordion-elm">
          <FAQ rootClassName="fa-qroot-class-name"></FAQ>
        </main>
      </section>
      <section className="home-thq-section-elm28">
        <main className="home-thq-content-elm6">
          <header className="home-thq-header-elm23">
            <h2 className="home-thq-heading-elm27 section-heading">
              Stop searching online for medications and use Planical app!
            </h2>
            <div className="home-thq-buttons-elm3">
              <div className="home-thq-ios-elm button">
                <img
                  alt="image"
                  src="/Icons/apple-200w.png"
                  className="home-thq-icon-elm1"
                />
                <span className="home-thq-text-elm22">Download for iOS</span>
              </div>
              <div className="home-thq-android-elm button">
                <img
                  alt="image"
                  src="/Icons/android-200h.png"
                  className="home-thq-icon-elm2"
                />
                <span className="home-thq-text-elm23">
                  Download for Android
                </span>
              </div>
            </div>
          </header>
          <img
            alt="image"
            src="/SectionImages/group%201505-1200w.png"
            className="home-image8"
          />
        </main>
      </section>
      <footer className="home-thq-footer-elm">
        <div className="home-thq-content-elm7">
          <main className="home-thq-main-content-elm">
            <div className="home-thq-content-elm8">
              <header className="home-thq-main-elm5">
                <div className="home-thq-header-elm24">
                  <img
                    alt="image"
                    src="/Branding/planical7012-ttpb.svg"
                    className="home-thq-branding-elm"
                  />
                  <span className="home-thq-text-elm24">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </span>
                </div>
                <div className="home-thq-socials-elm">
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="home-link1"
                  >
                    <img
                      alt="image"
                      src="/Icons/linkedin-200h.png"
                      className="social"
                    />
                  </a>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="home-link2"
                  >
                    <img
                      alt="image"
                      src="/Icons/instagram-200h.png"
                      className="social"
                    />
                  </a>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="home-link3"
                  >
                    <img
                      alt="image"
                      src="/Icons/twitter-200h.png"
                      className="social"
                    />
                  </a>
                </div>
              </header>
              <header className="home-thq-categories-elm">
                <div className="home-thq-category-elm1">
                  <div className="home-thq-header-elm25">
                    <span className="footer-header">Solutions</span>
                  </div>
                  <div className="home-thq-links-elm1">
                    <span className="footer-link">Responsive Web Design</span>
                    <span className="footer-link">Responsive Prototypes</span>
                    <span className="footer-link">Design to Code</span>
                    <span className="footer-link">Static Website Builder</span>
                    <span className="footer-link">
                      Static Website Generator
                    </span>
                  </div>
                </div>
                <div className="home-thq-category-elm2">
                  <div className="home-thq-header-elm26">
                    <span className="footer-header">Company</span>
                  </div>
                  <div className="home-thq-links-elm2">
                    <span className="footer-link">About</span>
                    <span className="footer-link">Team</span>
                    <span className="footer-link">News</span>
                    <span className="footer-link">Partners</span>
                    <span className="footer-link">Careers</span>
                    <span className="footer-link">Press &amp; Media</span>
                  </div>
                </div>
              </header>
            </div>
            <section className="home-thq-copyright-elm1">
              <span className="home-text40">
                © 2022 latitude. All Rights Reserved.
              </span>
            </section>
          </main>
          <main className="home-thq-subscribe-elm">
            <main className="home-thq-main-elm6">
              <h1 className="home-thq-heading-elm28">
                Subscribe to our newsletter
              </h1>
              <div className="home-thq-input-field-elm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="home-textinput4 input"
                />
                <div className="home-thq-buy-elm4 button">
                  <span className="home-thq-text-elm38">-&gt;</span>
                  <span className="home-thq-text-elm39">
                    <span>Subscribe now</span>
                    <br></br>
                  </span>
                </div>
              </div>
            </main>
            <h1 className="home-thq-notice-elm">
              By subscribing to our newsletter you agree with our Terms and
              Conditions.
            </h1>
          </main>
          <section className="home-thq-copyright-elm2">
            <span className="home-text43">
              © 2022 latitude. All Rights Reserved.
            </span>
          </section>
        </div>
      </footer>
      <div>
        <div className="home-container8">
          <Script
            html={`<script>
    /*
Accordion - Code Embed
*/

/* listenForUrlChangesAccordion() makes sure that if you changes pages inside your app,
the Accordions will still work*/

const listenForUrlChangesAccordion = () => {
      let url = location.href;
      document.body.addEventListener(
        "click",
        () => {
          requestAnimationFrame(() => {
            if (url !== location.href) {
              runAccordionCodeEmbed();
              url = location.href;
            }
          });
        },
        true
      );
    };


const runAccordionCodeEmbed = () => {
    const accordionContainers = document.querySelectorAll('[data-role="accordion-container"]'); // All accordion containers
    const accordionContents = document.querySelectorAll('[data-role="accordion-content"]'); // All accordion content
    const accordionIcons = document.querySelectorAll('[data-role="accordion-icon"]'); // All accordion icons

    accordionContents.forEach((accordionContent) => {
        accordionContent.style.display = "none"; //Hides all accordion contents
    });

    accordionContainers.forEach((accordionContainer, index) => {
        accordionContainer.addEventListener("click", () => {
            accordionContents.forEach((accordionContent) => {
            accordionContent.style.display = "none"; //Hides all accordion contents
            });

            accordionIcons.forEach((accordionIcon) => {
                accordionIcon.style.transform = "rotate(0deg)"; // Resets all icon transforms to 0deg (default)
            });

            accordionContents[index].style.display = "flex"; // Shows accordion content
            accordionIcons[index].style.transform = "rotate(180deg)"; // Rotates accordion icon 180deg
        });
    });
}

runAccordionCodeEmbed()
listenForUrlChangesAccordion()

/*
Here's what the above is doing:
    1. Selects all accordion containers, contents, and icons
    2. Hides all accordion contents
    3. Adds an event listener to each accordion container
    4. When an accordion container is clicked, it:
        - Hides all accordion contents
        - Resets all icon transforms to 0deg (default)
        - Checks if this container has class "accordion-open"
            - If it does, it removes class "accordion-open"
            - If it doesn't, it:
                - Removes class "accordion-open" from all containers
                - Adds class "accordion-open" to this container
                - Shows accordion content
                - Rotates accordion icon 180deg
*/
</script>`}
          ></Script>
        </div>
      </div>
      <a href="https://play.teleporthq.io/signup" className="home-link4">
        <div aria-label="Sign up to TeleportHQ" className="home-container9">
          <svg
            width="24"
            height="24"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="home-icon1"
          >
            <path
              d="M9.1017 4.64355H2.17867C0.711684 4.64355 -0.477539 5.79975 -0.477539 7.22599V13.9567C-0.477539 15.3829 0.711684 16.5391 2.17867 16.5391H9.1017C10.5687 16.5391 11.7579 15.3829 11.7579 13.9567V7.22599C11.7579 5.79975 10.5687 4.64355 9.1017 4.64355Z"
              fill="#B23ADE"
            ></path>
            <path
              d="M10.9733 12.7878C14.4208 12.7878 17.2156 10.0706 17.2156 6.71886C17.2156 3.3671 14.4208 0.649963 10.9733 0.649963C7.52573 0.649963 4.73096 3.3671 4.73096 6.71886C4.73096 10.0706 7.52573 12.7878 10.9733 12.7878Z"
              fill="#FF5C5C"
            ></path>
            <path
              d="M17.7373 13.3654C19.1497 14.1588 19.1497 15.4634 17.7373 16.2493L10.0865 20.5387C8.67402 21.332 7.51855 20.6836 7.51855 19.0968V10.5141C7.51855 8.92916 8.67402 8.2807 10.0865 9.07221L17.7373 13.3654Z"
              fill="#2874DE"
            ></path>
          </svg>
          <span className="home-text44">Built in TeleportHQ</span>
        </div>
      </a>
    </div>
  )
}

export default Home
