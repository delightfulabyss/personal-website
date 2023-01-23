import { useRef } from "react";

function VideoBackground() {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const setPlaybackSpeed = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.25;
    }
  };
  return (
    <div className="relative">
      <video
        className="fixed right-0 bottom-0 min-w-full min-h-full"
        ref={videoRef}
        onCanPlay={() => setPlaybackSpeed()}
        autoPlay
        loop
        muted
      >
        <source src="smoke.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 min-w-full min-h-full bg-purple-500/40"></div>
    </div>
  );
}

export default VideoBackground;
