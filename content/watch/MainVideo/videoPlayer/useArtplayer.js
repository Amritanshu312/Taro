/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Artplayer from 'artplayer';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import artplayerPluginChapter from 'artplayer-plugin-chapter';
import { useWatchContext } from '@/context/Watch';
import { useWatchSettingContext } from '@/context/WatchSetting';
import { SaveProgress } from '@/utils/saveProgress';


const useArtplayer = (getInstance) => {
  const { setEpisode, watchInfo, episode, animeid, AnimeInfo } = useWatchContext();
  const { setWatchSetting, watchSetting } = useWatchSettingContext();
  const artRef = useRef();


  useEffect(() => {
    const initializeArtPlayer = () => {
      const M3U8Url = watchInfo?.streamingData?.sources?.find(source => source?.quality === 'default')?.url;

      if (!M3U8Url || watchInfo?.loading) return;

      try {
        const art = new Artplayer({
          url: M3U8Url,
          setting: true,
          theme: '#7569c8',
          autoplay: watchSetting?.autoPlay,
          playbackRate: true,
          miniProgressBar: true,
          pip: true,
          fullscreen: true,
          container: artRef.current,
          plugins: [
            artplayerPluginHlsQuality({
              control: true,
              setting: true,
              getResolution: (level) => `${level.height}P`,
              title: 'Quality',
              auto: 'Auto',
            }),

            // artplayerPluginChapter({
            //   chapters: watchInfo?.skipTime?.results?.map(item => ({
            //     start: item?.interval?.startTime,
            //     end: item?.skipType === "ed" ? Infinity : item?.interval?.endTime,
            //     title: item?.skipType === "op" ? "opening" : item?.skipType === "ed" ? "ending" : ""
            //   })) || [],
            // }),

          ],
          customType: {
            m3u8: (video, url, art) => {
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
          loading.innerHTML = '';
          const customLoading = document.createElement('div');
          customLoading.className = 'i';
          customLoading.innerHTML = '<div></div><div></div>';
          loading.appendChild(customLoading);
        });

        art.on('video:ended', () => {
          if (watchSetting.autoNext) {
            setEpisode(prev => prev + 1);
          }
        });


        function throttle(func, limit) {
          let lastFunc, lastRan;
          return function (...args) {
            const context = this;
            if (!lastRan) {
              func.apply(context, args);
              lastRan = Date.now();
            } else {
              clearTimeout(lastFunc);
              lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                  func.apply(context, args);
                  lastRan = Date.now();
                }
              }, Math.max(limit - (Date.now() - lastRan), 0));
            }
          };
        }

        const throttledSaveProgress = throttle((data) => {
          SaveProgress(
            animeid,
            episode,
            data?.target?.currentTime,
            watchInfo?.thumbnail,
            data?.target?.duration,
            watchInfo?.title || AnimeInfo?.title?.english || AnimeInfo?.title?.romaji
          );
        }, 8000);

        art.on('video:timeupdate', throttledSaveProgress);


        art.on('ready', () => {
          const watch_history = JSON.parse(localStorage?.getItem("watch_history"));

          if (
            watch_history &&
            watch_history[animeid] &&
            watch_history[animeid].episode?.toString() === episode?.toString() &&
            watch_history[animeid].currentTime
          ) {
            const currentTime = parseInt(watch_history[animeid].currentTime, 10);
            if (!isNaN(currentTime)) {
              art.seek = currentTime;

              // art.play();
            }
          }
        });





        if (getInstance && typeof getInstance === 'function') {
          getInstance(art);
        }

        return () => {
          if (art && art.destroy) {
            art.destroy(false);
          }
        };
      } catch (error) {
        console.error('Error initializing Artplayer:', error);
      }
    };

    initializeArtPlayer();
  }, [watchInfo, watchSetting?.autoNext, getInstance]);

  return artRef;
};

export default useArtplayer;
