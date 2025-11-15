import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
// import EditStream from "./StreamUI/EditStream";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import AddSkills from "./AddSkills.jsx";
import EditSkills from "./EditSkills.jsx";

const Skills = () => {
  const [skillsData, setSkillsData] = useState([]); // Initially empty array
  const [selectedSkills, setSelectedSkills] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch streams data from backend when component mounts
  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/skills/skills" // Assuming streams API endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch streams");
        }
        const data = await response.json();
        setSkillsData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching streams: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchSkills(); // Fetch data on mount
  }, []);

  // Add a new stream
  const addNewSkills = newSkills => {
    setSkillsData([...skillsData, newSkills]);
  };

  // Toggle the active status of a stream
  const toggleActiveStatus = id => {
    setSkillsData(prevData =>
      prevData.map(skills =>
        skills._id === id ? { ...skills, active: !skills.active } : skills
      )
    );
  };

  // Open the edit modal
  const openEditModal = skills => {
    setSelectedSkills(skills); // Set the selected stream to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedSkills(null); // Clear selected stream
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="stream-h1">Skills</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddSkills addNewSkills={addNewSkills} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading Skills...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched streams data and display them */}
            {skillsData.map(skills => (
              <div className="col-md-12" key={skills._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{skills.title}</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                      {/* Toggle Active/Inactive */}
                      <button
                        type="button"
                        className={`btn stream-custom-btn ${
                          skills.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(skills._id)}
                      >
                        {skills.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn stream-custom-btn edit-btn"
                        onClick={() => openEditModal(skills)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body stream-card">
                    {/* Display URL */}
                    <div className="row">
                      <div className="col-md-12">
                        <strong>Unique URL: </strong>
                        {skills.url}
                      </div>
                      <div className="col-md-12">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: Array.isArray(skills.content)
                              ? skills.content.join("")
                              : skills.content,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Created By:</strong>
                        <span> {skills.createdBy} </span>
                      </div>
                      <div className="col-md-3">
                        <strong>Created On:</strong>
                        <span> {skills.createdOn}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated By:</strong>
                        <span> {skills.updatedBy}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated On:</strong>
                        <span> {skills.updatedOn}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Render EditStream Modal */}
      {isEditModalOpen && (
        <EditSkills
          skills={selectedSkills}
          setSkillsData={setSkillsData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default Skills;
