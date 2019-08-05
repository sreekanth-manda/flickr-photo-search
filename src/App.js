import React from 'react';
import ImageList from './Components/ImageList/ImageList';
import SearchField from './Components/SearchField/SearchField';
import flickrServices from './Services/FlickrService';
import { isScrollAreaAvailable } from './Utils/Utils';
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      imageList: [],
      pageNumber: 1
    };

    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll() {
    const page = this.state.pageNumber + 1;

    if (!isScrollAreaAvailable()) {
      flickrServices.searchFlickrImages(this.state.searchText, page)
        .then(jsonResp => {
          jsonResp.body.photos.photo.forEach(photo => this.state.imageList.push(photo));
          this.setState({
            pageNumber: jsonResp.body.photos.page,
            imageList: this.state.imageList
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

onSearchInputChange(evt) {
  const searchText = evt.target.value;
  this.setState({ searchText });

  flickrServices.searchFlickrImages(this.state.searchText)
    .then(jsonResp => {
      this.setState({ imageList: jsonResp.body.photos.photo });
    })
    .catch(err => {
      console.log(err);
    });
}

render() {
  return (
    <div className="app">
      <div className="app-header">
        <span className="app-title">Flickr Photo Search</span>
        <SearchField searchText={this.state.searchText} onSearchInputChange={this.onSearchInputChange} />
      </div>
      <div className="app-content" ref="appContent">
        {this.state.imageList.length
          ? <ImageList images={this.state.imageList} />
          : <span className="prompt-search">Try searching for some image in the search bar</span>}
      </div>
    </div>
  );
}
}
