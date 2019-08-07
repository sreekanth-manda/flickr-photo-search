import React from 'react';
import { throttle } from 'throttle-debounce';
import ImageList from './Components/ImageList/ImageList';
import SearchField from './Components/SearchField/SearchField';
import FullImage from './Components/FullImage/FullImage';
import flickrServices from './Services/FlickrService';
import { isScrollAreaAvailable, getImageUrl } from './Utils/Utils';
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      imageList: [],
      pageNumber: 1,
      error: false,
      loading: false,
      showFullImage: false,
      currentImage: {}
    };

    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.onImageClick = this.onImageClick.bind(this);
    this.hideFullImage = this.hideFullImage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', throttle(800, this.handleScroll));
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll() {
    const promises = [];
    const images = [];

    if (!isScrollAreaAvailable()) {
      this.setState({ loading: true });

      flickrServices.searchFlickrImages(this.state.searchText, this.state.pageNumber + 1)
        .then(jsonResp => {
          jsonResp.body.photos.photo.forEach(photo => {
            promises.push(
              flickrServices.getPhoto(getImageUrl(photo))
                .then(() => images.push(photo))
                .catch((error) => console.log(error))
            );
          });

          Promise.all(promises).then(() => {
            this.setState((state, props) => ({
              pageNumber: jsonResp.body.photos.page,
              imageList: state.imageList.concat(images),
              error: false,
              loading: false
            }))
          });
        })
        .catch(err => this.setState({ error: true, loading: false }));
    }
  }

  onSearchInputChange(evt) {
    const searchText = evt.target.value;
    this.setState({ searchText, loading: true });

    flickrServices.searchFlickrImages(this.state.searchText)
      .then(jsonResp =>
        this.setState({
          imageList: jsonResp.body.photos.photo,
          error: false,
          loading: false
        }))
      .catch(err => this.setState({ error: true, loading: false }));
  }

  hideFullImage() {
    this.setState({ showFullImage: false });
  }

  onImageClick(imageData) {
    this.setState({ showFullImage: true, currentImage: imageData });
  }

  render() {
    return (
      <div className="app">
        <div className="app-header">
          <span className="app-title">Flickr Photo Search</span>
          <SearchField searchText={this.state.searchText} onSearchInputChange={this.onSearchInputChange} />
        </div>
        <div className="app-content" ref="appContent">
          {this.state.imageList.length !== 0 &&
            <ImageList
              images={this.state.imageList}
              onImageClick={this.onImageClick}
            />
          }
          {this.state.loading && <div className='app-loader' />}
        </div>
        {this.state.showFullImage && <FullImage hideFullImage={this.hideFullImage} image={this.state.currentImage} />}
      </div>
    );
  }
}
