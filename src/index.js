import './sass/main.scss';
import galleryImage from './templates/photoList.hbs';
import ImageServise from './js/apiService';
import LoadMoreBtn from './js/load-more-btn';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loadMoreBtn = new LoadMoreBtn({
   selector: '.btn',
  hidden: true,
});

const refs = {
  container: document.querySelector('.container'),
  btnSearch: document.querySelector('.btn-search'),
  input: document.querySelector('.input'),
};


const imageServise = new ImageServise();

refs.btnSearch.addEventListener('click', onSearch);

loadMoreBtn.refs.btn.addEventListener('click', fetchImages);


function onSearch(e) {
  e.preventDefault();
 
  imageServise.searchValue = refs.input.value;

  loadMoreBtn.show();
  imageServise.resetPage();
  clearMarkup();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disabled();
  imageServise.fetchImages().then(hits => {
    if (hits.length === 0) {
      Notify.failure('Sorry, there are no images matching your search query. Please try again');

      refs.input.value = '';
    } else {
      Notify.success('Horray! We found 500 images');
    }
    appendImagesMurkup(hits);

    loadMoreBtn.enable();
    scroll();
  });

}
  function scroll() {
  window.scrollTo({
    behavior: 'smooth',
    top: document.documentElement.scrollHeight,
  });
  }

function appendImagesMurkup(hits) {
  refs.container.insertAdjacentHTML('beforeend', galleryImage(hits));
}

function clearMarkup() {
  refs.container.innerHTML = '';
}