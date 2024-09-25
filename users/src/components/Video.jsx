import React, { useRef, useState } from 'react';
import './Video.css'; // Ensure this file is included

const Video = () => {
  const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const handlePlayPause = () => {
//     if (videoRef.current.paused) {
//       videoRef.current.play();
//       setIsPlaying(true);
//     } else {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

  return (
    <div className=' video-container'>
      <video ref={videoRef} src="https://media.istockphoto.com/id/1490514618/video/minimal-and-modern-japandi-style-dining-room-interior-design-and-decoration-with-wooden-table.mp4?s=mp4-640x640-is&k=20&c=tZ3iCKSj0mWmJXyB5lVUYp65LhhNi1aa7SzjMq0gtGE=" autoPlay  muted></video>
     
    </div>
  );
};

export default Video;
