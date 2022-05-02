import axios from 'axios';

const ENTRY_POINT = 'https://pixabay.com/api';
const API_KEY = '27140133-cf6dd0795ec4c8135d19f929c';
const SEARCH_PARAM = 'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
const config = {
  transformResponse: response => {
    const cleanData = JSON.parse(response);

    const { hits } = cleanData;

    return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return { webformatURL, largeImageURL, tags, likes, views, comments, downloads };
    });
  },
};

export async function fetchQuery(query) {
  const { data, status } = await axios.get(
    `${ENTRY_POINT}/?key=${API_KEY}&q=${query}&${SEARCH_PARAM}`,
    config,
  );
  if (status === 200) {
    return data;
  } else {
    throw new Error(status);
  }
}
