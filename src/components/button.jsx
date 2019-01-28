import React, {Component} from 'react';

export default class Button extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
  }

  hoverOn() {
    this.setState({
      isHovering: true
    });
  }

  hoverOff() {
    this.setState({
      isHovering: false
    });
  }

  render() {
    const {isHovering} = this.state;
    const {idleImage, hoverImage, handleAudioStateChange} = this.props;

    return (
      <div className="btn" onClick={handleAudioStateChange}
           onMouseEnter={this.hoverOn.bind(this)}
           onMouseLeave={this.hoverOff.bind(this)}>
        <img src={isHovering ? hoverImage : idleImage} alt="button"/>
      </div>
    )
  }
}