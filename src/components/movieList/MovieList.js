import React, { useEffect, useState } from 'react';
import Cards from '../card/Card';
import { useParams } from 'react-router-dom';

import './index.scss';
import Pagination from '../pagination/Pagination';

export default function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  // const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(1);

  const { type } = useParams();

  // const pages = [...Array(totalPages).keys()]
  //   .map((index) => {
  //     return index + 1;
  //   })
  //   .map((page) => ({
  //     type: 'page',
  //     isCurrent: current === page,
  //     page,
  //     onClick: () =>
  //       setCurrent((current) => {
  //         return (current = page);
  //       }),
  //   }));

  // const markedItems = pages.map((item) => {
  //   const { page } = item;
  //   if (page === totalPages || page === 1 || page === current || page === current + 1 || page === current - 1) {
  //     return page;
  //   }
  //   return {
  //     ...item,
  //     type: item.page > current ? 'end-ellipsis' : 'start-ellipsis',
  //   };
  // });
  // const ellipsisItems = markedItems.filter((item, index) => {
  //   if (item.type === 'start-ellipsis' && markedItems[index + 1].type === 'start-ellipsis') {
  //     return false;
  //   }
  //   if (item.type === 'end-ellipsis' && markedItems[index + 1].type === 'end-ellipsis') {
  //     return false;
  //   }
  //   return true;
  // });

  // const selectPageHandler = (num) => {
  //   setPage((page) => {
  //     console.log(num);
  //     return (page = num);
  //   });
  // };

  const selectPageHandler = (num) => {
    setCurrent((current) => {
      return (current = num);
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : 'popular'
      }?api_key=d1dec75e26a24e7a758bd96e5f63d0e4&language=zh-TW&page=${current}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTotalPages((pages) => {
          return (pages = data.total_pages > 300 ? 300 : data.total_pages);
          // return (pages = 101);
        });
        setMovieList((list) => {
          return (list = data.results);
        });
      });
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, current]);

  return (
    <div className="movie_list">
      <h2 className="list_title">{(type ? type : 'POPULAR').toUpperCase()}</h2>
      <div className="list_cards">
        {movieList.map((movie) => (
          <Cards movie={movie} key={movie.id} />
        ))}
      </div>
      {/* <div className="page">
        {pages.map((p) => {
          return (
            <span key={p.page} onClick={p.onClick}>
              {p.page}
            </span>
          );
        })}
      </div> */}
      <Pagination totalPages={totalPages} selectPage={selectPageHandler} />
    </div>
  );
}
