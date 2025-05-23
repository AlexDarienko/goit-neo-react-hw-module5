import React, { useEffect, useState, useRef } from 'react';
import {
  useParams,
  Link,
  Outlet,
  useLocation
} from 'react-router-dom';
import { tmdb, IMAGE_BASE } from '../../api/tmdb';
import css from './MovieDetailsPage.module.css';
import noPoster from '../../assets/no-poster.jpg';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    tmdb
      .get(`/movie/${movieId}`)
      .then(res => setMovie(res.data))
      .catch(err => setError(err.message));
  }, [movieId]);

  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>Loading details…</p>;

  return (
    <div className={css.container}>
      <Link to={backLink.current} className={css.back}>
        ← Go back
      </Link>

      <div className={css.details}>
        <img
          src={
            movie.poster_path
              ? IMAGE_BASE + movie.poster_path
              : noPoster
          }
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.info}>
          <h2>{movie.title}</h2>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <nav className={css.subNav}>
       <ul className={css.subNavList}>
         <li className={css.subNavItem}>
           <Link to="cast" state={{ from: backLink.current }} className={css.subNavLink}>
             Cast
           </Link>
         </li>
         <li className={css.subNavItem}>
           <Link to="reviews" state={{ from: backLink.current }} className={css.subNavLink}>
             Reviews
           </Link>
         </li>
       </ul>
     </nav>

      <Outlet />
    </div>
  );
}