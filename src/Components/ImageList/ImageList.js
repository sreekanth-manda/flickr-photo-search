import React from "react";
import shortid from 'shortid';
import Image from '../Image/Image';
import './ImageList.scss';

const ImageList = ({ images }) => (
  <div className="image-list">
    {images.map((image, idx) => <Image key={shortid.generate()} image={image} idx={idx} />)}
  </div>
);

export default ImageList;
