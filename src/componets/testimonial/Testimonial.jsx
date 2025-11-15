// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../testimonial/testimonoial.css";
import { RiDoubleQuotesR } from "react-icons/ri";
// Import required modules
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

export const Testimonial = () => {
  return (
    <section className="testimonial-three">
      <div className="container">
        <div className="testimonial-three-content">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="become-content">
                <h2>Proven Success</h2>
                <h4>Why Students Love and Prefer SRS Educares</h4>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12">
              <div className="swiper-testimonial-three">
                <Swiper
                  effect={"flip"}
                  grabCursor={true}
                  navigation={true}
                  modules={[EffectFlip, Pagination, Navigation]}
                  loop={true}
                  className="mySwiper-testimonial"
                >
                  {/* Testimonial Slide 1 */}
                  <SwiperSlide>
                    <div className="testimonial-item-five">
                      <RiDoubleQuotesR className=" dobule-quotes text-orange" />

                      <div className="testimonial-content">
                        <p>
                          {" "}
                          In my experience, all the teachers are from
                          prestigious institutes. Teachers are supportive and
                          provide 24×7 support. I would always be grateful to
                          SRS Educares.
                        </p>
                      </div>

                      <div className="testimonial-ratings">
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <p className="d-inline-block">
                            4.8<span>ratings</span>
                          </p>
                        </div>
                      </div>
                      <div className="testimonial-users">
                        <div className="imgbx">
                          <img
                            alt="Kshitiz Pratap"
                            src="assets/img/testimonial/1.jpeg"
                          />
                        </div>
                        <div>
                          <h6>Kshitiz Pratap</h6>
                          <p>IIT KANPUR</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Testimonial Slide 2 */}
                  <SwiperSlide>
                    <div className="testimonial-item-five">
                      <RiDoubleQuotesR className=" dobule-quotes text-orange" />

                      <div className="testimonial-content">
                        <p>
                          My 2 years in the classroom with SRS were great. SRS
                          helped me throughout the journey. The best part of SRS
                          is the exceptional faculty and dedicated mentorship
                          provided to every student.
                        </p>
                      </div>
                      <div className="testimonial-ratings">
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <p className="d-inline-block">
                            4.8<span>ratings</span>
                          </p>
                        </div>
                      </div>
                      <div className="testimonial-users">
                        <div className="imgbx">
                          <img
                            alt="Suryansh Kudesia"
                            src="assets/img/testimonial/2.jpeg"
                          />
                        </div>
                        <div>
                          <h6>Suryansh Kudesia</h6>
                          <p>IIT BHU</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Testimonial Slide 3 */}
                  <SwiperSlide>
                    <div className="testimonial-item-five">
                      <RiDoubleQuotesR className=" dobule-quotes text-orange" />

                      <div className="testimonial-content">
                        <p>
                          My experience with SRS Educares is great and
                          memorable. It was a pleasure to study under the
                          guidance of the best faculty. Proud to be an ExSRSian.
                        </p>
                      </div>
                      <div className="testimonial-ratings">
                        <div className="rating">
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star filled"></i>
                          <i className="fas fa-star"></i>
                          <p className="d-inline-block">
                            4.8<span>ratings</span>
                          </p>
                        </div>
                      </div>
                      <div className="testimonial-users">
                        <div className="imgbx">
                          <img
                            alt="Shivam Prajapati"
                            src="assets/img/testimonial/3.jpeg"
                          />
                        </div>

                        <div>
                          <h6>Shivam Prajapati</h6>
                          <p>IIT BHU</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Add more SwiperSlide components as needed */}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
