import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AiFillStar } from 'react-icons/ai';

import './index.scss';

export default function Card({ movie }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.id}`} style={{ color: '#fff' }}>
          <div className="cards">
            <img
              alt="cards_img"
              className="cards_img"
              src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ''}`}
            ></img>
            <div className="cards_overlay">
              <div className="card_title">{movie ? movie.title : ''}</div>
              <div className="card_runtime">
                {movie ? movie.release_date : ''}
                <span className="card_rating">
                  {movie ? movie.vote_average : ''}
                  <AiFillStar />
                </span>
              </div>
              <div className="card_description">{movie ? movie.overview.slice(0, 50) + '...' : ''}</div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
