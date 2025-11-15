import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import "../../Admin/AdminJS.js";
import "../../Admin/AdminCSS.css";
import AddTopic from "./AddTopic.jsx";
import EditTopic from "./EditTopic.jsx";
import SubTopic from "./SubTopicModule/SubTopic.jsx";

const Topic = () => {
  const [topicsData, setTopicsData] = useState([]); // Initially empty array for subjects
  const [selectedTopic, setSelectedTopic] = useState(null); // Track selected subject for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch subjects data from backend when component mounts
  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/topic/topic" // Adjust the API endpoint for subjects
        );
        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await response.json();
        setTopicsData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching subjects: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchTopics(); // Fetch data on mount
  }, []);

  // Add a new subject
  const addNewTopics = newTopic => {
    setTopicsData([...topicsData, newTopic]);
  };

  // Toggle Active/Inactive status
  const toggleActiveStatus = id => {
    setTopicsData(prevData =>
      prevData.map(topic =>
        topic._id === id ? { ...topic, active: !topic.active } : topic
      )
    );
  };

  // Open the edit modal
  const openEditModal = topic => {
    setSelectedTopic(topic); // Set the selected subject to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedTopic(null); // Clear selected subject
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="subject-h1">Topics List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddTopic addNewTopics={addNewTopics} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading topics...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched subjects data and display them */}
            {topicsData.map(topic => (
              <div className="col-md-12" key={topic._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{topic.title}</h3>
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
                        className={`subject-custom-btn ${
                          topic.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(topic._id)}
                      >
                        {topic.active ? "Active" : "Inactive"}
                      </button>

                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn subject-custom-btn edit-btn"
                        onClick={() => openEditModal(topic)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body subject-card">
                    {/* Display URL */}
                    <div className="row">
                      <div className="col-md-12">
                        <strong className="subject-card-custom mb-2">
                          Uniq URL:{" "}
                        </strong>{" "}
                        <span className="info-item-details"> {topic.url}</span>
                      </div>
                    </div>
                    <div className="mb-2">
                      <strong className="subject-card-custom">
                        Description:{" "}
                      </strong>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: Array.isArray(topic.content)
                            ? topic.content.join("")
                            : topic.content,
                        }}
                      />
                    </div>
                    <div className="border-top-card-custom">
                      <div className="row">
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Created By:{" "}
                          </strong>
                          <span> {topic.createdBy} </span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Created On:{" "}
                          </strong>
                          <span> {topic.createdOn}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Updated By:{" "}
                          </strong>
                          <span> {topic.updatedBy}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Updated On:{" "}
                          </strong>
                          <span> {topic.updatedOn}</span>
                        </div>
                      </div>
                    </div>
                    {/* Pass the subject._id to the InnerSubjectUnit component to fetch inner units */}

                    <div className="card-footer card-footer-subject-custom mt-3">
                      <SubTopic topic={topic} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Render EditSubject Modal */}
      {isEditModalOpen && (
        <EditTopic
          topic={selectedTopic}
          setTopicsData={setTopicsData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default Topic;
