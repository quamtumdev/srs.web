import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import AddTest from "./AddTest";
import EditTest from "./EditTest";
import "../../Admin/AdminCSS.css";
import "../../Admin/AdminJS.js";
import Question from "./QuestionsModules/Question.jsx";
import TestTypeFilter from "./TestTypeFilter.jsx";
import TestFilter from "./TestFilter.jsx";
const TestList = () => {
  const [testsData, setTestsData] = useState([]); // Initially empty array
  const [selectedTest, setSelectedTest] = useState(null); // Track selected stream for editing
  const [selectedTestType, setSelectedTestType] = useState(null); // Track selected test type for filtering
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To handle errors

  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useState("");
  // Handle testType filter change
  const handleTestTypeSelect = selectedOption => {
    setSelectedTestType(selectedOption); // Set selected test type to filter the tests
  };
  const handleTestSearch = term => {
    setSearchTerm(term);
    // Here, you can implement the filtering logic based on the term
    console.log("Search Term:", term);
    // If you want to filter the tests based on `testType` and `content`, you can do it here.
  };
  // Open the edit modal
  const openEditModal = test => {
    setSelectedTest(test); // Set the selected test to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  // Close the edit modal
  const closeEditModal = () => {
    setIsEditModalOpen(false); // Close the modal
    setSelectedTest(null); // Clear selected test
  };
  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true); // Set loading state to true
      setError(null); // Reset any previous errors

      try {
        let url = "http://localhost:5000/api/auth/testlists"; // Default URL
        const filters = [];

        // Add selectedTestType to filters if it exists
        if (selectedTestType) {
          filters.push(
            `testType=${encodeURIComponent(selectedTestType.value.trim())}`
          );
        }

        // Handle the searchTerm for dynamic filtering
        if (searchTerm) {
          // If searchTerm contains 'testType=', filter by testType
          if (searchTerm.includes("testType=")) {
            const testTypeValue = searchTerm.split("testType=")[1].trim();
            filters.push(`testType=${encodeURIComponent(testTypeValue)}`);
          }
          // If searchTerm contains 'content=', filter by content
          else if (searchTerm.includes("content=")) {
            const contentValue = searchTerm.split("content=")[1].trim();
            filters.push(`content=${encodeURIComponent(contentValue)}`);
          }
          // Otherwise, treat searchTerm as content filter
          else {
            filters.push(`content=${encodeURIComponent(searchTerm.trim())}`);
          }
        }

        // If filters exist, append them to the URL
        if (filters.length > 0) {
          url = `${url}/filter?${filters.join("&")}`;
        }

        // Log the final URL for debugging
        console.log("Constructed URL: ", url);

        // Fetch the filtered data
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch filtered tests");
        }

        const data = await response.json();
        setTestsData(data); // Set the fetched data to the state
      } catch (error) {
        setError("Error fetching tests: " + error.message); // Handle error
      } finally {
        setLoading(false); // Reset loading state after request
      }
    };

    fetchTests(); // Fetch data when searchTerm or selectedTestType changes
  }, [searchTerm, selectedTestType]); // Dependency array

  // Add a new test
  const addNewTest = newTest => {
    setTestsData([...testsData, newTest]);
  };

  // Toggle the active status of a test
  const toggleActiveStatus = id => {
    setTestsData(prevData =>
      prevData.map(test =>
        test._id === id ? { ...test, active: !test.active } : test
      )
    );
  };

  // Toggle active status for a section
  const toggleActiveSection = id => {
    setTestsData(prevData =>
      prevData.map(test =>
        test._id === id
          ? { ...test, isActiveSection: !test.isActiveSection }
          : test
      )
    );
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <h1 className="test-h1">Test List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <AddTest addNewTest={addNewTest} />
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <h6>Filter by Test Type</h6>
            <div className="col-lg-5">
              <TestTypeFilter onTestTypeSelect={handleTestTypeSelect} />
            </div>
            <div className="col-lg-5">
              <TestFilter onTestSearch={handleTestSearch} />
            </div>
          </div>
        </div>
      </section>

      <section className="content mt-3">
        <div className="container-fluid">
          <div className="row">
            {/* Loading and Error Handling */}
            {loading && <p>Loading tests...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Loop through fetched tests data and display them */}
            {testsData.map(test => (
              <div className="col-md-12" key={test._id}>
                <div className="card collapsed-card">
                  <div className="card-header">
                    <h3 className="card-title pt-2">{test.title}</h3>
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
                        className={`btn test-custom-btn ${
                          test.active ? "active-btn" : "inactive-btn"
                        }`}
                        onClick={() => toggleActiveStatus(test._id)}
                      >
                        {test.active ? "Active" : "Inactive"}
                      </button>
                      {/* Edit button */}
                      <button
                        type="button"
                        className="btn stream-custom-btn edit-btn"
                        onClick={() => openEditModal(test)}
                      >
                        <FaEdit className="fs-4" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 details-label">
                        <strong>Exam type: </strong>
                        {Array.isArray(test.examType)
                          ? test.examType.join(", ")
                          : test.examType}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Duration: </strong>
                        {test.duration}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Max Questions: </strong>
                        {test.maxQuestions}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Total Added Questions: </strong>
                        {/* Add relevant data or conditionally display */}
                        {test.totalAddedQuestions || "Not Available"}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>Start Date: </strong>
                        {test.startDate}
                      </div>
                      <div className="col-md-6 details-label">
                        <strong>End Date: </strong>
                        {test.endDate}
                      </div>
                      <div className="col-md-6 details-label">
                        {Array.isArray(test.testType) &&
                        test.testType.length > 0 ? (
                          test.testType.map((type, index) => (
                            <div key={index}>
                              {type.testType && type.testType.length > 0 && (
                                <p>
                                  <strong>Test Type: </strong>
                                  {type.testType.join(", ")}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <span>No Test Type Information Available</span>
                        )}
                      </div>
                      <div className="col-md-12 panel-details">
                        <strong className="description">Description: </strong>
                        {Array.isArray(test.content)
                          ? test.content.join(", ")
                          : test.content}
                      </div>
                    </div>
                    <div className="border-top-card-custom">
                      <div className="row">
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Created By:{" "}
                          </strong>
                          <span>{test.createdBy}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Created On:{" "}
                          </strong>
                          <span>{test.createdOn}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Updated By:{" "}
                          </strong>
                          <span>{test.updatedBy}</span>
                        </div>
                        <div className="col-md-6">
                          <strong className="info-item mb-2">
                            Updated On:{" "}
                          </strong>
                          <span>{test.updatedOn}</span>
                        </div>
                      </div>
                    </div>
                    <div className="sub-content">
                      <h4 className="mb-2">Sections</h4>
                      <div className="row">
                        {test.sections && test.sections.length > 0 ? (
                          test.sections.map((section, index) => (
                            <div className="col-md-12" key={index}>
                              <div className="card card-light collapsed-card">
                                <div className="card-header">
                                  <h3 className="card-title mt-2">Section</h3>
                                  <div className="card-tools">
                                    <button
                                      type="button"
                                      className="btn btn-tool"
                                      data-card-widget="collapse"
                                    >
                                      <i className="fas fa-plus"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className={`btn test-custom-btn ${
                                        section.isActive
                                          ? "active-btn"
                                          : "inactive-btn"
                                      }`}
                                      onClick={() =>
                                        toggleActiveSection(section._id)
                                      }
                                    >
                                      {section.isActive ? "Active" : "Inactive"}
                                    </button>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-sm-12">
                                      <ol className="float-sm-right">
                                        <Question />
                                      </ol>
                                    </div>
                                    <div className="col-md-6 details-label">
                                      {section.sectionGuideline &&
                                        section.sectionGuideline.length > 0 && (
                                          <div>
                                            <strong>Guideline: </strong>
                                            {section.sectionGuideline.join(
                                              ", "
                                            )}
                                          </div>
                                        )}
                                    </div>
                                    <div className="col-md-6 details-label">
                                      {section.sectionMarkingScheme &&
                                        section.sectionMarkingScheme.length >
                                          0 && (
                                          <div>
                                            <strong>Marking Scheme: </strong>
                                            {section.sectionMarkingScheme.join(
                                              ", "
                                            )}
                                          </div>
                                        )}
                                    </div>
                                    <div className="col-md-6 details-label">
                                      <strong>Display Order: </strong>
                                      {section.sectionDisplayOrder}
                                    </div>
                                    <div className="col-md-6 details-label">
                                      <strong>Total Added Questions: </strong>
                                      {/* Add relevant data or conditionally display */}
                                      {section.totalAddedQuestions ||
                                        "Not Available"}
                                    </div>

                                    <div className="col-md-12 panel-details">
                                      <strong className="description">
                                        Description:{" "}
                                      </strong>
                                      {section.sectionDescription}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-md-12">
                            <span>No section data available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isEditModalOpen && (
        <EditTest
          test={selectedTest}
          setTestsData={setTestsData}
          closeEditModal={closeEditModal}
        />
      )}
    </>
  );
};

export default TestList;
