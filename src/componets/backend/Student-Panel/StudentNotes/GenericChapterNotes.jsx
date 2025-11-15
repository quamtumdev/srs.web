/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useChapterTopics from "./hooks/useChapterTopics";
import FullscreenNotesView from "./components/FullscreenNotesView";
import TopicsListView from "./components/TopicsListView";
import "../../../../assets/backend/dist/css/studentadmin.css";

const GenericChapterNotes = () => {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  // Get subject and chapter from URL
  const { subject, chapterNumber } = useParams();

  // Use custom hook for data fetching
  const { chapterData, loading, error, retryLoading } = useChapterTopics(
    subject,
    chapterNumber
  );

  if (loading) {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3">
              Loading {chapterData?.subject || subject} Chapter {chapterNumber}
              ...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="alert alert-danger mt-4">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
            <button
              className="btn btn-outline-danger btn-sm ms-3"
              onClick={retryLoading}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (selectedTopic) {
    return (
      <FullscreenNotesView
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={videoId}
        setVideoId={setVideoId}
        isGeneratingPDF={isGeneratingPDF}
        setIsGeneratingPDF={setIsGeneratingPDF}
        chapterData={chapterData}
      />
    );
  }

  return (
    <TopicsListView
      setSelectedTopic={setSelectedTopic}
      isVideoOpen={isVideoOpen}
      setIsVideoOpen={setIsVideoOpen}
      videoId={videoId}
      setVideoId={setVideoId}
      isGeneratingPDF={isGeneratingPDF}
      setIsGeneratingPDF={setIsGeneratingPDF}
      chapterData={chapterData}
    />
  );
};

export default GenericChapterNotes;
