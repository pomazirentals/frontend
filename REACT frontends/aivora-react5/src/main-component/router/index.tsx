import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WowInit from "../../components/wowInit/wowInit";

// ✅ Home Pages
import Homepage from "../HomePage";
import HomePage2 from "../HomePage2/HomePage2";
import HomePage3 from "../HomePage3/HomePage3";
import AboutPage from "../AboutPage/AboutPage";
import ServicePage from "../ServicePage/ServicePage";
import SeviceSinglePage from "../SeviceSinglePage/SeviceSinglePage";
import CareerSection from "../CareerSection/CareerSection";
import CareerDetails from "../CareerDetails/CareerDetails";
import ProjectPage from "../ProjectPage/ProjectPage";
import ProjectDetails from "../ProjectDetails/ProjectDetails";
import TeamPage from "../TeamPage/TeamPage";
import ScrollToTop from "./ScrollToTop";
import BlogPage from "../BlogPage/BlogPage";
import BlogDetails from "../BlogDetails/BlogDetails";
import ContactPage from "../ContactPage/ContactPage";
import ErrorPage from "../ErrorPage/ErrorPage";

// ✅ Router Component
const AllRoute: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <WowInit />
        <ScrollToTop />

        <Routes>
          {/* ✅ Home Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/ai-marketing" element={<HomePage2 />} />
          <Route path="/ai-chatbot" element={<HomePage3 />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/service-details" element={<SeviceSinglePage />} />
          <Route path="/career" element={<CareerSection />} />
          <Route path="/career-details" element={<CareerDetails />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project-details" element={<ProjectDetails />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ✅ Error Page */}
          <Route path="/404" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoute;
