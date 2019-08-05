import request from 'superagent';
import { BASE_URL, TIMEOUT } from '../Constants/Constants';

const searchFlickrImages = (searchText) => {
  const method = 'flickr.photos.search';
  const url = `${BASE_URL}&method=${method}&text=${searchText}&per_page=18`;
  return request
    .get(url)
    .timeout(TIMEOUT);
};

const getPhotoInfo = (photoId) => {
  const method = 'flickr.photos.getInfo';
  const url = `${BASE_URL}&method=${method}&photo_id=${photoId}`;
  return request
    .get(url)
    .timeout(TIMEOUT);
}

export default {
  searchFlickrImages,
  getPhotoInfo
};
