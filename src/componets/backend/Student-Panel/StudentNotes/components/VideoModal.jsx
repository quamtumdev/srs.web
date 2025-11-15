/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useEffect } from "react"; // ✅ Proper import

const VideoModal = ({ isOpen, videoId, onClose }) => {
  if (!isOpen) return null;

  // Handle escape key press
  const handleKeyDown = e => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // ✅ Fixed useEffect with proper import
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]); // ✅ Only isOpen dependency needed

  // ✅ Clean and validate video ID
  const cleanVideoId = videoId?.toString().trim();
  const isValidVideoId = cleanVideoId && cleanVideoId.length > 5;

  console.log("VideoModal Debug:", { videoId, cleanVideoId, isValidVideoId }); // ✅ Debug log

  return (
    <div className="modal-overlay-dark-veido" onClick={onClose}>
      <div
        className="modal-content-container-veido"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="close-button-vedio"
          title="Close Video (Esc)"
        >
          ×
        </button>

        <div className="video-container-our">
          {isValidVideoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${cleanVideoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
              title="Educational Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              // ✅ Added error handling
              onError={() =>
                console.error("Video failed to load:", cleanVideoId)
              }
            />
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-center text-white">
                <i className="fas fa-exclamation-triangle fa-3x mb-3"></i>
                <h5>Video Not Available</h5>
                <p>Sorry, this video is currently not available.</p>
                <small className="text-muted">
                  Video ID: {videoId || "Not provided"}
                </small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
