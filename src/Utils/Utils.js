const getImageUrl = ({ farm, server, id, secret }) => (
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
);

export default getImageUrl;