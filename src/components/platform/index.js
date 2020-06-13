import React, { useRef, useEffect } from 'react';
import './index.css';

export default function Platform() {
  const videoRef = useRef(null);
  useEffect(() => {
    videoRef.current.srcObject = window.currentStream;
  }, []);

  return (
    <div className="platform">
      <div className="move-ctn">
        <video ref={videoRef} className="video" autoPlay />
      </div>
    </div>
  );
}
