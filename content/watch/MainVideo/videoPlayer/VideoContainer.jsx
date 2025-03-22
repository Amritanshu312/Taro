import { AnimatePresence, motion } from 'framer-motion';
import LoadingVideo from '@/components/loadings/loadingVideo/loadingVideo';
import useArtplayer from './useArtplayer';
import { useWatchContext } from '@/context/Watch';
import { useWatchSettingContext } from '@/context/WatchSetting';
import "./video_player.css"
import clsx from 'clsx';

const VideoPlayerContainer = ({ getInstance }) => {
  const artRef = useArtplayer(getInstance);
  const { watchInfo } = useWatchContext();
  const { watchSetting, setWatchSetting } = useWatchSettingContext();

  return (
    <>
      <div className='z-30'>
        <motion.div
          className={clsx({
            'min-[1300px]:fixed min-[1300px]:max-w-[1156px] min-[1300px]:w-full min-[1300px]:aspect-video min-[1300px]:top-1/2 min-[1300px]:left-1/2 min-[1300px]:-translate-x-1/2 min-[1300px]:-translate-y-1/2': watchSetting.light
          })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {watchInfo?.loading ? (
            <LoadingVideo />
          ) : (
            <div ref={artRef} className="aspect-video"></div>
          )}
        </motion.div>

        {watchSetting?.light && <div className='aspect-video w-full max-[1300px]:hidden'></div>}
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