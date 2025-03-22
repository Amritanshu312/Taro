import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import artplayerPluginChapter from "artplayer-plugin-chapter";

export const ArtplayerPlugins = (watchInfo) => {
  return [
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
              ? {
                start: watchInfo.watchData.intro.start,
                end: watchInfo.watchData.intro.end,
                title: "opening",
              }
              : null,

            watchInfo?.watchData?.outro?.start != null &&
              watchInfo?.watchData?.outro?.end != null
              ? {
                start: watchInfo.watchData.outro.start,
                end: watchInfo.watchData.outro.end,
                title: "ending",
              }
              : null,
          ].filter(Boolean),
        }),
      ]
      : []),
  ];
};
