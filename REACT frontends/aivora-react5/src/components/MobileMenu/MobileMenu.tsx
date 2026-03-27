import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import "./style.css";

interface MenuItem {
  id: number;
  title: string;
  link: string;
  submenu?: MenuItem[];
}

const menus: MenuItem[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
    submenu: [
      { id: 11, title: "AI Agency", link: "/" },
      { id: 12, title: "AI Marketing", link: "/ai-marketing" },
      { id: 13, title: "AI Chatbot", link: "/ai-chatbot" },
    ],
  },
  {
    id: 2,
    title: "About",
    link: "/about",
  },
  {
    id: 3,
    title: "Pages",
    link: "#",
    submenu: [
      { id: 31, title: "Services", link: "/service" },
      { id: 32, title: "Service Details", link: "/service-details" },
      { id: 33, title: "Career", link: "/career" },
      { id: 34, title: "Career Details", link: "/career-details" },
      { id: 35, title: "Projects", link: "/project" },
      { id: 36, title: "Project Details", link: "/project-details" },
      { id: 37, title: "Team", link: "/team" },
    ],
  },
  {
    id: 4,
    title: "Services",
    link: "#",
    submenu: [
      { id: 41, title: "AI SaaS Product", link: "/service-details" },
      { id: 42, title: "Data & Intelligence", link: "/service-details" },
      { id: 43, title: "AI for E-commerce", link: "/service-details" },
      { id: 44, title: "AI Consulting", link: "/service-details" },
    ],
  },
  {
    id: 5,
    title: "Blog",
    link: "/blog",
    submenu: [
      { id: 51, title: "Blog", link: "/blog" },
      { id: 52, title: "Blog Details", link: "/blog-details" },
    ],
  },
  {
    id: 6,
    title: "Contact",
    link: "/contact",
  },
];

const MobileMenu: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <ul className="responsivemenu">
      {menus.map((menu) => (
        <li key={menu.id} className={openId === menu.id ? "active" : ""}>
          {menu.submenu ? (
            <Fragment>
              <p onClick={() => handleToggle(menu.id)}>
                {menu.title}
                <i
                  className={
                    openId === menu.id ? "fa fa-angle-up" : "fa fa-angle-down"
                  }
                ></i>
              </p>

              {/* MUI Collapse for smooth animation */}
              <Collapse in={openId === menu.id} timeout="auto" unmountOnExit>
                <ul className="subMenu">
                  {menu.submenu.map((sub) => (
                    <li key={sub.id}>
                      <Link to={sub.link} onClick={handleClick}>
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Collapse>
            </Fragment>
          ) : (
            <Link to={menu.link} onClick={handleClick}>
              {menu.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MobileMenu;
