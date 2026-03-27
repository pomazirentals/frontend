// ===============================
// 📁 Service Data (Typed for TypeScript)
// ===============================

// 🖼 Import Images
import simg1 from "../images/service/image-1.jpg";
import simg2 from "../images/service/image-2.jpg";
import simg3 from "../images/service/image-3.jpg";
import simg4 from "../images/service/image-4.jpg";

import singleImg1 from "../images/service-single/single.jpg";
import singleImg2 from "../images/service-single/single2.jpg";
import singleImg3 from "../images/service-single/single3.jpg";
import singleImg4 from "../images/service-single/single4.jpg";

export interface Service {
  id: string;     
  title: string;      
  slug: string;       
  description: string; 
  simg: string;        
  ssImg: string;      
}

const Services: Service[] = [
  {
    id: "1",
    title: "Wedding Dress",
    slug: "Wedding-Dress",
    description:
      "Aliquet magna menas esmod pelque diam. Maenas massa tincint bidum tidunt.",
    simg: simg1,
    ssImg: singleImg1,
  },
  {
    id: "2",
    title: "Bridal Bouquets",
    slug: "Bridal-Bouquets",
    description:
      "Aliquet magna menas esmod pelque diam. Maenas massa tincint bidum tidunt.",
    simg: simg2,
    ssImg: singleImg2,
  },
  {
    id: "3",
    title: "Cake Decoration",
    slug: "Cake-Decoration",
    description:
      "Aliquet magna menas esmod pelque diam. Maenas massa tincint bidum tidunt.",
    simg: simg3,
    ssImg: singleImg3,
  },
  {
    id: "4",
    title: "Event Planning",
    slug: "Event-Planning",
    description:
      "Aliquet magna menas esmod pelque diam. Maenas massa tincint bidum tidunt.",
    simg: simg4,
    ssImg: singleImg4,
  },
];

export default Services;
