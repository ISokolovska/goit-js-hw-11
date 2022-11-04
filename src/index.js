import './css/styles.css';
import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { queryImage } from './api/fetch';

const searchForm = document.querySelector('.search-form');
const galleryImage = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

let query = '';
let page = 1;

const handleForm = async e => {
  e.preventDefault();
  let perPage = 40;
  query = e.target.searchQuery.value;
  page = 1;
  galleryImage.innerHTML = '';
  buttonLoadMore.classList.add('is-hidden');
  const response = await queryImage(query);
  if (response.totalHits) {
    if (response.totalHits > perPage) {
      buttonLoadMore.classList.remove('is-hidden');
      // console.log(response);
    }
    renderMarkup(response.hits);
    lightbox.refresh();
    // console.log(response.totalHits);
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
  } else {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

searchForm.addEventListener('submit', handleForm);

const renderMarkup = data => {
  const markup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
                <div class="info">
                <p class="info-item">
                <b>Likes: </b>${likes}
                </p>
                <p class="info-item">
                <b>Views: </b>${views}
                </p>
                <p class="info-item">
                <b>Comments: </b>${comments}
                </p>
                <p class="info-item">
                <b>Downloads: </b>${downloads}
                </p>
                </div>
                </div>
              `;
      }
    )
    .join('');
  galleryImage.innerHTML += markup;
};

buttonLoadMore.addEventListener('click', async () => {
  page += 1;
  buttonLoadMore.classList.add('is-hidden');
  const response = await queryImage(query, page);
  let perPage = 40;
  let totalPages = response.totalHits / perPage;
  if (page > totalPages) {
    Notiflix.Notify.info(
      'We are sorry, but you have reached the end of search results.'
    );
  } else {
    buttonLoadMore.classList.remove('is-hidden');
  }
  renderMarkup(response.hits);
  lightbox.refresh();
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
});

let lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});
