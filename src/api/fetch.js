import Notiflix from 'notiflix';
import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30993441-ae129a01ad12f9b97eb01d4cf';

export const queryImage = async query => {
  const config = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };
  try {
    const response = await axios.get(`${BASE_URL}`, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
