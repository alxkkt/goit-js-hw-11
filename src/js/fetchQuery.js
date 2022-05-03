import axios from 'axios';

const ENTRY_POINT = 'https://pixabay.com/api';
const API_KEY = '27140133-cf6dd0795ec4c8135d19f929c';
const SEARCH_PARAM = 'image_type=photo&orientation=horizontal&safesearch=true';
const config = {
  transformResponse: response => {
    const cleanData = JSON.parse(response);

    const { hits } = cleanData;

    return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return { webformatURL, largeImageURL, tags, likes, views, comments, downloads };
    });
  },
};

export class PicsApiSet {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  async fetchQuery() {
    const { data, status } = await axios.get(
      `${ENTRY_POINT}/?key=${API_KEY}&q=${this.searchQuery}&${SEARCH_PARAM}&per_page=5&page=${this.page}`,
      config,
    );
    if (status === 200) {
      this.incrementPage();

      return data;
    } else {
      throw new Error(status);
    }
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
