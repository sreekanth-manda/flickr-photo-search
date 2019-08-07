import React from "react";
import shortid from 'shortid';
import Image from '../Image/Image';
import './ImageList.scss';

const ImageList = ({ images, onImageClick, hideFullImage }) => (
  <div className="image-list">
    {images.map((image, idx) => <Image key={shortid.generate()} image={image} onImageClick={onImageClick} />)}
  </div>
);

export default ImageList;
