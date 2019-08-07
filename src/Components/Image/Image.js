import React from 'react';
import { getImageUrl } from '../../Utils/Utils';
import './Image.scss';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleImageClick(event) {
    event.preventDefault();
    this.props.onImageClick(this.props.image);
  }

  render() {
    return (
      <div className="image-item">
        <img className="image" src={getImageUrl(this.props.image)} onClick={this.handleImageClick} alt="" />
      </div>
    );
  }
}

export default Image;