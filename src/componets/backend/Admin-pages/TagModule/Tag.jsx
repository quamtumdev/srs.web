import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import AddTag from "./AddTag.jsx";
import EditTag from "./EditTag.jsx";

const Tag = () => {
  const [tagsData, setTagsData] = useState([]); // Initially empty array
  const [selectedTags, setSelectedTags] = useState(null); // Track selected stream for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch streams data from backend when component mounts
  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/tags/tags" // Assuming streams API endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        setTagsData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching streams: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchTags(); // Fetch data on mount
  }, []);

  // Add a new stream
  const addNewTags = newTags => {
    setTagsData([...tagsData, newTags]);
  };

  // Toggle the active status of a stream
  const toggleActiveStatus = id => {
    setTagsData(prevData =>
      prevData.map(tags =>
        tags._id === id ? { ...tags, active: !tags.active } : tags
      )
    );
  };

  // Open the edit modal
  const openEditModal = tags => {
    setSelectedTags(tags); // Set the selected stream to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedTags(null); // Clear selected stream
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="stream-h1">Tags</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddTag addNewTags={addNewTags} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading tags...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched streams data and display them */}
            {tagsData.map(tags => (
              <div className="col-md-12" key={tags._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{tags.title}</h3>
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
                          tags.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(tags._id)}
                      >
                        {tags.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn stream-custom-btn edit-btn"
                        onClick={() => openEditModal(tags)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body stream-card">
                    {/* Display URL */}
                    <div className="row">
                      <div className="col-md-12">
                        <strong>Tag URL: </strong>
                        {tags.url}
                      </div>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(tags.content)
                          ? tags.content.join("")
                          : tags.content,
                      }}
                    />
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Created By:</strong>
                        <span> {tags.createdBy} </span>
                      </div>
                      <div className="col-md-3">
                        <strong>Created On:</strong>
                        <span> {tags.createdOn}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated By:</strong>
                        <span> {tags.updatedBy}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated On:</strong>
                        <span> {tags.updatedOn}</span>
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
        <EditTag
          tags={selectedTags}
          setTagsData={setTagsData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default Tag;
