import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default function Header() {
  const [link, setLink] = useState();
  const clickHandler = (e) => {
    switch (e.target.innerText) {
      case '熱映中':
        setLink((link) => {
          return (link = '熱映中');
        });
        break;
      case '最熱門':
        setLink((link) => {
          return (link = '最熱門');
        });
        break;
      case '即將上映':
        setLink((link) => {
          return (link = '即將上映');
        });
        break;

      default:
        break;
    }
  };
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/movies-web">
          {/* <div className="header_logo">Movie Bar</div> */}
          <img
            className="header_icon"
            src="https://seeklogo.com/images/I/imdb-internet-movie-database-logo-025D34570E-seeklogo.com.png"
            alt="header_icon"
          />
        </Link>
        <Link to="/movies/popular">
          <span onClick={clickHandler} className={`type_link ${link === '熱映中' ? 'active' : ''}`}>
            熱映中
          </span>
        </Link>
        <Link to="/movies/top_rated">
          <span onClick={clickHandler} className={`type_link ${link === '最熱門' ? 'active' : ''}`}>
            最熱門
          </span>
        </Link>
        <Link to="/movies/upcoming">
          <span onClick={clickHandler} className={`type_link ${link === '即將上映' ? 'active' : ''}`}>
            即將上映
          </span>
        </Link>
      </div>
    </div>
  );
}
