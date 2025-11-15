/* eslint-disable react/prop-types */
import VideoModal from "./VideoModal";
import { generateTopicPDF } from "../utils/pdfUtils";

const TopicsListView = ({
  setSelectedTopic,
  isVideoOpen,
  setIsVideoOpen,
  videoId,
  setVideoId,
  isGeneratingPDF,
  setIsGeneratingPDF,
  chapterData,
}) => {
  const openVideo = (topicTitle, topicVideoId) => {
    const finalVideoId = topicVideoId || "4-bHmmEQ_OE";
    setVideoId(finalVideoId);
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

  const truncateTitle = (title, maxWords = 4) => {
    if (!title) return "";
    const words = title.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return title;
  };

  // Use backend data or fallback to empty
  const topics = chapterData?.topics || [];
  const chapterTitle = chapterData?.title || "Chapter";
  const subjectName = chapterData?.subject || "Subject";
  const chapterNumber = chapterData?.chapterNumber || "1";

  // Format backend data to match your existing structure
  const formatTopicsForDisplay = backendTopics => {
    return backendTopics.map((topic, index) => ({
      // Your existing format
      page: `Topic ${index + 1}`,
      title: topic.topicTitle,
      content: topic.topicContent,
      // Keep original backend data
      topicTitle: topic.topicTitle,
      topicContent: topic.topicContent,
      videoId: topic.videoId,
      pdfUrl: topic.pdfUrl,
      hasVideo: !!topic.videoId,
      hasPdf: !!topic.pdfUrl,
      additionalResources: topic.additionalResources || [],
    }));
  };

  const formattedTopics = formatTopicsForDisplay(topics);

  return (
    <>
      <VideoModal
        isOpen={isVideoOpen}
        videoId={videoId}
        onClose={() => setIsVideoOpen(false)}
      />

      {isGeneratingPDF && (
        <div className="generatingPdf">
          <div className="gernating-pdf-element">
            <span className="spinner-border text-primary mb-4" /> <br />
            <b>Generating Clean PDF...</b>
            <p className="text-muted mt-2">
              Processing content for optimal display
            </p>
          </div>
        </div>
      )}

      <section className="content chapter-content">
        <div className="container-fluid">
          <div className="row mb-3 mt-3">
            <div className="col-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">
                    📚 {subjectName} - Chapter {chapterNumber}: {chapterTitle}
                  </h3>
                  <div className="card-tools">
                    <span className="badge badge-warning">
                      {formattedTopics.length} Topics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h5 className="mb-3"> 📖 Study Topics & Materials</h5>
          <div className="row">
            {formattedTopics.length === 0 ? (
              <div className="col-12">
                <div className="text-center py-4">
                  <i className="fas fa-book-open fa-3x text-muted mb-3"></i>
                  <h5 className="text-muted">No Topics Found</h5>
                  <p className="text-muted">
                    No topics available for {subjectName} Chapter{" "}
                    {chapterNumber}.
                  </p>
                </div>
              </div>
            ) : (
              formattedTopics.map((section, index) => (
                <div key={index} className="col-md-4 col-sm-12 col-lg-4 mb-4">
                  <div className="info-box">
                    <span className="info-box-icon bg-info">
                      <i className="fas fa-book-open"></i>
                    </span>

                    <div className="info-box-content">
                      <span className="info-box-text">
                        {truncateTitle(section.title, 3)}
                      </span>

                      {/* Show content preview */}
                      {section.content && (
                        <small className="text-muted d-block mt-1">
                          {section.content.substring(0, 29)}...
                        </small>
                      )}

                      <div className="mt-2 icons-btns">
                        <button
                          className="btn btn-sm btn-outline-primary btns-icons-more"
                          onClick={() => setSelectedTopic(section)}
                          title="View Topic Details"
                        >
                          <i className="fas fa-eye"></i> View
                        </button>

                        <button
                          className="btn btn-sm btn-outline-success btns-icons-more"
                          onClick={() => handleGeneratePDF(section)}
                          title="Download PDF"
                          disabled={isGeneratingPDF}
                        >
                          <i className="fas fa-download"></i> PDF
                        </button>

                        <button
                          className="btn btn-sm btn-outline-warning btns-icons-more"
                          onClick={() =>
                            openVideo(section.title, section.videoId)
                          }
                          title="Watch Video"
                        >
                          <i className="fas fa-play-circle"></i> Video
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default TopicsListView;
