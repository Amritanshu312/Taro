import { useEffect, useRef } from "react";
import Hls from "hls.js";
import Artplayer from "artplayer";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import { useWatchContext } from "@/context/Watch";
import { useWatchSettingContext } from "@/context/WatchSetting";
import { SaveProgress } from "@/utils/saveProgress";
import artplayerPluginChapter from "artplayer-plugin-chapter";

const useArtplayer = (getInstance) => {
  const { setEpisode, watchInfo, episode, animeid, AnimeInfo } = useWatchContext();
  const { watchSetting } = useWatchSettingContext();
  const artRef = useRef(null);
  const artInstance = useRef(null);

  useEffect(() => {
    if (!watchInfo?.watchData?.sources?.length || watchInfo.loading) return;

    const M3U8Url = watchInfo.watchData.sources[0]?.url;
    if (!M3U8Url) return;

    const proxyUrl = `https://m3-u8-proxy-iota.vercel.app/m3u8-proxy?url=${M3U8Url}&headers=%7B%22referer%22%3A%22https%3A%2F%2F9anime.pl%22%7D`;
    // const proxyUrl = `/api/video/m3u8-proxy?url=${M3U8Url}&headers=%7B%22referer%22%3A%22https%3A%2F%2F9anime.pl%22%7D`;


    if (artInstance.current) {
      artInstance.current.destroy(false);
      artInstance.current = null;
    }

    try {
      const art = new Artplayer({
        container: artRef.current,
        url: proxyUrl,
        type: "m3u8",
        autoplay: watchSetting?.autoPlay,
        setting: true,
        theme: "#7569c8",
        playbackRate: true,
        aspectRatio: true,
        backdrop: true,
        screenshot: true,
        hotkey: true,
        miniProgressBar: true,
        fullscreenWeb: true,
        autoPlayback: true,
        miniProgressBar: true,
        pip: true,
        fullscreen: true,

        icons: {
          loading: `<img style="height: 54px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" src="https://i.pinimg.com/originals/ab/be/28/abbe28a943ed44fcd98452687f7c46c9.gif">`,
        },
        contextmenu: [
          {
            html: 'Picture In Picture',
            click: function (contextmenu) {
              console.info('You clicked on the custom menu');
              contextmenu.show = false;
            },
          },
        ],
        plugins: [
          artplayerPluginHlsQuality({
            control: true,
            setting: true,
            getResolution: (level) => `${level.height}P`,
            title: "Quality",
            auto: "Auto",
          }),

          ...(watchInfo?.watchData?.intro?.start !== 0 || watchInfo?.watchData?.outro?.start !== 0
            ? [
              artplayerPluginChapter({
                chapters: [
                  watchInfo?.watchData?.intro?.start != null &&
                    watchInfo?.watchData?.intro?.end != null &&
                    watchInfo.watchData.intro.start !== watchInfo.watchData.intro.end
                    ? { start: watchInfo.watchData.intro.start, end: watchInfo.watchData.intro.end, title: 'opening' }
                    : null,

                  watchInfo?.watchData?.outro?.start != null &&
                    watchInfo?.watchData?.outro?.end != null
                    ? { start: watchInfo.watchData.outro.start, end: watchInfo.watchData.outro.end, title: 'ending' }
                    : null,
                ].filter(Boolean), // Remove null values
              }),
            ]
            : [])

        ],
        customType: {
          m3u8: (video, url, art) => {
            if (Hls.isSupported()) {
              if (art.hls) art.hls.destroy();
              const hls = new Hls();
              hls.loadSource(url);
              hls.attachMedia(video);
              art.hls = hls;
              art.on("destroy", () => hls.destroy());
            } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
              video.src = url;
            } else {
              art.notice.show = "Unsupported playback format: m3u8";
            }
          },
        },
      });

      art.on("video:ended", () => {
        if (watchSetting?.autoNext) {
          setEpisode((prev) => prev + 1);
        }
      });

      const throttledSaveProgress = (() => {
        let lastRun = 0;
        return (data) => {
          const now = Date.now();
          if (now - lastRun >= 8000) {
            SaveProgress(
              animeid,
              episode,
              data?.target?.currentTime,
              watchInfo?.thumbnail,
              data?.target?.duration,
              watchInfo?.title || AnimeInfo?.title?.english || AnimeInfo?.title?.romaji
            );
            lastRun = now;
          }
        };
      })();

      art.on("video:timeupdate", throttledSaveProgress);
      // console.log(e.target.currentTime)
      art.on("ready", () => {
        const watchHistory = JSON.parse(localStorage.getItem("watch_history"));
        if (watchHistory?.[animeid]?.episode?.toString() === episode?.toString()) {
          const currentTime = parseInt(watchHistory[animeid].currentTime, 10);
          if (!isNaN(currentTime)) {
            art.seek = currentTime;
          }
        }
      });

      artInstance.current = art;

      if (getInstance) getInstance(art);
    } catch (error) {
      console.error("Error initializing Artplayer:", error);
    }

    return () => {
      if (artInstance.current) {
        artInstance.current.destroy(false);
        artInstance.current = null;
      }
    };
  }, [watchInfo, watchSetting?.autoNext, getInstance]);

  return artRef;
};

export default useArtplayer;
