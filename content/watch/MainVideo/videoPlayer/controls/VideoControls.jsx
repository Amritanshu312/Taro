import NextSkip from "./NextSkip"
import Play from "./Play"
import Settings from "./Settings"
import TimeStamp from "./TimeStamp"
import Volume from "./Volume"

const VideoControls = ({ videoRef }) => {
  return (
    <div className="h-full w-full flex items-center px-4 justify-between">

      <div className="flex items-center gap-4">
        <Play videoRef={videoRef} />
        <NextSkip videoRef={videoRef} />
        <Volume videoRef={videoRef} />
        <TimeStamp videoRef={videoRef} />
      </div>

      <div className="flex items-center gap-4">
        <Settings />
      </div>
    </div>
  )
}

export default VideoControls