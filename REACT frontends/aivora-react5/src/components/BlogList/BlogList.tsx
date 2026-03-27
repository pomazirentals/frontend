import React from "react";
import BlogSlider from "./BlogTopList";
import BlogSidebar from "../BlogSidebar/BlogSidebar";
import { Link } from "react-router-dom";

// IMPORT ALL BLOG IMAGES
import blog05 from "../../images/blog/img05.jpg";
import blog06 from "../../images/blog/img06.jpg";
import blog07 from "../../images/blog/img07.jpg";

const Icons = {
  arrow: (
    <>
      <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
        <rect x="3.783" y="13.463" width="14.31" height="1.817" transform="rotate(-40.2798 3.783 13.463)" fill="white" />
        <rect x="5.807" y="4.605" width="1.817" height="1.817" transform="rotate(-40.2798 5.807 4.605)" fill="white" />
        <rect x="8.367" y="4.816" width="1.817" height="1.817" transform="rotate(-40.2798 8.367 4.816)" fill="white" />
        <rect x="10.926" y="5.028" width="1.817" height="1.817" transform="rotate(-40.2798 10.926 5.028)" fill="white" />
        <rect x="13.277" y="7.8" width="1.817" height="1.817" transform="rotate(-40.2798 13.277 7.8)" fill="white" />
        <rect x="13.066" y="10.361" width="1.817" height="1.817" transform="rotate(-40.2798 13.066 10.361)" fill="white" />
        <rect x="12.855" y="12.922" width="1.817" height="1.817" transform="rotate(-40.2798 12.855 12.922)" fill="white" />
      </svg>

      <svg width="20" height="19" viewBox="0 0 20 19" fill="none">
        <rect x="3.783" y="13.463" width="14.31" height="1.817" transform="rotate(-40.2798 3.783 13.463)" fill="white" />
        <rect x="5.807" y="4.605" width="1.817" height="1.817" transform="rotate(-40.2798 5.807 4.605)" fill="white" />
        <rect x="8.367" y="4.816" width="1.817" height="1.817" transform="rotate(-40.2798 8.367 4.816)" fill="white" />
        <rect x="10.926" y="5.028" width="1.817" height="1.817" transform="rotate(-40.2798 10.926 5.028)" fill="white" />
        <rect x="13.277" y="7.8" width="1.817" height="1.817" transform="rotate(-40.2798 13.277 7.8)" fill="white" />
        <rect x="13.066" y="10.361" width="1.817" height="1.817" transform="rotate(-40.2798 13.066 10.361)" fill="white" />
        <rect x="12.855" y="12.922" width="1.817" height="1.817" transform="rotate(-40.2798 12.855 12.922)" fill="white" />
      </svg>
    </>
  ),
};

const BlogList: React.FC = () => {
  return (
    <div>
      <BlogSlider/>
      <section className="blog_details_section pt-120">
        <div className="container">
          <div className="row mt-none-50 g-0 align-items-start">
            <div className="col-lg-8 mt-50">
              <div className="blog_details_content">

                {/* ITEM 1 */}
                <div className="blog_details_item img-hove-effect ul_li xb-border">
                  <div className="xb-item--img xb-img">
                    {[1, 2, 3, 4].map((i) => (
                      <Link key={i} to="/blog-details"><img src={blog05} alt="" /></Link>
                    ))}
                  </div>

                  <div className="xb-item--holder">
                    <Link to="/blog-details" className="xb-item--tag">#ai tools tips</Link>

                    <h3 className="xb-item--title border-effect-2">
                      <Link to="/blog-details">
                        How our AI agency delivers next-gen automation tools..
                      </Link>
                    </h3>

                    <span className="xb-item--content">
                      Our AI agency creates smart automation tools simplify.
                    </span>

                    <div className="xb-item--button mt-40">
                      <Link className="thm-btn agency-btn" to="/blog-details">
                        <span className="text">Read more</span>
                        <span className="arrow">
                          <span className="arrow-icon">{Icons.arrow}</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ITEM 2 */}
                <div className="blog_details_item xb-border">
                  <div className="xb-item--inner">
                    <Link to="/blog-details" className="xb-item--tag">#chatbots tips</Link>

                    <h3 className="xb-item--title border-effect-2">
                      <Link to="/blog-details">From lead generation to sales conversion...</Link>
                    </h3>

                    <span className="xb-item--content">
                      Smart chatbots are transforming the way businesses interact with customers—from the first touchpoint to the final sale. By engaging visitors.
                    </span>

                    <div className="xb-item--button mt-40">
                      <Link className="thm-btn agency-btn" to="/blog-details">
                        <span className="text">Read more</span>
                        <span className="arrow"><span className="arrow-icon">{Icons.arrow}</span></span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ITEM 3 */}
                <div className="blog_details_item img-hove-effect ul_li xb-border">
                  <div className="xb-item--img xb-img">
                    {[1, 2, 3, 4].map((i) => (
                      <Link key={i} to="/blog-details"><img src={blog06} alt="" /></Link>
                    ))}
                  </div>

                  <div className="xb-item--holder">
                    <Link to="/blog-details" className="xb-item--tag">#chatbots tips</Link>

                    <h3 className="xb-item--title border-effect-2">
                      <Link to="/blog-details">
                        How AI chatbots are boosting sales for E-commerce brands..
                      </Link>
                    </h3>

                    <span className="xb-item--content">
                      AI chatbots are becoming powerful sales tools.
                    </span>

                    <div className="xb-item--button mt-40">
                      <Link className="thm-btn agency-btn" to="/blog-details">
                        <span className="text">Read more</span>
                        <span className="arrow"><span className="arrow-icon">{Icons.arrow}</span></span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ITEM 4 */}
                <div className="blog_details_item xb-border">
                  <div className="xb-item--inner">
                    <Link to="/blog-details" className="xb-item--tag">#ai marketing</Link>

                    <h3 className="xb-item--title border-effect-2">
                      <Link to="/blog-details">10 Real-world ways AI improves efficiency...</Link>
                    </h3>

                    <span className="xb-item--content">
                     AI is no longer a future concept—it's actively reshaping how businesses run today. From automating back-office tasks to optimizing ad spend and streamlining.
                    </span>

                    <div className="xb-item--button mt-40">
                      <Link className="thm-btn agency-btn" to="/blog-details">
                        <span className="text">Read more</span>
                        <span className="arrow"><span className="arrow-icon">{Icons.arrow}</span></span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ITEM 5 */}
                <div className="blog_details_item img-hove-effect ul_li xb-border">
                  <div className="xb-item--img xb-img">
                    {[1, 2, 3, 4].map((i) => (
                      <Link key={i} to="/blog-details"><img src={blog07} alt="" /></Link>
                    ))}
                  </div>

                  <div className="xb-item--holder">
                    <Link to="/blog-details" className="xb-item--tag">#ai tips</Link>

                    <h3 className="xb-item--title border-effect-2">
                      <Link to="/blog-details">Is your business AI-ready?</Link>
                    </h3>

                    <span className="xb-item--content">
                      Adopting AI can be a game-changer...
                    </span>

                    <div className="xb-item--button mt-40">
                      <Link className="thm-btn agency-btn" to="/blog-details">
                        <span className="text">Read more</span>
                        <span className="arrow"><span className="arrow-icon">{Icons.arrow}</span></span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* PAGINATION */}
                <ul className="blog-pagination ul_li">
                  <li><Link className="xb-border" to="#"><i className="fas fa-chevron-double-left"></i></Link></li>
                  <li><Link className="xb-border" to="#">1</Link></li>
                  <li className="active"><Link className="xb-border" to="#">2</Link></li>
                  <li><Link className="xb-border" to="#">3</Link></li>
                  <li><Link className="xb-border" to="#"><i className="fas fa-chevron-double-right"></i></Link></li>
                </ul>

              </div>
            </div>
            <BlogSidebar/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogList;
