import React, { Component } from 'react';
import Button from './button';
import AudioInfo from "./audio_info";
import Images from "../util/images";


export default class AudioPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      artistName: '',
      currentTrackIdx: 0,
      error: null,
      isLoaded: false,
      isPlaying: false,
      tracks: []
    };
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    fetch("https://s3-us-west-1.amazonaws.com/fbx-fed-homework/fed_home_assignment_api.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            artistName: result.artist,
            tracks: result.tracks
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  
  handleAudioStateChange(command) {
    const audioEl = this.audioRef.current;
    let newTrackIdx;
    switch (command) {
      case 'prev':
        newTrackIdx = this.state.currentTrackIdx > 0 ? this.state.currentTrackIdx - 1 : this.state.tracks.length - 1;
        this.setState({
          currentTrackIdx: newTrackIdx,
          isPlaying: true
        });
        break;
      case 'play':
        this.setState({
          isPlaying: true
        });
        audioEl.play();
        break;
      case 'pause':
        audioEl.pause();
        this.setState({
          isPlaying: false
        });
        break;
      case 'forward':
        newTrackIdx = this.state.currentTrackIdx < this.state.tracks.length - 1 ? this.state.currentTrackIdx + 1 : 0;
        this.setState({
          currentTrackIdx: newTrackIdx,
          isPlaying: true
        });
        break;
    }
  }

  render() {

    const {error, isLoaded, isPlaying, currentTrackIdx, tracks, artistName} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="audioPlayer__container">
          <img className="coverArt" src={tracks[currentTrackIdx].cover_image} />
          <audio src={tracks[currentTrackIdx].url} ref={this.audioRef} autoPlay></audio>
          
          <div className="audioPlayer__controls">
            <div className="audioPlayer__buttons">
              <Button handleAudioStateChange={this.handleAudioStateChange.bind(this,'prev')}
                      idleImage={Images.backIdle}
                      hoverImage={Images.backHover}/>
              <Button handleAudioStateChange={isPlaying ? this.handleAudioStateChange.bind(this,'pause') : this.handleAudioStateChange.bind(this,'play')}
                      idleImage={isPlaying ? Images.pauseIdle : Images.playIdle}
                      hoverImage={isPlaying ? Images.pauseHover : Images.playHover}/>
              <Button handleAudioStateChange={this.handleAudioStateChange.bind(this,'forward')}
                      idleImage={Images.forwardIdle}
                      hoverImage={Images.forwardHover}/>
            </div>
            
            <AudioInfo artistName={artistName} trackName={tracks[currentTrackIdx].name}/>
          </div>
        </div>
      );
    }
  }
}