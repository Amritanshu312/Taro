import React, { useState, useRef } from 'react';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';

const Volume = ({ videoRef }) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const sliderRef = useRef(null);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      videoRef.current.muted = newMuteState;

      // If unmuting, restore previous volume
      if (!newMuteState && volume === 0) {
        videoRef.current.volume = 1;
        setVolume(1);
      }
    }
  };

  return (
    <div className="volume-group flex items-center space-x-2 relative duration-500 group">
      <button
        onClick={toggleMute}
        className="v-btn volume-btn focus:outline-none"
      >
        {isMuted ? <HiVolumeOff className="w-6 h-6 hover:text-[#fff] text-[#ffffffcd]" /> : <HiVolumeUp className="w-6 h-6 hover:text-[#fff] text-[#ffffffcd]" />}
      </button>

      <div className="w-max pointer-events-none px-3 right-1/3 -translate-x-1/2 py-1 absolute text-sm bg-[#fafafa] font-['poppins'] text-[15px] text-[#131316] rounded-md group-hover:scale-100 group-hover:delay-500 group-hover:bottom-9 group-hover:opacity-100 bottom-0 opacity-0 scale-0 duration-200">
        {!isMuted ? "Mute" : "Unmute"} (k)
      </div>

      <div className="relative flex items-center">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          ref={sliderRef}
          className="group-hover:w-full w-0 duration-300 transition-all ease-in-out h-1 bg-white/20 rounded-full appearance-none cursor-pointer 
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-3 
            [&::-webkit-slider-thumb]:h-3 
            group-hover:[&::-webkit-slider-thumb]:bg-white 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:shadow"
        />
      </div>
    </div>
  );
};

export default Volume;