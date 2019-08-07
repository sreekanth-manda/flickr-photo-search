import request from 'superagent';
import { BASE_URL, TIMEOUT } from '../Constants/Constants';

const searchFlickrImages = (searchText, page) => {
  const method = 'flickr.photos.search';
  const url = page
    ? `${BASE_URL}&method=${method}&text=${searchText}&per_page=50&page=${page}`
    : `${BASE_URL}&method=${method}&text=${searchText}&per_page=50`;

  return request
    .get(url)
    .timeout(TIMEOUT);
};

const getPhoto = (url) => {
  return request
    .get(url)
    .timeout(TIMEOUT);
}

const getPhotoInfo = (photoId) => {
  const method = 'flickr.photos.getInfo';
  const url = `${BASE_URL}&method=${method}&photo_id=${photoId}`;
  return request
    .get(url)
    .timeout(TIMEOUT);
}

export default {
  searchFlickrImages,
  getPhoto,
  getPhotoInfo
};
