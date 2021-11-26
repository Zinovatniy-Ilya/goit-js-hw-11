import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { onGalleryCard } from './js/basicLightBox';
import './style.css';
import NewsApiService from './js/apiService';
import ImageTpl from './templates/images';
import LoadMoreBtn from './js/loadBtn';

const refs = {
  input: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.button'),
  body: document.querySelector('body'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const newsApiService = new NewsApiService();

refs.input.addEventListener('submit', onSearch);
refs.button.addEventListener('click', fetchImage);
refs.gallery.addEventListener('click', onGalleryCard);

function onSearch(event) {
  event.preventDefault();
  newsApiService.query = event.currentTarget.elements.query.value;
  if (newsApiService.query === '') {
    loadMoreBtn.disable();
    return onBlancInput();
  }
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearImageGallery();
  fetchImage();
}

function fetchImage() {
  loadMoreBtn.disable();
  newsApiService.fetchImage().then(hits => {
    appendImageMarkup(hits);
    loadMoreBtn.enable();
  });
  scrollPage();
}

function appendImageMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', ImageTpl(hits));
}

function clearImageGallery() {
  refs.gallery.innerHTML = '';
}

function scrollPage() {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  }, 500);
}

function onBlancInput() {
  error({
    text: 'No matches found. Enter anything',
    delay: 2000,
  });
}
