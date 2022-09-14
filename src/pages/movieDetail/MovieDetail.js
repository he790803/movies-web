import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

import './index.scss';

export default function MovieDetail() {
  const [currentMovieDetail, setMovieDetail] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=d1dec75e26a24e7a758bd96e5f63d0e4&language=zh-TW&page=1`)
      .then((res) => res.json())
      .then((data) =>
        setMovieDetail((list) => {
          return (list = data);
        })
      );
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          alt="movie__backdrop"
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ''}`}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              alt="movie__poster"
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ''}`}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.title : ''}</div>
            {/* <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ''}</div> */}
            <div className="movie__rating">
              <AiFillStar />
              <span className="movie__voteCount">
                {currentMovieDetail ? '(' + currentMovieDetail.vote_count + ') ' : ''}
              </span>
            </div>
            <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + ' 分鐘' : ''}</div>
            <div className="movie__releaseDate">
              {currentMovieDetail ? '上映日期: ' + currentMovieDetail.release_date : ''}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <div key={genre.id}>
                      <span className="movie__genre" id={genre.id}>
                        {genre.name}
                      </span>
                    </div>
                  ))
                : ''}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">概要</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ''}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">外部連結</div>
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a href={currentMovieDetail.homepage} target="_blank" style={{ textDecoration: 'none' }}>
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <a
            href={'https://www.imdb.com/title/' + currentMovieDetail.imdb_id}
            target="_blank"
            style={{ textDecoration: 'none' }}
          >
            <p>
              <span className="movie__imdbButton movie__Button">
                IMDb<i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
      </div>
      {/* <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail &&
          currentMovieDetail.production_companies &&
          currentMovieDetail.production_companies.map((company) => (
            <div key={company.id}>
              {company.logo_path && (
                <div className="productionCompanyImage">
                  <div className="movie__productionCompany">
                    <img
                      alt="movie__productionCompany"
                      src={'https://image.tmdb.org/t/p/original' + company.logo_path}
                    />
                  </div>
                  <span>{company.name}</span>
                </div>
              )}
            </div>
          ))}
      </div> */}
    </div>
  );
}
