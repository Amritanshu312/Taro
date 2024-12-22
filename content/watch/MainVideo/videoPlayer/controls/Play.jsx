import React, { useEffect, useState, useCallback, useRef } from "react";
import { FaPause, FaPlay } from "react-icons/fa6";

const Play = ({ videoRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const playPromiseRef = useRef(null);

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cancel any existing play promise to prevent AbortError
    if (playPromiseRef.current) {
      playPromiseRef.current.catch(() => { });
    }

    if (video.paused) {
      // Wrap play in a try-catch to handle potential errors
      playPromiseRef.current = video.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          // Handle any play errors gracefully
          if (error.name !== 'AbortError') {
            console.error('Error playing video:', error);
          }
          setIsPlaying(false);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use existing play/pause state tracking
    const updatePlayState = () => {
      setIsPlaying(!video.paused);
    };

    video.addEventListener('play', updatePlayState);
    video.addEventListener('pause', updatePlayState);

    return () => {
      video.removeEventListener('play', updatePlayState);
      video.removeEventListener('pause', updatePlayState);

      // Clean up any pending play promise
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => { });
      }
    };
  }, [videoRef]);

  return (
    <div
      className="w-8 h-8 flex items-center justify-center text-xl duration-100 text-[#ffffffcd] cursor-pointer hover:text-[#fff] relative group"
      onClick={handlePlayPause}
    >
      <div className="w-max pointer-events-none select-none px-3 right-1/2 translate-x-1/2 py-1 absolute text-sm bg-[#fafafa] font-['poppins'] text-[15px] text-[#131316] rounded-md group-hover:scale-100 group-hover:delay-500 group-hover:bottom-9 group-hover:opacity-100 bottom-0 opacity-0 scale-0 duration-200">
        {!isPlaying ? "Play" : "Pause"} (k)
      </div>

      {!isPlaying ? <FaPlay /> : <FaPause />}
    </div>
  );
};

export default React.memo(Play);