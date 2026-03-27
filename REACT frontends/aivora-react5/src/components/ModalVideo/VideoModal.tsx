import React, { useRef, useState } from "react";

const VIDEO_URL = "https://www.youtube.com/embed/OUB6zKc-Tos?autoplay=1";

const VideoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const openModal = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (iframeRef.current) iframeRef.current.src = VIDEO_URL;
    }, 50);
  };

  const closeModal = () => {
    if (iframeRef.current) iframeRef.current.src = "about:blank"; // stop video
    setIsOpen(false);
  };

  return (
    <>
      {/* ▶️ Trigger Button */}
      <button className="video-btn" onClick={openModal} aria-label="Play video">
        <i className="fi flaticon-play" aria-hidden="true"></i>
      </button>

      {/* 🎬 Custom Video Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="video-popup-overlay"
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="video-popup"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(900px, 90vw)",
              aspectRatio: "16 / 9",
              background: "#000",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              animation: "fadeIn 0.3s ease",
            }}
          >
            <iframe
              ref={iframeRef}
              title="Ai Video"
              width="100%"
              height="100%"
              src="about:blank"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              frameBorder={0}
            />
            <button
              onClick={closeModal}
              aria-label="Close video"
              style={{
                position: "absolute",
                top: 10,
                right: 14,
                color: "#fff",
                background: "transparent",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
