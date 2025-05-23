import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjVhZTEyMWVlYzA5ZTI3YzEwODBlZmRiYWY3ZTFkZSIsIm5iZiI6MTc0Nzg1MzM3Ny4zMTMsInN1YiI6IjY4MmUyMDQxOWQ1NzJlZmVjNjBiZTU5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Aw5UF8m2cqbXgcpE3T8QqibqZ6PtLtTlDVue-zpEiXA';

export const tmdb = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`
  },
  params: {
    language: 'en-US'
  }
});

export { IMAGE_BASE };

export async function getTrendingMovies() {
  const response = await tmdb.get('/trending/movie/day');
  return response.data.results;
}

export async function searchMovies(query) {
  const response = await tmdb.get('/search/movie', {
    params: { query, include_adult: false, page: 1 }
  });
  return response.data.results;
}

export async function getMovieDetails(id) {
  const response = await tmdb.get(`/movie/${id}`);
  return response.data;
}

export async function getMovieCredits(id) {
  const response = await tmdb.get(`/movie/${id}/credits`);
  return response.data.cast;
}

export async function getMovieReviews(id) {
  const response = await tmdb.get(`/movie/${id}/reviews`);
  return response.data.results;
}
