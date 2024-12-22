import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';

const TimeStamp = React.memo(({ videoRef }) => {
  // Use useRef for current time to avoid unnecessary re-renders
  const currentTimeRef = useRef(0);
  const [displayTime, setDisplayTime] = useState('0:00 / 0:00');
  const animationFrameRef = useRef(null);

  // Memoize time formatting to prevent recreation
  const formatTime = useCallback((timeInSeconds) => {
    if (!timeInSeconds || isNaN(timeInSeconds)) return '0:00';

    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${hours > 0 ? `${hours}:` : ''}${hours > 0 && minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  // Optimize update logic
  const updateCurrentTime = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 0;

      // Only update if time has meaningfully changed
      if (Math.abs(currentTime - currentTimeRef.current) >= 0.1) {
        currentTimeRef.current = currentTime;

        // Combine formatting to reduce render cycles
        setDisplayTime(`${formatTime(currentTime)} / ${formatTime(duration)}`);
      }

      // Continue animation frame
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    }
  }, [videoRef, formatTime]);

  // Optimized effect with minimal dependencies
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      // Initial time setup
      const duration = videoElement.duration || 0;
      setDisplayTime(`0:00 / ${formatTime(duration)}`);

      // Start performance-optimized update loop
      animationFrameRef.current = requestAnimationFrame(updateCurrentTime);

      // Cleanup function
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [videoRef, updateCurrentTime, formatTime]);

  // Minimal render with pure string display
  return (
    <div
      className="duration-200 font-['poppins'] text-[#ffffffcd] text-sm select-none"
      // Prevent text selection for better performance
      role="timer"
    >
      {displayTime}
    </div>
  );
});

TimeStamp.displayName = 'TimeStamp';

export default TimeStamp;