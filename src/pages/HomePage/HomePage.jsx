import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../../api/tmdb.js';
import MovieList from '../../components/MovieList/MovieList.jsx';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getTrendingMovies().then(setMovies);
  }, []);

  return (
    <div>
      <h1>Trending Today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
