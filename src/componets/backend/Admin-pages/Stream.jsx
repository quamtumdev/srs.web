import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import AddStream from "./StreamUI/AddStream";
import EditStream from "./StreamUI/EditStream";
import "../Admin/AdminCSS.css";
import "../Admin/AdminJS.js";

const Stream = () => {
  const [streamsData, setStreamsData] = useState([]); // Initially empty array
  const [selectedStream, setSelectedStream] = useState(null); // Track selected stream for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal open/close state
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // Fetch streams data from backend when component mounts
  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/stream/streams" // Assuming streams API endpoint
        );
        if (!response.ok) {
          throw new Error("Failed to fetch streams");
        }
        const data = await response.json();
        setStreamsData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching streams: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchStreams(); // Fetch data on mount
  }, []);

  // Add a new stream
  const addNewStream = newStream => {
    setStreamsData([...streamsData, newStream]);
  };

  // Toggle the active status of a stream
  const toggleActiveStatus = id => {
    setStreamsData(prevData =>
      prevData.map(stream =>
        stream._id === id ? { ...stream, active: !stream.active } : stream
      )
    );
  };

  // Open the edit modal
  const openEditModal = stream => {
    setSelectedStream(stream); // Set the selected stream to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedStream(null); // Clear selected stream
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="stream-h1">Streams</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddStream addNewStream={addNewStream} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading streams...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched streams data and display them */}
            {streamsData.map(stream => (
              <div className="col-md-12" key={stream._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title">{stream.title}</h3>
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
                          stream.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(stream._id)}
                      >
                        {stream.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn stream-custom-btn edit-btn"
                        onClick={() => openEditModal(stream)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body stream-card">
                    {/* Display URL */}
                    <div className="row">
                      <div className="col-md-12">
                        <strong>URL:</strong>
                        {stream.url}
                      </div>
                    </div>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: Array.isArray(stream.content)
                          ? stream.content.join("")
                          : stream.content,
                      }}
                    />
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      <div className="col-md-3">
                        <strong>Created By:</strong>
                        <span> {stream.createdBy} </span>
                      </div>
                      <div className="col-md-3">
                        <strong>Created On:</strong>
                        <span> {stream.createdOn}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated By:</strong>
                        <span> {stream.updatedBy}</span>
                      </div>
                      <div className="col-md-3">
                        <strong>Updated On:</strong>
                        <span> {stream.updatedOn}</span>
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
        <EditStream
          stream={selectedStream}
          setStreamsData={setStreamsData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default Stream;
