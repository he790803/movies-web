import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar } from 'react-icons/ai';

import RWD_Listener from '../../components/rwdListener/RWD_Listener';
import './index.scss';

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  // let timerInterval;
  let timer;

  let device = RWD_Listener();

  // 畫面載入時，呼叫API

  useEffect(() => {
    fetch('  https://api.themoviedb.org/3/movie/popular?api_key=d1dec75e26a24e7a758bd96e5f63d0e4&language=zh-TW&page=1')
      .then((res) => res.json())
      .then((data) =>
        setPopularMovies((list) => {
          return (list = data.results);
        })
      );
  }, []);

  let timerInterval = () => {
    if (carouselIndex > 18) {
      setCarouselIndex((index) => {
        return (index = 0);
      });
    } else {
      setCarouselIndex((index) => {
        return index + 1;
      });
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function setTimer() {
    console.log('setTimer');
    timer = setInterval(timerInterval, 5000);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function cleanTimer() {
    console.log('cleanTimer');
    clearInterval(timer);
  }

  useEffect(() => {
    setTimer();
    // const timer = setInterval(() => {
    //   console.log(carouselIndex);
    //   if (carouselIndex > 18) {
    //     setCarouselIndex((index) => {
    //       return (index = 0);
    //     });
    //   } else {
    //     setCarouselIndex((index) => {
    //       return index + 1;
    //     });
    //   }
    // }, 5000);

    return () => {
      cleanTimer();
    };
  }, [setTimer, cleanTimer]);

  const setHandler = (val) => {
    if (val === 'reduce') {
      if (carouselIndex <= 0) {
        setCarouselIndex((index) => {
          cleanTimer();
          setTimer();
          return (index = 19);
        });
      } else {
        setCarouselIndex((index) => {
          cleanTimer();
          setTimer();
          return (index -= 1);
        });
      }
    } else {
      if (carouselIndex > 18) {
        setCarouselIndex((index) => {
          cleanTimer();
          setTimer();
          return (index = 0);
        });
      } else {
        setCarouselIndex((index) => {
          cleanTimer();
          setTimer();
          return (index += 1);
        });
      }
    }
  };

  // const start = () => {
  //   setTimer();
  //   console.log('start');
  // };
  // const stop = () => {
  //   clearInterval(timerInterval);
  //   console.log('stop');
  // };

  return (
    <div>
      <div className="poster">
        <div className="posterImage">
          <Link
            style={{ color: 'white' }}
            to={`${popularMovies.length > 1 && '/movie/' + popularMovies[carouselIndex].id}`}
          >
            {device === 'large' ? (
              <img
                alt="posterImage"
                src={`https://image.tmdb.org/t/p/original${
                  popularMovies.length > 1 && popularMovies[carouselIndex].backdrop_path
                }`}
              ></img>
            ) : (
              <img
                alt="posterImage"
                src={`https://image.tmdb.org/t/p/original${
                  popularMovies.length > 1 && popularMovies[carouselIndex].poster_path
                }`}
              ></img>
            )}
          </Link>
          <AiFillCaretLeft className="carousel-button prev" onClick={() => setHandler('reduce')}>
            前一張
          </AiFillCaretLeft>
          <AiFillCaretRight className="carousel-button next" onClick={() => setHandler('add')}>
            下一張
          </AiFillCaretRight>
        </div>

        <div className="posterImage_overlay" onMouseEnter={cleanTimer} onMouseLeave={setTimer}>
          <div className="posterImage_title">{popularMovies.length > 1 ? popularMovies[carouselIndex].title : ''}</div>
          <div className="posterImage_runtime">
            {popularMovies.length > 1 ? popularMovies[carouselIndex].release_date : ''}
            <span className="posterImage_rating">
              <span>{popularMovies.length > 1 ? popularMovies[carouselIndex].vote_average : ''}</span>
              <AiFillStar />
            </span>
          </div>
          <div className="posterImage_description">
            <p className="description">{popularMovies.length > 1 ? popularMovies[carouselIndex].overview : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// {popularMovies.map((movie, index) => {
//   return (
//     <div className="posterImage" key={movie.id}>
//       <img alt="posterImage" src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`}></img>
//     </div>
//   );
// })}
