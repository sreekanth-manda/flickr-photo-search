import React from 'react';

const Link = ({ hrefText, linkText }) => (
  <a className="link" href={hrefText} target="_blank" rel="noopener noreferrer">{linkText}</a>
);

export default Link;
