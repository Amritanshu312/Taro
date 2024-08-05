"use client"
import Hls from 'hls.js';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import { useEffect, useRef } from "react";
import Artplayer from 'artplayer';
import { useWatchContext } from '@/context/Watch';
import LoadingVideo from '@/components/loadings/loadingVideo/loadingVideo';
import '@/components/loadings/loadingVideo/loadingVideos.module.css'
import { AnimatePresence, motion } from 'framer-motion';
import { useWatchSettingContext } from '@/context/WatchSetting';

const VideoPlayer = ({ getInstance }) => {
  const { setEpisode, watchInfo } = useWatchContext();
  const { setWatchSetting, watchSetting } = useWatchSettingContext()


  const artRef = useRef();

  useEffect(() => {
    const M3U8Url = watchInfo?.streamingData?.sources?.find(source => source?.quality === 'default')?.url
    if (!M3U8Url || !M3U8Url === undefined || watchInfo?.loading) return
    const art = new Artplayer({
      url: M3U8Url,
      setting: true,
      theme: '#7569c8',
      autoplay: watchSetting?.autoPlay,
      playbackRate: true,
      pip: true,
      // poster: watchInfo?.thumbnail,
      fullscreen: true,
      container: artRef.current,
      plugins: [
        artplayerPluginHlsQuality({
          // Show quality in control
          control: true,
          setting: true,
          getResolution: (level) => level.height + 'P',
          // I18n
          title: 'Quality',
          auto: 'Auto',
        }),
      ],
      customType: {
        m3u8: function playM3u8(video, url, art) {
          if (Hls.isSupported()) {
            if (art.hls) art.hls.destroy();
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            art.hls = hls;
            art.on('destroy', () => hls.destroy());
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
          } else {
            art.notice.show = 'Unsupported playback format: m3u8';
          }
        }
      },
    });


    art.on('loading', () => {
      const loading = art.template.$loading;
      loading.innerHTML = ''; // Clear the default loading content

      // Create custom loading element
      const customLoading = document.createElement('div');
      customLoading.className = 'i';
      customLoading.innerHTML = '<div></div><div></div>';
      loading.appendChild(customLoading);
    });

    art.on('video:ended', () => {
      watchSetting.autoNext && setEpisode((prev) => prev + 1);
    })

    if (getInstance && typeof getInstance === 'function') {
      getInstance(art);
    }



    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchInfo, watchSetting?.autoNext]);


  return <>
    <div className='z-30'>
      {
        watchInfo?.loading ? <LoadingVideo /> :
          <div ref={artRef} className="aspect-video"></div>
      }
    </div>

    <AnimatePresence>
      {watchSetting?.light ?
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed top-0 left-0 w-full h-full z-20 opacity-0 bg-[#000000e5]'
          onClick={() => setWatchSetting({ ...watchSetting, light: false })}
        ></motion.div>
        : null
      }
    </AnimatePresence>
  </>

}

export default VideoPlayer