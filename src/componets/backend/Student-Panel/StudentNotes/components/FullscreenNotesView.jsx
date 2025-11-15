/* eslint-disable react/prop-types */
import VideoModal from "./VideoModal";
import { highlightImportantText, generateTopicPDF } from "../utils/pdfUtils";

const FullscreenNotesView = ({
  selectedTopic,
  setSelectedTopic,
  isVideoOpen,
  setIsVideoOpen,
  videoId,
  setVideoId,
  isGeneratingPDF,
  setIsGeneratingPDF,
  chapterData,
}) => {
  // eslint-disable-next-line no-unused-vars
  const openVideo = topicTitle => {
    const topicVideoId = selectedTopic.videoId || "4-bHmmEQ_OE";
    setVideoId(topicVideoId);
    setIsVideoOpen(true);
  };

  const handleGeneratePDF = async topic => {
    setIsGeneratingPDF(true);
    try {
      await generateTopicPDF(topic);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("PDF Generate Error! Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Format backend data to match your existing structure
  const formatTopicData = topic => {
    return {
      page: "Topic",
      title: topic.topicTitle || topic.title,
      content: topic.topicContent || topic.content,
    };
  };

  // Get formatted data for display
  const displayTopic = formatTopicData(selectedTopic);

  // Dynamic subject and chapter info
  const subjectName = chapterData?.subject || "Subject";
  // eslint-disable-next-line no-unused-vars
  const subjectRoute = chapterData?.subjectRoute || "subject";
  const chapterNumber = chapterData?.chapterNumber || "1";
  const chapterTitle = chapterData?.title || "Chapter Title";

  return (
    <div className="fullscreen-container-pdf">
      <VideoModal
        isOpen={isVideoOpen}
        videoId={videoId}
        onClose={() => setIsVideoOpen(false)}
      />

      <section className="content">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#" onClick={() => setSelectedTopic(null)}>
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#" onClick={() => setSelectedTopic(null)}>
                      {subjectName}
                    </a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Chapter {chapterNumber} Notes
                  </li>
                </ol>
              </nav>
              <h1>
                Chapter {chapterNumber}: {chapterTitle}
              </h1>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12">
              <div className="header-notes-inner">
                {subjectName} - Chapter {chapterNumber}: {displayTopic.title} -
                Study Materials
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 text-center">
              <button
                className="btn btn-primary me-3"
                onClick={() => setSelectedTopic(null)}
                style={{ padding: "10px 20px" }}
              >
                ← Back to Materials
              </button>
              <button
                className="btn btn-success"
                onClick={() => handleGeneratePDF(selectedTopic)}
                disabled={isGeneratingPDF}
                style={{ padding: "10px 20px" }}
              >
                📥 {isGeneratingPDF ? "Generating..." : "Download PDF"}
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header text-white card-notes-inner">
                  {displayTopic.page}: {displayTopic.title}
                </div>

                <div className="card-body card-notes-inner-body">
                  <div
                    style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}
                    dangerouslySetInnerHTML={{
                      __html: highlightImportantText(displayTopic.content),
                    }}
                  />

                  {/* Show additional resources if available */}
                  {selectedTopic.additionalResources &&
                    selectedTopic.additionalResources.length > 0 && (
                      <div className="mt-4">
                        <h6 className="text-primary">
                          <i className="fas fa-plus-circle me-2"></i>
                          Additional Resources
                        </h6>
                        <div className="row">
                          {selectedTopic.additionalResources.map(
                            (resource, index) => (
                              <div key={index} className="col-md-6 mb-2">
                                <div className="card border-left-primary">
                                  <div className="card-body p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div>
                                        <i
                                          className={`fas ${
                                            resource.resourceType === "pdf"
                                              ? "fa-file-pdf text-danger"
                                              : resource.resourceType ===
                                                "video"
                                              ? "fa-play-circle text-warning"
                                              : resource.resourceType === "link"
                                              ? "fa-link text-primary"
                                              : "fa-file text-secondary"
                                          } me-2`}
                                        ></i>
                                        <span className="small">
                                          {resource.resourceTitle}
                                        </span>
                                      </div>
                                      <a
                                        href={resource.resourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-outline-primary"
                                      >
                                        <i className="fas fa-external-link-alt"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>

                <div className="card-footer text-center card-notes-inner-footer">
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-success"
                      onClick={() => handleGeneratePDF(selectedTopic)}
                      disabled={isGeneratingPDF}
                    >
                      <i className="fas fa-download"></i>{" "}
                      {isGeneratingPDF ? "Generating..." : "Download PDF"}
                    </button>

                    {selectedTopic.hasVideo && (
                      <button
                        className="btn btn-warning"
                        onClick={() => openVideo(displayTopic.title)}
                      >
                        <i className="fas fa-play"></i> Watch Video
                      </button>
                    )}

                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedTopic(null)}
                    >
                      <i className="fas fa-arrow-left"></i> Back to Topics
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FullscreenNotesView;
