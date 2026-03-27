// ✅ TypeScript version of your projects file

import pimg1 from "../images/gallery/image-22.jpg";
import pimg2 from "../images/gallery/image-13.jpg";
import pimg3 from "../images/gallery/image-14.jpg";
import pimg4 from "../images/gallery/image-12.jpg";
import pimg5 from "../images/gallery/image-15.jpg";
import pimg6 from "../images/gallery/image-21.jpg";
import pimg7 from "../images/gallery/image-16.jpg";
import pimg8 from "../images/gallery/image-17.jpg";
import pimg9 from "../images/gallery/image-18.jpg";
import pimg10 from "../images/gallery/image-19.jpg";
import pimg11 from "../images/gallery/image-20.jpg";

// ✅ Define the shape of each project
export interface ProjectItem {
  id: string;
  title?: string;
  slug?: string;
  pimg1: string;
  date?: string;
  location?: string;
}

// ✅ Strictly typed project array
const Projects: ProjectItem[] = [
  {
    id: "1",
    pimg1: pimg1,
  },
  {
    id: "2",
    title: "Jenifer & Harry",
    slug: "Jenifer-Harry",
    pimg1: pimg2,
    date: "Jan 2019",
    location: "Austria",
  },
  {
    id: "3",
    title: "Miller & Aiyana",
    slug: "Miller-Aiyana",
    pimg1: pimg3,
    date: "Mar 2020",
    location: "Austria",
  },
  {
    id: "4",
    title: "Jane & Peter",
    slug: "Jane-Peter",
    pimg1: pimg4,
    date: "Apr 2020",
    location: "Austria",
  },
  {
    id: "5",
    title: "James & Amelia",
    slug: "James-Amelia",
    pimg1: pimg5,
    date: "Jun 2023",
    location: "Austria",
  },
  {
    id: "6",
    pimg1: pimg6,
  },
  {
    id: "7",
    title: "Jenifer & Harry",
    slug: "Jenifer-Harrys",
    pimg1: pimg7,
    date: "Jan 2019",
    location: "Austria",
  },
  {
    id: "8",
    title: "Miller & Aiyana",
    slug: "Miller-Aiyanas",
    pimg1: pimg8,
    date: "Mar 2020",
    location: "Austria",
  },
  {
    id: "9",
    title: "Jane & Peter",
    slug: "Jane-Peters",
    pimg1: pimg9,
    date: "Apr 2020",
    location: "Austria",
  },
  {
    id: "10",
    title: "James & Amelia",
    slug: "James-Amelias",
    pimg1: pimg10,
    date: "Jun 2023",
    location: "Austria",
  },
  {
    id: "11",
    title: "Pitar & Aliza",
    slug: "pitar-alizas",
    pimg1: pimg11,
    date: "Jun 2023",
    location: "USA",
  },
  {
    id: "12",
    title: "Miller & Aiyana",
    slug: "Miller-Aiyanas",
    pimg1: pimg8,
    date: "Mar 2020",
    location: "Austria",
  },
];

export default Projects;
