import React from 'react';
import shortid from 'shortid';
import { getImageUrl } from '../../Utils/Utils';
import flickerService from '../../Services/FlickrService';
import Link from '../Link/Link';
import './FullImage.scss';

class FullImage extends React.Component {
  constructor(props) {
    super(props);
    this.flickrGetPhotoInfo = this.flickrGetPhotoInfo.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {
      imageMetaData: {}
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

  handleKeyPress(event) {
    console.log({ event })
    console.log('this is called');
    this.props.hideFullImage();
  }

  componentDidMount() {
    this.flickrGetPhotoInfo();
  }

  render() {
    return (
      <div className="overlay">
        <button class="close" onClick={this.handleKeyPress} onKeyUp={this.handleKeyPress} onKeyDown={this.handleKeyPress} />
        <div className="full-image">
          <div >
            <img src={getImageUrl(this.props.image)} alt="" />
          </div>
          <div className="image-metadata">
            <span>Owner: {this.state.imageMetaData.owner}</span>
            <span>Date Taken: {this.state.imageMetaData.dateTaken}</span>
            <div>
              <span>Tags:</span>
              {this.state.imageMetaData.tags &&
                this.state.imageMetaData.tags.map((item, key) => {
                  return <span className="tag" key={shortid.generate()}>{item}{','}</span>
                })}
            </div>
         </div>
        </div>
      </div>
    );
  }
}

export default FullImage;
