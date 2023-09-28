import React, { useState } from 'react';

const SpotifyAudio = ({ src }) => {
  const [volume, setVolume] = useState(1);

  const iframeRef = React.useRef();

  const handleVolumeChange = (event) => {
    if (iframeRef.current) {
      setVolume(event.target.value);
      iframeRef.current.api.volume(event.target.value);
    }
  };

  return (
    <div>
      <iframe
        ref={iframeRef}
        src={src}
        width="100%"
        height="100%"
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
};

export default SpotifyAudio;