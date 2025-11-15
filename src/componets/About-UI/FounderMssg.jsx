import "../../custom.css";

export const FounderMssg = () => {
  return (
    <>
      <section className="about-section bg-light-white">
        <div className="container custom-about-founder-container-mssg">
          <div className="row">
            <div className="home-three-head section-title-center section-header-titler section-header-title mg-top-custom-founder">
              <div className="row align-items-center d-flex justify-content-between sip-adv-title">
                <div className="col-lg-12">
                  <h2 className="text-capitalize">Founder&apos;s Message </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12 wow fadeInLeft order-lg-1 order-xs-2 order-sm-2">
              <img src="assets/img/teams/1.jpeg" className="foundersImg" />
              <div className="header-two-title pt-2 text-center founder-titile">
                <b className="founder-size">Mr. Ajay Pratap</b>

                <li className="founder-size hide-bullets">B.Tech, IIT-BHU </li>
                <li className="founder-size hide-bullets">
                  Founder,SRS Educares
                </li>
              </div>
            </div>
            <div className="col-lg-8 wow order-lg-1 order-xs-2 order-sm-2">
              <div className="header-two-title">
                <p className="tagline text-blue ">
                  A Warm Welcome to SRS Educares
                </p>
              </div>
              <div className="career-five-content text-justify">
                <p className="about-text text-justify">
                  At SRS Educares, we know how important your child&apos;s
                  future is, and we&apos;re here to support their dreams. With
                  our experience in education and focus on quality, we guide
                  students to achieve academic success.
                </p>

                <p className="about-text text-justify">
                  With a strong record of results, SRS Educares offers
                  customized programs for NEET, IIT JEE, and other major exams.
                  Our team includes IIT graduates, skilled teachers, and experts
                  who make sure every student has the right knowledge and
                  strategy to succeed.{" "}
                </p>

                <p className="about-text text-justify">
                  We believe that with the right guidance and resources, every
                  student&apos;s potential can turn into real success.
                  Let&apos;s work together to build a bright future for your
                  child!
                </p>

                <div className="header-two-title">
                  <p className="tagline text-blue ">Warm regards</p>
                  <b className="founder-size">Ajay Pratap Yadav</b>

                  <li className="founder-size hide-bullets">
                    B.Tech, IIT-BHU{" "}
                  </li>
                  <li className="founder-size hide-bullets">
                    Founder,SRS Educares
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
