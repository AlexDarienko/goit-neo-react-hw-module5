import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.item}>
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
