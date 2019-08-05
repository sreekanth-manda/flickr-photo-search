export const getImageUrl = ({ farm, server, id, secret }) => (
  `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
);

export const getDocumentHeight = () => {
  const body = document.body;
  const html = document.documentElement;

  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
};

/* Return scrollTop height: The pixels value which is above the visible scrollable area */
export const getScrollTop = () => {
  return window.pageYOffset !== undefined
    ? window.pageYOffset
    : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

/* Check if scroll reached bottom */
export const isScrollAreaAvailable = () => getScrollTop() < getDocumentHeight() - window.innerHeight;
