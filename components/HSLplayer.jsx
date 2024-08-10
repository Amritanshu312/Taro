"use client"
import { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const HLSPlayer = ({ url, startAtSeconds, controls, ondataloaded, speed }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (startAtSeconds) {
          videoRef.current.currentTime = startAtSeconds;
        }
        videoRef.current.play();
      });

      hlsRef.current = hls;
    } else if (videoRef.current && videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // For browsers that support HLS natively
      videoRef.current.src = url;
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (startAtSeconds) {
          videoRef.current.currentTime = startAtSeconds;
        }
        videoRef.current.play();
      });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [url, startAtSeconds]);

  return (
    <video
      ref={videoRef}
      controls={controls || false}
      autoPlay={!controls}
      muted={!controls}
      preload={!controls ? "auto" : "metadata"}
      onCanPlay={() => ondataloaded(true)}
      onLoadStart={(event) => {
        event.currentTarget.playbackRate = speed || 1;
      }}
      className="w-full h-full object-cover"
    />

  );
};

export default HLSPlayer;
