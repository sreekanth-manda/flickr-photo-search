import React from 'react';
import shortid from 'shortid';
import { getImageUrl } from '../../Utils/Utils';
import flickerService from '../../Services/FlickrService';
import Link from '../Link/Link';
import './Image.scss';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.flickrGetPhotoInfo = this.flickrGetPhotoInfo.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.state = {
      imageData: {}
    };
  }

  flickrGetPhotoInfo() {
    return flickerService.getPhotoInfo(this.props.image.id)
      .then(jsonResp => {
        const data = {};
        data['owner'] = jsonResp.body.photo.owner.realname;
        data['dateTaken'] = jsonResp.body.photo.dates.taken;

        const tags = jsonResp.body.photo.tags.tag.reduce((acc, item) => {
          acc.push(item.raw);
          return acc;
        }, [])

        data['tags'] = tags;
        data['url'] = getImageUrl(this.props.image);

        this.setState({ imageMetaData: data });
      })
      .catch(err => {
        console.log(err);
      })
  }

  // componentDidMount() {
  //   this.flickrGetPhotoInfo();
  // }

  // componentWillUpdate(prevProps) {
  //   if (prevProps.image.id !== this.props.image.id) {
  //     this.flickrGetPhotoInfo();
  //   }
  // }

  handleImageClick(event) {
    event.preventDefault();
    this.props.onImageClick(this.props.image);
  }

  render() {
    return (
      <div className="image-item">
        <img className="image" src={getImageUrl(this.props.image)} onClick={this.handleImageClick} alt="" />
        <div className="image-metadata">
          <span>Click here</span>
        </div>
      </div>
    );
  }
}

export default Image;
