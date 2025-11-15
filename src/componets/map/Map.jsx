import "../../custom.css";
export const Map = () => {
  return (
    <>
      <div className="container-fluid map-padding-custom">
        <div className="row no-gutters map-height">
          <div className="col">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d56782.65698490953!2d78.0086953803711!3d27.190374839068408!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397477fe395f2113%3A0xfb1c21683e948330!2sSRS%20Educares%2C%20Best%20Institute%20for%20IIT-JEE%2FNEET!5e0!3m2!1sen!2sus!4v1729520017742!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};
