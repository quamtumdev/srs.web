/* eslint-disable react/prop-types */
const SubjectImage = ({ image, alt }) => {
  return (
    <div className="subject-image-container">
      <img src={image} alt={alt} className="subject-image" />
    </div>
  );
};

export default SubjectImage;
