import Notiflix from 'notiflix';
import axios from 'axios';
import { queryImage } from './api/fetch';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

// const handleForm = e => {
//   e.preventDefault();
//   const query = e.target.searchQuery.value;
//   const data = queryImage(query).then(response => {
//     console.log(response);
//     // return response;
//   });
// };

const handleForm = async e => {
  e.preventDefault();
  const query = e.target.searchQuery.value;
  const response = await queryImage(query);
  console.log(response.hits);
  renderMarkup(response.hits);
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
                <img src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
                <div class="info">
                <p class="info-item">
                <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                <b>Views: ${views}</b>
                </p>
                <p class="info-item">
                <b>Comments: ${comments}</b>
                </p>
                <p class="info-item">
                <b>Downloads: ${downloads}</b>
                </p>
                </div>
                </div>
              `;
      }
    )
    .join('');
  gallery.innerHTML = markup;
};

// let page = 1;
// refs.button.addEventListener('click', () => {
//   page += 1;
//   fetchCharacters(page)
//     .then(data => {
//       if (data.pages === page) {
//         refs.button.disabled = true;
//       }
//       appendMarkup(data.docs);
//     })
//     .catch(error => console.log('error', error));
// });
