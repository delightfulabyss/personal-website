import { useRef } from "react";

function VideoBackground() {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const setPlaybackSpeed = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3;
    }
  };
  return (
    <div className="relative">
      <video
        className="fixed right-0 bottom-0 min-w-full min-h-full"
        ref={videoRef}
        onCanPlay={() => setPlaybackSpeed()}
        src="/smoke.mp4"
        autoPlay
        loop
        muted
      ></video>{" "}
      <div className="fixed inset-0 min-w-full min-h-full bg-purple-600/40"></div>
    </div>
  );
}

export default VideoBackground;
