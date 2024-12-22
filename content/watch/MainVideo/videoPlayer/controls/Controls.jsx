import { useState } from "react";
import SeekSlider from "./SeekSlider";
import VideoControls from "./VideoControls";

const Controls = ({ PlayerRef }) => {


  return (
    <>
      <div className="absolute bottom-0 text-white w-full h-16 z-10 flex flex-col">
        <SeekSlider videoRef={PlayerRef} />

        <VideoControls videoRef={PlayerRef} />
      </div>


    </>
  );
};

export default Controls;
