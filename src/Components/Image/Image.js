import React from 'react';
import shortid from 'shortid';
import getImageUrl from '../../Utils/Utils';
import flickerService from '../../Services/FlickrService';
import Link from '../Link/Link';
import './Image.scss';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.flickrGetPhotoInfo = this.flickrGetPhotoInfo.bind(this);
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

  componentDidMount() {
    this.flickrGetPhotoInfo();
  }

  componentWillUpdate(prevProps) {
    if (prevProps.image.id !== this.props.image.id) {
      this.flickrGetPhotoInfo();
    }
  }

  render() {
    return (
      <div className="image-item">
        <img className="image" src={getImageUrl(this.props.image)} alt="" />
        <div className="image-metadata">
          <span>Owner: {this.state.imageMetaData.owner}</span>
          <span>Date Taken: {this.state.imageMetaData.dateTaken}</span>
          <span>Click <Link hrefText={this.state.imageMetaData.url} linkText={'here'} /> for full Image</span>
          <div>
            <span>Tags:</span>
            {this.state.imageMetaData.tags &&
              this.state.imageMetaData.tags.map((item, key) => {
                return <span className="tag">{item}{','}</span>
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Image;
