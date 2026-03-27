import { Link } from "react-router-dom";
import img14 from "../../images/service/img14.jpg";
import img15 from "../../images/service/img15.jpg";
import img16 from "../../images/service/img16.jpg";


const GallerySection: React.FC = () => {

    const gallerySets = [
        [img14, img14, img14, img14],
        [img15, img15, img15, img15],
        [img16, img16, img16, img16],
    ];

    return (
        <div className="service-gallary ul_li_between mt-125">
            {gallerySets.map((set, index) => (
                <div className="single-item-image img-hove-effect" key={index}>
                    <div className="xb-img">
                        {set.map((img, i) => (
                            <Link key={i} to="/service-details">
                                <img src={img} alt="gallery" />
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>

    )
}

export default GallerySection;