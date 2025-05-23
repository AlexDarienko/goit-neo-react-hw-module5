import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdb, IMAGE_BASE } from '../../api/tmdb';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    tmdb
      .get(`/movie/${movieId}/credits`)
      .then(res => setCast(res.data.cast))
      .catch(err => setError(err.message));
  }, [movieId]);

  if (error) return <p className={css.error}>Error loading cast: {error}</p>;
  if (cast.length === 0) return <p>No cast information.</p>;

  return (
    <ul className={css.castList}>
      {cast.map(actor => (
        <li key={actor.cast_id} className={css.castItem}>
          <img
            src={
              actor.profile_path
                ? IMAGE_BASE + actor.profile_path
                : '/no-poster.jpg'
            }
            alt={actor.name}
            className={css.actorImage}
          />
          <div>
            <p><strong>{actor.name}</strong></p>
            <p>as {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}