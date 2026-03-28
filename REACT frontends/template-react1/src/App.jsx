import React from 'react';
import { tenantConfig } from './config/tenantConfig';


function App() {
  return (
    <>
      

        {/*  Preloader Start  */}
        <div id="preloader" className="preloader">
            <div className="animation-preloader">
                <div className="spinner">                
                </div>
                <div className="txt-loading">
                    <span data-text-preloader="G" className="letters-loading">
                        G
                    </span>
                    <span data-text-preloader="R" className="letters-loading">
                        R
                    </span>
                    <span data-text-preloader="I" className="letters-loading">
                        I
                    </span>
                    <span data-text-preloader="D" className="letters-loading">
                        D
                    </span>
                    <span data-text-preloader="T" className="letters-loading">
                        T
                    </span>
                    <span data-text-preloader="E" className="letters-loading">
                        E
                    </span>
                     <span data-text-preloader="C" className="letters-loading">
                        C
                    </span>
                     <span data-text-preloader="H" className="letters-loading">
                        H
                    </span>
                </div>
                <p className="text-center">Loading</p>
            </div>
            <div className="loader">
                <div className="row">
                    <div className="col-3 loader-section section-left">
                        <div className="bg"></div>
                    </div>
                    <div className="col-3 loader-section section-left">
                        <div className="bg"></div>
                    </div>
                    <div className="col-3 loader-section section-right">
                        <div className="bg"></div>
                    </div>
                    <div className="col-3 loader-section section-right">
                        <div className="bg"></div>
                    </div>
                </div>
            </div>
        </div>

        {/*  Back To Top Start  */}
        <button id="back-top" className="back-to-top">
            <i className="fa-regular fa-arrow-up"></i>
        </button>

        {/*  GT MouseCursor Start  */}
        <div className="mouseCursor cursor-outer"></div>
        <div className="mouseCursor cursor-inner"></div>

        {/*  Offcanvas Area Start  */}
        <div className="fix-area">
            <div className="offcanvas__info">
                <div className="offcanvas__wrapper">
                    <div className="offcanvas__content">
                        <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                            <div className="offcanvas__logo">
                                <a href="index.html">
                                    <img src="assets/img/logo/white-logo.svg" alt="logo-img" />
                                </a>
                            </div>
                            <div className="offcanvas__close">
                                <button>
                                <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <p className="text d-none d-xl-block">
                            Nullam dignissim, ante scelerisque the  is euismod fermentum odio sem semper the is erat, a feugiat leo urna eget eros. Duis Aenean a imperdiet risus.
                        </p>
                        <div className="mobile-menu fix mb-3"></div>
                        <div className="offcanvas__contact">
                            <h4>Contact Info</h4>
                            <ul>
                                <li className="d-flex align-items-center">
                                    <div className="offcanvas__contact-icon">
                                        <i className="fal fa-map-marker-alt"></i>
                                    </div>
                                    <div className="offcanvas__contact-text">
                                        <a target="_blank" href="#">Main Street, Melbourne, Australia</a>
                                    </div>
                                </li>
                                <li className="d-flex align-items-center">
                                    <div className="offcanvas__contact-icon mr-15">
                                        <i className="fal fa-envelope"></i>
                                    </div>
                                    <div className="offcanvas__contact-text">
                                        <a href="mailto:info@example.com"><span className="mailto:info@example.com">info@example.com</span></a>
                                    </div>
                                </li>
                                <li className="d-flex align-items-center">
                                    <div className="offcanvas__contact-icon mr-15">
                                        <i className="fal fa-clock"></i>
                                    </div>
                                    <div className="offcanvas__contact-text">
                                        <a target="_blank" href="#">Mod-friday, 09am -05pm</a>
                                    </div>
                                </li>
                                <li className="d-flex align-items-center">
                                    <div className="offcanvas__contact-icon mr-15">
                                        <i className="far fa-phone"></i>
                                    </div>
                                    <div className="offcanvas__contact-text">
                                        <a href="tel:+11002345909">+11002345909</a>
                                    </div>
                                </li>
                            </ul>
                            <a className="gt-theme-btn-main mt-4" href={tenantConfig.contact_url}>
                                <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                <span className="gt-theme-btn">Get Started Now</span>
                                <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                            </a>
                            <div className="social-icon d-flex align-items-center">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="#"><i className="fab fa-youtube"></i></a>
                                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="offcanvas__overlay"></div>

        {/*  Header Section Start  */}
        <header className="header-section-2">
            <div id="header-sticky" className="header-2">
                <div className="container">
                    <div className="mega-menu-wrapper">
                        <div className="header-main">
                            <a href="index.html" className="logo">
                                <img src="assets/img/logo/white-logo.svg" alt="img" />
                            </a>
                            <div className="header-left">
                                <div className="mean__menu-wrapper">
                                    <div className="main-menu">
                                        <nav id="mobile-menu">
                                            <ul>
                                                <li className="has-dropdown active menu-thumb">
                                                    <a href="javascript:void(0)">
                                                        Home 
                                                        <i className="fa-solid fa-chevron-down"></i>
                                                    </a>
                                                    <ul className="submenu has-homemenu">
                                                        <li>
                                                            <div className="homemenu-items">
                                                                <div className="row">
                                                                    <div className="col-lg-4 homemenu">
                                                                        <div className="homemenu-thumb">
                                                                            <img src="assets/img/header/home-1.jpg" alt="img" />
                                                                            <div className="demo-button">
                                                                                 <a className="gt-theme-btn-main" href="index.html">
                                                                                    <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                                                                    <span className="gt-theme-btn">Demo Page</span>
                                                                                    <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="homemenu-content text-center">
                                                                            <h4 className="homemenu-title">
                                                                                <a href="index.html">
                                                                                   Home 01
                                                                                </a>
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 homemenu">
                                                                        <div className="homemenu-thumb mb-15">
                                                                        <img src="assets/img/header/home-2.jpg" alt="img" />
                                                                            <div className="demo-button ">
                                                                                <a className="gt-theme-btn-main" href="index-2.html">
                                                                                    <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                                                                    <span className="gt-theme-btn">Demo Page</span>
                                                                                    <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="homemenu-content text-center">
                                                                            <h4 className="homemenu-title">
                                                                                <a href="index-2.html">
                                                                                    Home 02
                                                                                </a>
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 homemenu">
                                                                        <div className="homemenu-thumb mb-15">
                                                                            <img src="assets/img/header/home-3.jpg" alt="img" />
                                                                            <div className="demo-button ">
                                                                                <a className="gt-theme-btn-main" href="index-3.html">
                                                                                    <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                                                                    <span className="gt-theme-btn">Demo Page</span>
                                                                                    <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                        <div className="homemenu-content text-center">
                                                                            <h4 className="homemenu-title">
                                                                                <a href="index-3.html">
                                                                                    Home 03
                                                                                </a>
                                                                            </h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="has-dropdown active d-xl-none">
                                                    <a href="javascript:void(0)" className="border-none">
                                                        Home
                                                    </a>
                                                    <ul className="submenu">
                                                        <li><a href="index.html">Home 01</a></li>
                                                        <li><a href="index-2.html">Home 02</a></li>
                                                        <li><a href="index-3.html">Home 03</a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href="about.html">About Us</a>
                                                </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        Services
                                                        <i className="fa-solid fa-chevron-down"></i>
                                                    </a>
                                                    <ul className="submenu">
                                                        <li><a href="service.html">Service Page</a></li>
                                                        <li><a href="service-details.html">Service Details</a></li>
                                                    </ul>
                                                </li>
                                                 <li className="has-dropdown">
                                                <a href="javascript:void(0)">
                                                    Pages
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </a>
                                                <ul className="submenu">
                                                    <li className="has-dropdown">
                                                        <a href="javascript:void(0)">
                                                            Projects
                                                            <i className="fas fa-angle-right"></i>
                                                        </a>
                                                        <ul className="submenu">
                                                            <li><a href="project.html">Project page</a></li>
                                                            <li><a href="project-details.html">Project Details</a></li>
                                                        </ul>
                                                    </li>  
                                                    <li className="has-dropdown">
                                                        <a href="javascript:void(0)">
                                                            Our Team
                                                            <i className="fas fa-angle-right"></i>
                                                        </a>
                                                        <ul className="submenu">
                                                            <li><a href="team.html">Our Team</a></li>
                                                            <li><a href="team-details.html">Team Details</a></li>
                                                        </ul>
                                                    </li>  
                                                    <li><a href={tenantConfig.pricing_url}>pricing Page</a></li>
                                                    <li><a href="faq.html">faq Page</a></li>
                                                    <li><a href="404.html">404 Page</a></li>
                                                </ul>
                                            </li>
                                                <li>
                                                    <a href="javascript:void(0)">
                                                        Blog
                                                        <i className="fa-solid fa-chevron-down"></i>
                                                    </a>
                                                    <ul className="submenu">
                                                        <li><a href="news-grid.html">Blog Grid</a></li>
                                                        <li><a href="news.html">Blog Standard</a></li>
                                                        <li><a href="news-details.html">Blog Details</a></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <a href={tenantConfig.contact_url}>Contact Us</a>
                                                </li>
                                            <li><a href={tenantConfig.report_url}>Report Form</a></li>
                                            <li><a href={tenantConfig.login_url}>Login</a></li>
                                                <li><a href={tenantConfig.register_url}>Register</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="header-right d-flex justify-content-end align-items-center">
                                <a href="#" className="main-header__search search-toggler">
                                    <i className="fa-regular fa-magnifying-glass"></i>
                                </a>
                                
                                <div className="header__hamburger my-auto">
                                    <div className="sidebar__toggle">
                                        <div className="gt-theme-btn-main">
                                            <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-ellipsis-vertical"></i> </span>
                                            <span className="gt-theme-btn">Menu</span>
                                            <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-ellipsis-vertical"></i> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    
        {/*  Search Start  */}
        <div className="search-popup">
            <div className="search-popup__overlay search-toggler"></div>
            <div className="search-popup__content style-2">
                <form role="search" method="get" className="search-popup__form" action="#">
                    <input type="text" id="search" name="search" placeholder="Search Here..." />
                    <button type="submit" aria-label="search submit" className="search-btn">
                        <span><i className="fa-regular fa-magnifying-glass"></i></span>
                    </button>
                </form>
            </div>
        </div>
       
        <div id="smooth-wrapper">
            <div id="smooth-content">

                {/*  Hero Section Start  */}
                <section className="hero-section-2 hero-2 section-bg-3 bg-cover" style={{"backgroundImage":"url('assets/img/home-2/hero/dot-shape.png')"}}>
                    <div className="hero-light d-none d-xl-block">
                        <img src="assets/img/home-2/hero/hero-light.png" alt="img" />
                    </div>
                    <div className="right-shape d-none d-xl-block">
                        <img src="assets/img/home-2/hero/right-shape.png" alt="img" />
                    </div>
                    <div className="container">
                        <div className="hero-content">
                            <div className="text-center">
                                <h6 className="wow fadeInUp" data-wow-delay=".3s">
                                    AI Startup on market <img src="assets/img/home-2/hero/hero-info.png" alt="img" />
                                </h6>
                            </div>
                             <h1 className="text-anim">
                                T HE M E L O C K . C O M  <br />  Your Business.
                            </h1>
                            <p className="wow fadeInUp" data-wow-delay=".5s">
                                Provide data-driven strategie to help companies identify opportunities, reduce risks, and achieve long-term of our growth.
                            </p>
                            <a className="gt-theme-btn-main wow fadeInUp" data-wow-delay=".7s" href={tenantConfig.contact_url}>
                                <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                <span className="gt-theme-btn">Get Started Now</span>
                                <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                            </a>
                        </div>
                    </div>
                    <div className="hero-banner-items section-padding pb-0">
                        <div className="row g-4">
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                                <div className="hero-image-items tp-costom-wrapper-hover">
                                    <img src="assets/img/home-2/hero/hero-image-1.jpg" alt="img" />
                                    <h3>
                                        Our impact in <br /> numbers
                                    </h3>
                                    <div className="content">
                                        <h2><span className="count">800</span>+</h2>
                                        <p>Innovative solutions built for global founders.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                                <div className="hero-image-items">
                                    <img src="assets/img/home-2/hero/hero-2.jpg" alt="img" />
                                    <h3>
                                       Innovative solutions for modern  businesses success. Innovative <br /> solution modern global
                                    </h3>
                                    <div className="content">
                                        <a href="about.html" className="link-btn"><i className="fa-solid fa-arrow-up-right"></i> Learn more</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                                <div className="hero-image-items">
                                    <img src="assets/img/home-2/hero/hero-image-3.jpg" alt="img" />
                                    <div className="video-text">
                                        <span>Play</span>
                                        <a href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" className="video-btn ripple video-popup">
                                            <i className="fa-solid fa-play"></i>
                                        </a>
                                        <span>Reel.</span>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  How Work Section Start  */}
                <section className="how-work-section fix section-padding">
                    <div className="container">
                        <div className="section-title text-center">
                            <h6 className="sub-title wow fadeInUp">
                            // How It Works
                            </h6>
                            <h2 className="text-anim">
                             How Our AI-Powered Process  Ideas <br /> Into Real-World Solutions
                            </h2>
                        </div>
                        <div className="row">
                            {/*  Box 1  */}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow bounceInUp" data-wow-delay="300ms" data-wow-duration="1000ms">
                                <div className="gt-feature-box-items">
                                    <div className="gt-number-box">
                                        <span>01</span>
                                        <div className="bg-border-style"></div>
                                        <div className="icon-bg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="134" height="140" viewBox="0 0 134 140" fill="none">
                                                <path d="M61.8468 41.8868C64.9408 40.1004 68.7528 40.1004 71.8468 41.8868L88.6936 51.6132C91.7876 53.3996 93.6936 56.7008 93.6936 60.2735V79.7265C93.6936 83.2992 91.7876 86.6004 88.6936 88.3868L71.8468 98.1132C68.7528 99.8996 64.9408 99.8996 61.8468 98.1132L45 88.3867C41.906 86.6004 40 83.2992 40 79.7265V60.2735C40 56.7008 41.906 53.3996 45 51.6132L61.8468 41.8868Z" fill="url(#paint0_linear_1)"></path>
                                                <path d="M62.0967 42.3193C65.0359 40.6224 68.6575 40.6225 71.5967 42.3193L88.4434 52.0459C91.3827 53.7429 93.1933 56.8794 93.1934 60.2734V79.7266C93.1933 83.1206 91.3827 86.2571 88.4434 87.9541L71.5967 97.6807C68.6575 99.3775 65.0359 99.3776 62.0967 97.6807L45.25 87.9541C42.3107 86.2571 40.5 83.1206 40.5 79.7266V60.2734C40.5 56.9856 42.1993 53.94 44.9775 52.21L45.25 52.0459L62.0967 42.3193Z" stroke="url(#paint1_linear_1)"></path>
                                                <defs>
                                                    <linearGradient id="paint0_linear_1" x1="40" y1="60" x2="94" y2="88" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0%" stop-color="#8339ff"></stop>
                                                        <stop offset="100%" stop-color="#8339ff"></stop>
                                                    </linearGradient>
                                                    <linearGradient id="paint1_linear_1" x1="66.8468" y1="39" x2="66.8468" y2="101" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0%" stop-color="#8339ff"></stop>
                                                        <stop offset="100%" stop-color="#8339ff"></stop>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3>We Build the AI Solution</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                                    <div className="hover-lines"></div>
                                </div>
                            </div>

                            {/*  Box 2  */}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow bounceInUp" data-wow-delay="500ms" data-wow-duration="1000ms">
                                <div className="gt-feature-box-items style-height-1">
                                    <div className="gt-number-box">
                                        <span>02</span>
                                        <div className="bg-border-style"></div>
                                        <div className="icon-bg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="134" height="140" viewBox="0 0 134 140" fill="none">
                                                <path d="M61.8468 41.8868C64.9408 40.1004 68.7528 40.1004 71.8468 41.8868L88.6936 51.6132C91.7876 53.3996 93.6936 56.7008 93.6936 60.2735V79.7265C93.6936 83.2992 91.7876 86.6004 88.6936 88.3868L71.8468 98.1132C68.7528 99.8996 64.9408 99.8996 61.8468 98.1132L45 88.3867C41.906 86.6004 40 83.2992 40 79.7265V60.2735C40 56.7008 41.906 53.3996 45 51.6132L61.8468 41.8868Z" fill="url(#paint0_linear_2)"></path>
                                                <path d="M62.0967 42.3193C65.0359 40.6224 68.6575 40.6225 71.5967 42.3193L88.4434 52.0459C91.3827 53.7429 93.1933 56.8794 93.1934 60.2734V79.7266C93.1933 83.1206 91.3827 86.2571 88.4434 87.9541L71.5967 97.6807C68.6575 99.3775 65.0359 99.3776 62.0967 97.6807L45.25 87.9541C42.3107 86.2571 40.5 83.1206 40.5 79.7266V60.2734C40.5 56.9856 42.1993 53.94 44.9775 52.21L45.25 52.0459L62.0967 42.3193Z" stroke="url(#paint1_linear_2)"></path>
                                                <defs>
                                                    <linearGradient id="paint0_linear_2" x1="40" y1="60" x2="94" y2="88" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0%" stop-color="#8339ff"></stop>
                                                        <stop offset="100%" stop-color="#8339ff"></stop>
                                                    </linearGradient>
                                                    <linearGradient id="paint1_linear_2" x1="66.8468" y1="39" x2="66.8468" y2="101" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0%" stop-color="#8339ff"></stop>
                                                        <stop offset="100%" stop-color="#8339ff"></stop>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3>Discover Your AI Potential</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                                    <div className="hover-lines"></div>
                                </div>
                            </div>

                            {/*  Box 3  */}
                            <div className="col-xl-4 col-lg-6 col-md-6 wow bounceInUp" data-wow-delay="700ms" data-wow-duration="1000ms">
                                <div className="gt-feature-box-items style-height-2">
                                    <div className="gt-number-box">
                                        <span>03</span>
                                        <div className="bg-border-style"></div>
                                        <div className="icon-bg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="134" height="140" viewBox="0 0 134 140" fill="none">
                                                <path d="M61.8468 41.8868C64.9408 40.1004 68.7528 40.1004 71.8468 41.8868L88.6936 51.6132C91.7876 53.3996 93.6936 56.7008 93.6936 60.2735V79.7265C93.6936 83.2992 91.7876 86.6004 88.6936 88.3868L71.8468 98.1132C68.7528 99.8996 64.9408 99.8996 61.8468 98.1132L45 88.3867C41.906 86.6004 40 83.2992 40 79.7265V60.2735C40 56.7008 41.906 53.3996 45 51.6132L61.8468 41.8868Z" fill="url(#paint0_linear_3)"></path>
                                                <path d="M62.0967 42.3193C65.0359 40.6224 68.6575 40.6225 71.5967 42.3193L88.4434 52.0459C91.3827 53.7429 93.1933 56.8794 93.1934 60.2734V79.7266C93.1933 83.1206 91.3827 86.2571 88.4434 87.9541L71.5967 97.6807C68.6575 99.3775 65.0359 99.3776 62.0967 97.6807L45.25 87.9541C42.3107 86.2571 40.5 83.1206 40.5 79.7266V60.2734C40.5 56.9856 42.1993 53.94 44.9775 52.21L45.25 52.0459L62.0967 42.3193Z" stroke="url(#paint1_linear_3)"></path>
                                                <defs>
                                                    <linearGradient id="paint0_linear_3" x1="40" y1="60" x2="94" y2="88" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0%" stop-color="#8339ff"></stop>
                                                        <stop offset="100%" stop-color="#8339ff"></stop>
                                                    </linearGradient>
                                                    <linearGradient id="paint1_linear_3" x1="66.8468" y1="39" x2="66.8468" y2="101" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0%" stop-color="#8339ff"></stop>
                                                        <stop offset="100%" stop-color="#8339ff"></stop>
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </div>
                                    </div>
                                    <h3>Transform & Grow Smarter</h3>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered</p>
                                    <div className="hover-lines"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  About Section Start  */}
                <section className="about-section-2 section-padding">
                    <div className="about-ellipse">
                        <img src="assets/img/home-1/about/ellipse-bg.png" alt="" />
                    </div>
                    <div className="container">
                        <div className="about-wrapper-2">
                            <div className="row g-4 align-items-end">
                                <div className="col-lg-5">
                                   <div className="about-image-items">
                                        <div className="thumb h-100 fix">
                                            <img src="assets/img/home-1/about/about-image.jpg" alt="img" className="wow fadeInUp img-custom-anim-left" />
                                        </div>
                                        <div className="content">
                                            <h3>
                                                Our Misson & Vission
                                            </h3>
                                            <p>
                                                Provide data-driven stratege help companies identifies opportunities, reduce risk and achieve long term of our growth. Provide driven on strategie.
                                            </p>
                                        </div>
                                   </div> 
                                </div>
                                <div className="col-lg-7">
                                    <div className="about-content">
                                        <div className="section-title mb-0">
                                            <h6 className="sub-title wow fadeInUp">
                                            // ABOUT OUR COMPANY
                                            </h6>
                                            <h2 className="text-anim">
                                                Empowering the Future with AI Innovation
                                                Smart, Efficient & Scalable Digital Solutions
                                                Built to Transform Modern Businesses
                                            </h2>
                                        </div>
                                        <div className="about-list-item wow fadeInUp" data-wow-delay=".3s">
                                            <ul>
                                                <li>
                                                    <i className="fa-solid fa-circle-check"></i>
                                                   Personalization at an Intelligent AI-Driven Scale
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-circle-check"></i>
                                                   Improved Customer Retention with Predictive AI Insights
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-circle-check"></i>
                                                  Seamless AI Integration for Scalable Digital Growth
                                                </li>
                                            </ul>
                                            <a className="gt-theme-btn-main wow fadeInUp" data-wow-delay=".3s" href="about.html">
                                                <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                                <span className="gt-theme-btn">About More Us</span>
                                                <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/*  Service Section Start  */}
                <section className="service-section11 fix section-bg section-padding pb-0">
                    <div className="container">
                        <div className="row g-4">
                            <div className="col-lg-5">
                                <div className="service-left-items">
                                    <div className="section-title mb-0">
                                        <h6 className="sub-title wow fadeInUp">
                                            // Our Best Services
                                        </h6>
                                        <h2 className="text-anim">
                                            AI-Powered Services Designed to Accelerate Your Business Growth
                                        </h2>
                                    </div>
                                    <a className="gt-theme-btn-main wow fadeInUp" data-wow-delay=".3s" href="service.html">
                                        <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                        <span className="gt-theme-btn">View More Services</span>
                                        <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                    </a>
                                    <div className="service-ai d-none d-xxl-block">
                                        <img src="assets/img/home-2/service/service-ai.png" alt="img" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="service-right-area">
                                    <div className="service-right-card-items">
                                        <ul>
                                            <li>
                                                <div className="thumb">
                                                    <img src="assets/img/home-2/service/servive-01.jpg" alt="" />
                                                </div>
                                                <div className="content">
                                                    <h3>
                                                        <a href="service-details.html">AI Services That Accelerate Innovation & Business Growth</a>
                                                    </h3>
                                                    <p>
                                                        Provide data-driven stratege help companies identifies opportunities, reduce risk and achieve long term of our growth. 
                                                    </p>
                                                    <a href="service-details.html" className="link-btn">
                                                        Read more <i className="fa-solid fa-arrow-up-right"></i>
                                                    </a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="thumb">
                                                    <img src="assets/img/home-2/service/servive-02.jpg" alt="" />
                                                </div>
                                                <div className="content">
                                                    <h3>
                                                        <a href="service-details.html">End-to-End AI Services to Build, Automate & Transform</a>
                                                    </h3>
                                                    <p>
                                                        Provide data-driven stratege help companies identifies opportunities, reduce risk and achieve long term of our growth. 
                                                    </p>
                                                    <a href="service-details.html" className="link-btn">
                                                        Read more <i className="fa-solid fa-arrow-up-right"></i>
                                                    </a>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="thumb">
                                                    <img src="assets/img/home-2/service/servive-03.jpg" alt="" />
                                                </div>
                                                <div className="content">
                                                    <h3>
                                                        <a href="service-details.html">Smart & Scalable AI Solutions Tailored for Your Business</a>
                                                    </h3>
                                                    <p>
                                                        Provide data-driven stratege help companies identifies opportunities, reduce risk and achieve long term of our growth. 
                                                    </p>
                                                    <a href="service-details.html" className="link-btn">
                                                        Read more <i className="fa-solid fa-arrow-up-right"></i>
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </section>

                {/*  Brand Section Start  */}
                <div className="brand-section section-padding pt-0">
                    <div className="swiper brand-slider">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="brand-box-1">
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-1.png" alt="img" />
                                </span>
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-1.png" alt="img" />
                                </span>
                                </div>
                            </div>
                             <div className="swiper-slide">
                                <div className="brand-box-1">
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-2.png" alt="img" />
                                </span>
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-2.png" alt="img" />
                                </span>
                                </div>
                            </div>
                             <div className="swiper-slide">
                                <div className="brand-box-1">
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-3.png" alt="img" />
                                </span>
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-3.png" alt="img" />
                                </span>
                                </div>
                            </div>
                             <div className="swiper-slide">
                                <div className="brand-box-1">
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-4.png" alt="img" />
                                </span>
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-4.png" alt="img" />
                                </span>
                                </div>
                            </div>
                             <div className="swiper-slide">
                                <div className="brand-box-1">
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-5.png" alt="img" />
                                </span>
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-5.png" alt="img" />
                                </span>
                                </div>
                            </div>
                             <div className="swiper-slide">
                                <div className="brand-box-1">
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-6.png" alt="img" />
                                </span>
                                <span className="brand-img-1">
                                    <img src="assets/img/home-1/brand/brand-6.png" alt="img" />
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*  Pricing Section Start  */}
                <section className="pricing-section fix section-padding pt-0">
                    <div className="container">
                        <div className="section-title-area align-items-end">
                            <div className="section-title">
                               <h6 className="sub-title wow fadeInUp">
                                    // Pricing Package
                                </h6>
                                <h2 className="text-anim">
                                   AI-Powered Pricing Tailored for You
                                </h2>
                            </div>
                            <ul className="nav wow fadeInUp" data-wow-delay=".3s">
                                <li className="nav-item">
                                    <a href="#Monthly" data-bs-toggle="tab" className="nav-link active">
                                        Monthly
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#Yearly" data-bs-toggle="tab" className="nav-link">
                                       Yearly
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            <div id="Monthly" className="tab-pane fade show active">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-6 col-md-6">
                                        <div className="pricing-box-items">
                                            <div className="pricing-header">
                                                <span>Basic</span>
                                                <h3>
                                                    $29
                                                    <sub>/months</sub>
                                                </h3>
                                                <p>
                                                    Perfect for Small Teams, Startups, and Growing Corporate of Businesses
                                                </p>
                                            </div>
                                            <a href={tenantConfig.contact_url} className="pricing-btn">
                                                <i className="fa-solid fa-arrow-up-right"></i> Chose package 
                                            </a>
                                            <div className="pricing-list">
                                                <h5>Features:</h5>
                                                <ul>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Basic financial analytics tools
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Real-time exchange rate monitoring
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Monthly financial reports
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Email support
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6">
                                        <div className="pricing-box-items active">
                                            <div className="pricing-header">
                                                <span>Business</span>
                                                <h3>
                                                    $59
                                                    <sub>/months</sub>
                                                </h3>
                                                <p>
                                                    Perfect for Small Teams, Startups, and Growing Corporate of Businesses
                                                </p>
                                            </div>
                                            <a href={tenantConfig.contact_url} className="pricing-btn">
                                                <i className="fa-solid fa-arrow-up-right"></i> Chose package 
                                            </a>
                                            <div className="pricing-list">
                                                <h5>Features:</h5>
                                                <ul>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Basic financial analytics tools
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Real-time exchange rate monitoring
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Monthly financial reports
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Email support
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6">
                                        <div className="pricing-box-items">
                                            <div className="pricing-header">
                                                <span>Enterprise</span>
                                                <h3>
                                                    $99
                                                    <sub>/months</sub>
                                                </h3>
                                                <p>
                                                    Perfect for Small Teams, Startups, and Growing Corporate of Businesses
                                                </p>
                                            </div>
                                            <a href={tenantConfig.contact_url} className="pricing-btn">
                                                <i className="fa-solid fa-arrow-up-right"></i> Chose package 
                                            </a>
                                            <div className="pricing-list">
                                                <h5>Features:</h5>
                                                <ul>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Basic financial analytics tools
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Real-time exchange rate monitoring
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Monthly financial reports
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Email support
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="Yearly" className="tab-pane fade">
                                <div className="row">
                                    <div className="col-xl-4 col-lg-6 col-md-6">
                                        <div className="pricing-box-items">
                                            <div className="pricing-header">
                                                <span>Basic</span>
                                                <h3>
                                                    $29
                                                    <sub>/months</sub>
                                                </h3>
                                                <p>
                                                    Perfect for Small Teams, Startups, and Growing Corporate of Businesses
                                                </p>
                                            </div>
                                            <a href={tenantConfig.contact_url} className="pricing-btn">
                                                <i className="fa-solid fa-arrow-up-right"></i> Chose package 
                                            </a>
                                            <div className="pricing-list">
                                                <h5>Features:</h5>
                                                <ul>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Basic financial analytics tools
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Real-time exchange rate monitoring
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Monthly financial reports
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Email support
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6">
                                        <div className="pricing-box-items active">
                                            <div className="pricing-header">
                                                <span>Business</span>
                                                <h3>
                                                    $59
                                                    <sub>/months</sub>
                                                </h3>
                                                <p>
                                                    Perfect for Small Teams, Startups, and Growing Corporate of Businesses
                                                </p>
                                            </div>
                                            <a href={tenantConfig.contact_url} className="pricing-btn">
                                                <i className="fa-solid fa-arrow-up-right"></i> Chose package 
                                            </a>
                                            <div className="pricing-list">
                                                <h5>Features:</h5>
                                                <ul>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Basic financial analytics tools
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Real-time exchange rate monitoring
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Monthly financial reports
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Email support
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-6 col-md-6">
                                        <div className="pricing-box-items">
                                            <div className="pricing-header">
                                                <span>Enterprise</span>
                                                <h3>
                                                    $99
                                                    <sub>/months</sub>
                                                </h3>
                                                <p>
                                                    Perfect for Small Teams, Startups, and Growing Corporate of Businesses
                                                </p>
                                            </div>
                                            <a href={tenantConfig.contact_url} className="pricing-btn">
                                                <i className="fa-solid fa-arrow-up-right"></i> Chose package 
                                            </a>
                                            <div className="pricing-list">
                                                <h5>Features:</h5>
                                                <ul>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Basic financial analytics tools
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Real-time exchange rate monitoring
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Monthly financial reports
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                        Up to 3 user accounts
                                                    </li>
                                                    <li>
                                                        <i className="fa-solid fa-circle-check"></i>
                                                    Email support
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  Project Section Start  */}
                <section className="project-section tp-project-5-2-area fix section-padding section-bg-2">
                    <div className="marquee-section">
                        <div className="marquee tp-project-5-2-title">
                            <div className="marquee-group">
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                            </div>
                            <div className="marquee-group">
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                            </div>
                            <div className="marquee-group">
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                            </div>
                            <div className="marquee-group">
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                            </div>
                            <div className="marquee-group">
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                                <div className="text"><span>[</span> AI Projects & Success Stories <span>]</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="project-box-area des-portfolio-wrap">
                            <div className="project-box-items des-portfolio-panel">
                                <div className="content">
                                    <span>[2025]</span>
                                    <h3>
                                        <a href="project-details.html">AI Chatbot for Customer Support Automation.</a>
                                    </h3>
                                    <a href="project-details.html" className="icon">
                                        <i className="fa-solid fa-arrow-up-right"></i>
                                    </a>
                                    <span className="number">
                                        01
                                    </span>
                                </div>
                                <div className="thumb">
                                    <img src="assets/img/home-1/project/project-1.jpg" alt="img" />
                                </div>
                            </div>
                            <div className="project-box-items des-portfolio-panel">
                                <div className="content">
                                    <span>[2025]</span>
                                    <h3>
                                        <a href="project-details.html">Predictive Analytics Model for Sales Growth.</a>
                                    </h3>
                                    <a href="project-details.html" className="icon">
                                        <i className="fa-solid fa-arrow-up-right"></i>
                                    </a>
                                    <span className="number">
                                        02
                                    </span>
                                </div>
                                <div className="thumb">
                                    <img src="assets/img/home-1/project/project-2.jpg" alt="img" />
                                </div>
                            </div>
                            <div className="project-box-items mb-0 des-portfolio-panel">
                                <div className="content">
                                    <span>[2025]</span>
                                    <h3>
                                        <a href="project-details.html">AI-Powered Image Recognition System.</a>
                                    </h3>
                                    <a href="project-details.html" className="icon">
                                        <i className="fa-solid fa-arrow-up-right"></i>
                                    </a>
                                    <span className="number">
                                        03
                                    </span>
                                </div>
                                <div className="thumb">
                                    <img src="assets/img/home-1/project/project-3.jpg" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  Testimonial Section Start  */}
                <section className="testimonial-section section-padding">
                    <div className="container">
                        <div className="section-title text-center">
                            <h6 className="sub-title wow fadeInUp">
                                // Testimonial
                            </h6>
                            <h2 className="text-anim">
                                Customer Feedback <br /> <span>Success Stories.</span>
                            </h2>
                        </div>
                        <div className="testimonial-warpper">
                            <div className="testi-client">
                                <div className="swiper testimonial-thumbs">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="client-img">
                                                <img src="assets/img/home-1/testimonial/client-1.png" alt="img" />
                                            </div>
                                        </div>
                                         <div className="swiper-slide">
                                            <div className="client-img">
                                                <img src="assets/img/home-1/testimonial/client-2.png" alt="img" />
                                            </div>
                                        </div>
                                         <div className="swiper-slide">
                                            <div className="client-img">
                                                <img src="assets/img/home-1/testimonial/client-3.png" alt="img" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper testimonial-slider-content">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                         <div className="testimonial-content-1">
                                            <h3>
                                               “We provide comprehensive, data-driven AI strategies that empower companies to identify new opportunities, reduce potential risks, and achieve sustainable long-term growth, transforming insights into measurable business success.”
                                            </h3>
                                            <div className="testi-info">
                                                <h4>
                                                    Ellen Dezonee
                                                </h4>
                                                <p>Consultant</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                         <div className="testimonial-content-1">
                                            <h3>
                                               “We provide comprehensive, data-driven AI strategies that empower companies to identify new opportunities, reduce potential risks, and achieve sustainable long-term growth, transforming insights into measurable business success.”
                                            </h3>
                                            <div className="testi-info">
                                                <h4>
                                                    Ellen Dezonee
                                                </h4>
                                                <p>Consultant</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                         <div className="testimonial-content-1">
                                            <h3>
                                                “We provide comprehensive, data-driven AI strategies that empower companies to identify new opportunities, reduce potential risks, and achieve sustainable long-term growth, transforming insights into measurable business success.”
                                            </h3>
                                            <div className="testi-info">
                                                <h4>
                                                    Ellen Dezonee
                                                </h4>
                                                <p>Consultant</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-dot text-center mt-4">
                                    <div className="dot2"></div>
                                </div>
                            </div>
                            <div className="array-button">
                                <button className="array-prev"><i className="fa-solid fa-chevron-left"></i></button>
                                <button className="array-next"><i className="fa-solid fa-chevron-right"></i></button>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  Faq Section Start  */}
                <section className="faq-section fix">
                    <div className="row g-4">
                            <div className="col-lg-6">
                                <div className="faq-image-1 fix wow fadeInUp" data-wow-delay=".3s">
                                    <img data-speed=".8" src="assets/img/home-1/faq-image.jpg" alt="img" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="faq-content-1 section-padding">
                                    <div className="section-title mb-0">
                                        <h6 className="sub-title wow fadeInUp">
                                            // Testimonial
                                        </h6>
                                        <h2 className="text-anim">
                                            Our Stream Process <br /> <span>For Success.</span>
                                        </h2>
                                    </div>
                                    <ul className="accordion-box">
                                        {/* Block */}
                                        <li className="accordion block active-block wow fadeInUp">
                                            <div className="acc-btn active">
                                                <span className="number">01.</span>
                                                Understand clients
                                                <div className="icon fa-solid fa-arrow-down"></div>
                                            </div>
                                            <div className="acc-content current">
                                                <div className="content">
                                                    <div className="text">
                                                        Provide data-driven strategie to help companies identify opportunities, reduce risks, and achieve long-term of our growth. Provide data-driven strategies
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Block */}
                                        <li className="accordion block wow fadeInUp" data-wow-delay=".2s">
                                            <div className="acc-btn">
                                        <span className="number">02.</span>
                                            Create strategies
                                                <div className="icon fa-solid fa-arrow-down"></div>
                                            </div>
                                            <div className="acc-content">
                                                <div className="content">
                                                <div className="text">
                                                        Provide data-driven strategie to help companies identify opportunities, reduce risks, and achieve long-term of our growth. Provide data-driven strategies
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Block */}
                                        <li className="accordion block wow fadeInUp" data-wow-delay=".4s">
                                            <div className="acc-btn">
                                            <span className="number">03.</span>
                                                Deliver results
                                                <div className="icon fa-solid fa-arrow-down"></div>
                                            </div>
                                            <div className="acc-content">
                                                <div className="content">
                                                    <div className="text">
                                                        Provide data-driven strategie to help companies identify opportunities, reduce risks, and achieve long-term of our growth. Provide data-driven strategies
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                </section>

                {/*  News Section Start  */}
                <section className="news-section section-padding">
                    <div className="container">
                        <div className="section-title text-center">
                            <h6 className="sub-title wow fadeInUp">
                                // News & Blog
                            </h6>
                            <h2 className="text-anim">
                                Explore How AI is Transforming Industries <br /> Latest News & Updates
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
                                <div className="news-box-items">
                                    <div className="thumb">
                                        <img src="assets/img/home-1/news/news-01.jpg" alt="img" />
                                        <img src="assets/img/home-1/news/news-01.jpg" alt="img" />
                                    </div>
                                    <div className="content">
                                        <ul>
                                            <li>
                                                <a href="news.html">AI Innovations</a>
                                            </li>
                                            <li>
                                                <span>23 nov, 2025</span>
                                            </li>
                                        </ul>
                                        <h3>
                                            <a href="news-details.html">Harnessing AI Innovation to Drive the Next Generation of Growth.</a>
                                        </h3>
                                        <div className="news-bottom">
                                            <a href="news-details.html" className="link-btn"><i className="fa-solid fa-arrow-up-right"></i> Read more</a>
                                            <p>2 Comments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                                <div className="news-box-items">
                                    <div className="thumb">
                                        <img src="assets/img/home-1/news/news-02.jpg" alt="img" />
                                        <img src="assets/img/home-1/news/news-02.jpg" alt="img" />
                                    </div>
                                    <div className="content">
                                        <ul>
                                            <li>
                                                <a href="news.html">AI Innovations</a>
                                            </li>
                                            <li>
                                                <span>23 nov, 2025</span>
                                            </li>
                                        </ul>
                                        <h3>
                                            <a href="news-details.html">Empowering Businesses with the Future of Artificial Intelligence.</a>
                                        </h3>
                                        <div className="news-bottom">
                                            <a href="news-details.html" className="link-btn"><i className="fa-solid fa-arrow-up-right"></i> Read more</a>
                                            <p>2 Comments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                                <div className="news-box-items">
                                    <div className="thumb">
                                        <img src="assets/img/home-1/news/news-03.jpg" alt="img" />
                                        <img src="assets/img/home-1/news/news-03.jpg" alt="img" />
                                    </div>
                                    <div className="content">
                                        <ul>
                                            <li>
                                                <a href="news.html">AI Innovations</a>
                                            </li>
                                            <li>
                                                <span>23 nov, 2025</span>
                                            </li>
                                        </ul>
                                        <h3>
                                            <a href="news-details.html">Artificial Intelligence: Redefining the Way We Innovate.</a>
                                        </h3>
                                        <div className="news-bottom">
                                            <a href="news-details.html" className="link-btn"><i className="fa-solid fa-arrow-up-right"></i> Read more</a>
                                            <p>2 Comments</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*  Footer Section Start  */}
                <footer className="footer-section fix section-bg">
                    <div className="right-shape">
                        <img src="assets/img/home-2/hero/hero-light.png" alt="img" />
                    </div>
                    <div className="container">
                         <div className="cta-newsletter-wrapper">
                            <h2 className="text-anim">
                               Let’s Talk to your Projects
                            </h2>
                            <a className="gt-theme-btn-main wow fadeInUp" data-wow-delay=".7s" href={tenantConfig.contact_url}>
                                <span className="gt-theme-btn-arrow-left"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                                <span className="gt-theme-btn">Get Started Now</span>
                                <span className="gt-theme-btn-arrow-right"> <i className="fa-solid fa-arrow-up-right"></i> </span>
                            </a>
                        </div>
                    </div>
                    <div className="footer-area">
                        <div className="container">
                            <div className="footer-widget-wrapper">
                                <div className="row justify-content-between">
                                    <div className="col-xl-4 col-lg-5 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                                        <div className="footer-widget-items">
                                            <div className="widget-head">
                                                <a href="index.html" className="footer-logo">
                                                    <img src="assets/img/logo/white-logo.svg" alt="img" />
                                                </a>
                                            </div>
                                            <div className="footer-content">
                                                <p>
                                                    The purpose of a FAQ is generally provide information on Perfect for Small Teams, Startups, and Growing.
                                                </p>
                                                <div className="social-icon d-flex align-items-center">
                                                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                                                    <a href="#"><i className="fab fa-twitter"></i></a>
                                                    <a href="#"><i className="fab fa-vimeo-v"></i></a>
                                                    <a href="#"><i className="fab fa-pinterest-p"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                                        <div className="footer-widget-items">
                                            <div className="widget-head">
                                                <h3>Solutions</h3>
                                            </div>
                                            <ul className="gt-list-area">
                                                <li>
                                                    <a href="about.html">
                                                        About Us
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="service.html">
                                                        Services
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="about.html">
                                                       About us
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="about.html">
                                                       History
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={tenantConfig.contact_url}>
                                                       Contact
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="news.html">
                                                       Blogs
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 ps-lg-0 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                                        <div className="footer-widget-items">
                                            <div className="widget-head">
                                                <h3>Company</h3>
                                            </div>
                                            <ul className="gt-list-area">
                                                <li>
                                                    <a href="service-details.html">
                                                       Sustainability
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="service-details.html">
                                                      Customer Success
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="service-details.html">
                                                       Resources
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="service-details.html">
                                                       Talk an Expert
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="service-details.html">
                                                      Sustainability
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="service-details.html">
                                                       ai Solution hub
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".8s">
                                        <div className="footer-widget-items">
                                            <div className="widget-head">
                                                <h3>Get in touch</h3>
                                            </div>
                                            <ul className="contact-list">
                                                <li>
                                                    United States — <br />
                                                    350 Fifth Avenue, 21st Floor New York, NY 10118
                                                </li>
                                                <li>
                                                    <a href="tel:+86661233562">+8 (666) 123-3562</a>
                                                </li>
                                                <li>
                                                    Mon-Fri 9:00am - 5:00pm
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <div className="container">
                                 <div className="footer-bottom-wrapper">
                                    <p className="wow fadeInUp" data-wow-delay=".3s">
                                        © 2025 <b>Gridtech.</b> All rights reserved.
                                    </p>
                                    <ul className="footer-list wow fadeInUp" data-wow-delay=".7s">
                                        <li>
                                            <a href={tenantConfig.contact_url}>Privacy policy</a>
                                        </li>
                                        <li>।</li>
                                        <li>
                                            <a href={tenantConfig.contact_url}>Terms & conditions</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>

       

        
        {/* << All JS Plugins >> */}
        
        {/* << Viewport Js >> */}
        
        {/* << Bootstrap Js >> */}
        
        {/* << Gsap Min Js >> */}
        
        {/* << ScrollTrigger Min Js >> */}
        
        {/* << ScrollSmoother Min Js >> */}
        
        {/* << ScrollToPlugin Min Js >> */}
        
        {/* << SplitText Min Js >> */}
        
        {/* << TextPlugin Min Js >> */}
        
         {/* << Chroma Min Js >> */}
        
        {/* << nice-selec Js >> */}
        
        {/* << Waypoints Js >> */}
        
        {/* << Counterup Js >> */}
        
        {/* << Swiper Slider Js >> */}
        
        {/* << MeanMenu Js >> */}
        
        {/* << Parallaxie Js >> */}
        
        {/* << Magnific Popup Js >> */}
        
        {/* << Wow Animation Js >> */}
        
        {/* << Main.js >> */}
        
    
    </>
  );
}

export default App;
