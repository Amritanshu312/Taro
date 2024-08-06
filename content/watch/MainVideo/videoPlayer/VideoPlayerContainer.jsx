import { AnimatePresence, motion } from 'framer-motion';
import LoadingVideo from '@/components/loadings/loadingVideo/loadingVideo';
import useArtplayer from './useArtplayer';
import { useWatchContext } from '@/context/Watch';
import { useWatchSettingContext } from '@/context/WatchSetting';

const VideoPlayerContainer = ({ getInstance }) => {
  const artRef = useArtplayer(getInstance);
  const { watchInfo } = useWatchContext();
  const { watchSetting, setWatchSetting } = useWatchSettingContext();

  return (
    <>
      <div className='z-30'>
        {watchInfo?.loading ? (
          <LoadingVideo />
        ) : (
          <div ref={artRef} className="aspect-video"></div>
        )}
      </div>

      <AnimatePresence>
        {watchSetting?.light ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed top-0 left-0 w-full h-full z-20 bg-[#000000e5]'
            onClick={() => setWatchSetting(prev => ({ ...prev, light: false }))}
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default VideoPlayerContainer;
