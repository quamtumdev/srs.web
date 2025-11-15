import "../../custom.css";

import { SrsEducare } from "../why-srs-educare/SrsEducare";
export const WhyEducares = () => {
  return (
    <>
      <section>
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100 img-fluid vision-mission-slider-img"
                src="/assets/img/about/2.jpg"
                alt="First slide"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mg-why-about-us-srs">
        <SrsEducare />
      </section>
    </>
  );
};
