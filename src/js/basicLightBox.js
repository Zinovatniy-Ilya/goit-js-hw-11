import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onGalleryCard(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const image = `<img src=${event.target.dataset.source} alt ="icon" />`;
  const createBigImage = basicLightbox.create(image);

  createBigImage.show();
}

export { onGalleryCard };