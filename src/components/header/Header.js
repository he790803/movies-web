import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default function Header() {
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          {/* <div className="header_logo">Movie Bar</div> */}
          <img
            className="header_icon"
            src="https://seeklogo.com/images/I/imdb-internet-movie-database-logo-025D34570E-seeklogo.com.png"
            alt="header_icon"
          />
        </Link>
        <Link to="/movies/popular">
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated">
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming">
          <span>Upcoming</span>
        </Link>
      </div>
    </div>
  );
}
