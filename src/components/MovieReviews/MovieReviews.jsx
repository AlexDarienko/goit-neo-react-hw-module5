import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdb } from '../../api/tmdb';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    tmdb
      .get(`/movie/${movieId}/reviews`)
      .then(res => setReviews(res.data.results))
      .catch(err => setError(err.message));
  }, [movieId]);

  if (error) return <p className={css.error}>Error loading reviews: {error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul className={css.list}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.item}>
          <h4 className={css.author}>By {author}</h4>
          <p className={css.content}>{content}</p>
        </li>
      ))}
    </ul>
  );
}