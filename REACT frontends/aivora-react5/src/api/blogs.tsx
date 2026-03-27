// ===============================
// 📁 Blog Data (Typed for TypeScript)
// ===============================

// 🖼 Import Images
import blogImg1 from "../images/blog/img-1.jpg";
import blogImg2 from "../images/blog/img-2.jpg";
import blogImg3 from "../images/blog/img-3.jpg";
import blogImg4 from "../images/blog/img-4.jpg";

import blogSingleImg1 from "../images/blog/img-1.jpg";
import blogSingleImg2 from "../images/blog/img-2.jpg";
import blogSingleImg3 from "../images/blog/img-3.jpg";
import blogSingleImg4 from "../images/blog/img-4.jpg";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  screens: string;  
  description: string;
  author: string;
  create_at: string;
  blogSingleImg: string; 
  comment: string;
  blClass: string;       
  animation: string;
  videoBtn?: string;      
}

const blogs: Blog[] = [
  {
    id: "1",
    title: "Best Wedding Gown For Your Dream Day",
    slug: "Best-Wedding-Gown-For-Your-Dream-Day",
    screens: blogImg1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.",
    author: "Loura Sweety",
    create_at: "25 Sep 2024",
    blogSingleImg: blogSingleImg1,
    comment: "35",
    blClass: "format-standard-image",
    animation: "1200",
  },
  {
    id: "2",
    title: "You Must Need a Great Photographer",
    slug: "You-Must-Need-a-Great-Photographer",
    screens: blogImg2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.",
    author: "David Luis",
    create_at: "23 Sep 2024",
    blogSingleImg: blogSingleImg2,
    comment: "80",
    blClass: "format-standard-image",
    animation: "1400",
  },
  {
    id: "3",
    title: "Top 10 Wedding Bouquet Arranging Idea",
    slug: "Top-10-Wedding-Bouquet-Arranging-Idea",
    screens: blogImg3,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.",
    author: "Jenefer Willy",
    create_at: "21 Sep 2024",
    blogSingleImg: blogSingleImg3,
    comment: "95",
    blClass: "format-video",
    videoBtn: "video-btn",
    animation: "1600",
  },
  {
    id: "4",
    title: "Best Wedding Gown For Your Dream Day",
    slug: "Best-Wedding",
    screens: blogImg4,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem beatae errodio.",
    author: "Jenefer Willy",
    create_at: "21 Sep 2024",
    blogSingleImg: blogSingleImg4,
    comment: "95",
    blClass: "format-video",
    animation: "1200",
  },
];

export default blogs;
