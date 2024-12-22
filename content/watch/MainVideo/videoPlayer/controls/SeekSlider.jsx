import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';

const SeekSlider = ({ videoRef }) => {
  const progressRef = useRef(null);
  const hoverTimeRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [hoverState, setHoverState] = useState({
    progress: 0,
    time: null,
    isDragging: false
  });

  // Ultra-lightweight time formatter
  const formatTime = useCallback((timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  // Optimized seek calculation with reduced allocations
  const calculateSeek = useCallback((e) => {
    const progressEl = progressRef.current;
    const videoElement = videoRef.current;

    if (!progressEl || !videoElement) return null;

    const rect = progressEl.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newTime = (clickX / rect.width) * videoElement.duration;

    return {
      time: newTime,
      progress: clickX,
      percentage: (newTime / videoElement.duration) * 100
    };
  }, [videoRef]);

  // Consolidated seek handler with minimal re-renders
  const handleSeek = useCallback((e, shouldSetTime = true) => {
    const seekData = calculateSeek(e);
    if (!seekData) return;

    // Batch state updates
    setHoverState(prev => ({
      ...prev,
      progress: seekData.progress,
      time: seekData.time
    }));

    if (shouldSetTime && videoRef.current) {
      videoRef.current.currentTime = seekData.time;
      setProgress(seekData.percentage);
    }
  }, [calculateSeek, videoRef]);

  // Memoized event handlers to prevent unnecessary re-renders
  const eventHandlers = useMemo(() => ({
    onClick: handleSeek,
    onMouseMove: (e) => {
      hoverState.isDragging ? handleSeek(e) : handleSeek(e, false);
    },
    onMouseDown: (e) => {
      setHoverState(prev => ({ ...prev, isDragging: true }));
      handleSeek(e);
    },
    onMouseLeave: () => {
      if (!hoverState.isDragging) {
        setHoverState(prev => ({ ...prev, time: null, progress: 0 }));
      }
    }
  }), [handleSeek, hoverState.isDragging]);

  // Performance-optimized global mouseup listener
  useEffect(() => {
    const handleMouseUp = () => {
      setHoverState(prev => ({ ...prev, isDragging: false }));
    };

    document.addEventListener('mouseup', handleMouseUp, { passive: true });
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  // Compute hover time position to center it
  const getHoverTimePosition = useCallback(() => {
    if (!hoverTimeRef.current || !progressRef.current) return 0;

    const hoverTimeWidth = hoverTimeRef.current.offsetWidth;
    return hoverState.progress - (hoverTimeWidth / 2);
  }, [hoverState.progress]);

  return (
    <div
      ref={progressRef}
      {...eventHandlers}
      className="h-4 cursor-pointer mx-4 flex items-center group relative"
    >
      <div className="h-1 w-full bg-[#fafafa33] rounded-md group-hover:h-[7px] duration-100 relative">
        {hoverState.time !== null && (
          <div
            ref={hoverTimeRef}
            className="bg-[#fafafa] select-none absolute w-max -top-8 px-2 tracking-wide rounded-md font-['poppins'] text-[14px] font-medium py-[3px] group-hover:block hidden text-[#131316] scale-0 group-hover:scale-100"
            style={{
              left: `${getHoverTimePosition()}px`,
              transform: "translateX(3px)"
            }}
          >
            {formatTime(hoverState.time)}
          </div>
        )}
        <div
          className="h-full bg-[linear-gradient(90deg,#7336ff_90%,#b08eff)] rounded-md relative"
          style={{ width: `${progress}%` }}
        >
          <div className="w-4 h-4 bg-[#e7e7e7dc] absolute -right-2 border-[1px] border-[#fafafadf] bottom-[50%] translate-y-[50%] rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SeekSlider);