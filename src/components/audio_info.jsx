import React from 'react';

const AudioInfo = ({artistName, trackName}) => {
  return (
    <div className="audioPlayer__info">
      <div className="text -artistName">
        { artistName }
      </div>
      <div className="text -trackName">
        { trackName }
      </div>
    </div>
  );
};

export default AudioInfo;