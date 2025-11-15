import { Banner } from "../banner/Banner";
import { Widget } from "../three-course/Widget";
import { SrsEducare } from "../why-srs-educare/SrsEducare";
import { FeaturedCourses } from "../featured-courses/FeaturedCourses";
import { ScholarShip } from "../scholarship/ScholarShip";
import { Testimonial } from "../testimonial/Testimonial";
import { Teams } from "../teams/Teams";
import { Map } from "../map/Map";
import NoticeBoard from "../notice-board/NoticeBoard";
import "../../custom.css";
export const Home = () => {
  return (
    <>
      <Banner />

      <Widget />
      <NoticeBoard />
      <SrsEducare />
      <FeaturedCourses />
      <ScholarShip />
      <Teams />

      <Testimonial />
      <Map />
    </>
  );
};
