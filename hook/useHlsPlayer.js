"use client"
import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';



export const useHlsPlayer = (proxyUrl) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    let hls = null;

    const handleLoading = () => {
      setIsLoading(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };

    const handleLoadingComplete = () => {
      setIsLoading(false);
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    const initializeHls = () => {
      // Reset loading state
      setIsLoading(true);

      if (Hls.isSupported()) {
        // Create HLS instance
        hls = new Hls({ debug: true });

        // Attach event handlers
        attachHlsEventHandlers(hls, handleLoading, handleLoadingComplete);

        // Load video source
        hls.loadSource(proxyUrl);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support for Safari
        initializeNativeHls(handleLoading, handleLoadingComplete);
      } else {
        console.error('HLS is not supported in this browser');
        setIsLoading(false);
      }
    };

    const attachHlsEventHandlers = (hlsInstance, onLoading, onLoadingComplete) => {
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, onLoading);
      hlsInstance.on(Hls.Events.MEDIA_ATTACHED, onLoading);
      hlsInstance.on(Hls.Events.BUFFER_CREATED, onLoading);

      hlsInstance.on(Hls.Events.BUFFER_APPENDED, onLoadingComplete);
      hlsInstance.on(Hls.Events.FRAG_LOADED, onLoadingComplete);

      // Error handling
      hlsInstance.on(Hls.Events.ERROR, (event, data) => handleHlsErrors(hlsInstance, data));

      // Buffering events
      hlsInstance.on(Hls.Events.FRAG_BUFFERED, () => setIsBuffering(false));
    };

    const initializeNativeHls = (onLoading, onLoadingComplete) => {
      const videoElement = videoRef.current;
      videoElement.src = proxyUrl;

      // Native video events
      videoElement.addEventListener('waiting', onLoading);
      videoElement.addEventListener('canplay', onLoadingComplete);
      videoElement.addEventListener('seeking', onLoading);
      videoElement.addEventListener('seeked', onLoadingComplete);
    };

    const handleHlsErrors = (hlsInstance, data) => {
      console.error('HLS.js Error:', data);

      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            hlsInstance.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            hlsInstance.recoverMediaError();
            break;
          default:
            setIsLoading(false);
        }
      } else {
        if (data.details === Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
          setIsBuffering(true);
        }
      }
    };

    // Initialize HLS
    initializeHls();

    // Cleanup
    return () => {
      if (hls) {
        hls.destroy();
      }

      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.removeEventListener('waiting', handleLoading);
        videoElement.removeEventListener('canplay', handleLoadingComplete);
        videoElement.removeEventListener('seeking', handleLoading);
        videoElement.removeEventListener('seeked', handleLoadingComplete);
      }
    };
  }, [proxyUrl]);

  return { videoRef, isLoading, isBuffering };
};