import { Link } from "react-router-dom";
import { IoArrowRedoSharp } from "react-icons/io5";
import { useEffect } from "react";
import "../../custom.css";

export const Teams = () => {
  useEffect(() => {
    const $ = window.$; // Access jQuery from the global window object
    if ($) {
      $(".owl-carousel").owlCarousel({
        lazyLoad: false,
        items: 3, // Default items for larger screens
        loop: true,
        nav: true,
        spaceBetween: 20,

        responsive: {
          0: {
            items: 1,
            spaceBetween: 30,
          },
          600: {
            items: 2, // Show 2 items on medium screens
          },
          1000: {
            items: 3, // Show 3 items on large screens
          },
        },
      });
    }
  }, []);

  return (
    <>
      <section className="blogs-section-five">
        <div className="container">
          <div className="header-five-title section-title home-three-head section-title-center section-header-titler">
            <h2>A Dedicated Group of IITians and Doctors</h2>
          </div>
          <div className="owl-carousel home-five-blog owl-theme">
            <div className="blog-five-item">
              <div className="product-img-five">
                <Link to="#">
                  <img
                    className="img-fluid TeamsImg"
                    alt="Img"
                    src="assets/img/teams/1.jpeg"
                  />
                </Link>
              </div>
              <div className="blog-box-content">
                <div className="blog-five-header d-flex align-items-center justify-content-between">
                  <div className="blog-five-text">
                    <p>
                      <IoArrowRedoSharp className="text-orange" />
                      &nbsp;&nbsp;Physics Faculty
                    </p>
                  </div>
                </div>
                <div className="blog-five-footer">
                  <h6>
                    <Link to="#">Ajay Pratap (B.Tech-IITBHU)</Link>
                  </h6>
                </div>
              </div>
            </div>

            <div className="blog-five-item">
              <div className="product-img-five">
                <Link to="#">
                  <img
                    className="img-fluid TeamsImg"
                    alt="Img"
                    src="assets/img/teams/2.jpeg"
                  />
                </Link>
              </div>
              <div className="blog-box-content">
                <div className="blog-five-header d-flex align-items-center justify-content-between">
                  <div className="blog-five-text">
                    <p>
                      <IoArrowRedoSharp className="text-orange" />
                      &nbsp;&nbsp;Chemistry Faculty
                    </p>
                  </div>
                </div>
                <div className="blog-five-footer">
                  <h6>
                    <Link to="#">APS Tomar (M.Sc, IIT-JAM)</Link>
                  </h6>
                </div>
              </div>
            </div>

            <div className="blog-five-item">
              <div className="product-img-five">
                <Link to="#">
                  <img
                    className="img-fluid TeamsImg"
                    alt="Img"
                    src="assets/img/teams/3.jpeg"
                  />
                </Link>
              </div>
              <div className="blog-box-content">
                <div className="blog-five-header d-flex align-items-center justify-content-between">
                  <div className="blog-five-text">
                    <p>
                      <IoArrowRedoSharp className="text-orange" />
                      &nbsp;&nbsp;Maths Faculty
                    </p>
                  </div>
                </div>
                <div className="blog-five-footer">
                  <h6>
                    <Link to="#">Himanshu Gupta (B.Tech - HBTU, Kanpur)</Link>
                  </h6>
                </div>
              </div>
            </div>

            <div className="blog-five-item">
              <div className="product-img-five">
                <Link to="#">
                  <img
                    className="img-fluid TeamsImg"
                    alt="Img"
                    src="assets/img/teams/4.jpeg"
                  />
                </Link>
              </div>
              <div className="blog-box-content">
                <div className="blog-five-header d-flex align-items-center justify-content-between">
                  <div className="blog-five-text">
                    <p>
                      <IoArrowRedoSharp className="text-orange" />
                      &nbsp;&nbsp;Maths Faculty
                    </p>
                  </div>
                </div>
                <div className="blog-five-footer">
                  <h6>
                    <Link to="#">Akash Yadav (B.Tech, REC, Kannauj)</Link>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
