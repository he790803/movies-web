import React, { useEffect, useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

import RWD_Listener from '../rwdListener/RWD_Listener';

import './index.scss';

export default function Pagination(props) {
  const [current, setCurrent] = useState(1);
  const { totalPages, selectPage } = props;

  let device = RWD_Listener();
  let items;

  const pages = [...Array(totalPages).keys()]
    .map((index) => {
      return index + 1;
    })
    .map((page) => ({
      type: 'page',
      isCurrent: current === page,
      page,
      onClick: () => {
        setCurrent((current) => {
          return (current = page);
        });
      },
    }));

  const handleClickNext = () => {
    const nextCurrent = current + 1 > totalPages ? totalPages : current + 1;
    setCurrent(nextCurrent);
  };

  const handleClickPrev = () => {
    const prevCurrent = current - 1 < 1 ? 1 : current - 1;
    setCurrent(prevCurrent);
  };

  useEffect(() => {
    selectPage(current);
  }, [selectPage, current]);

  const markedItems = pages.map((item) => {
    const { page } = item;
    if (page === totalPages || page === 1 || page === current || page === current + 1 || page === current - 1) {
      return item;
    }
    return {
      ...item,
      type: item.page > current ? 'end-ellipsis' : 'start-ellipsis',
    };
  });

  const mobileItems = pages.filter((item) => {
    const { page } = item;
    return page === totalPages || page === 1 || page === current;
  });

  const ellipsisItems = markedItems.filter((item, index) => {
    if (item.type === 'start-ellipsis' && markedItems[index + 1].type === 'start-ellipsis') {
      return false;
    }
    if (item.type === 'end-ellipsis' && markedItems[index + 1].type === 'end-ellipsis') {
      return false;
    }
    return true;
  });

  items = device === 'small' ? mobileItems : ellipsisItems;
  return (
    <div className="pagination">
      <ul>
        <li className="btn prev" onClick={handleClickPrev}>
          <span>
            <div>
              <AiFillCaretLeft />
            </div>
            <p>上一頁</p>
          </span>
        </li>
        {items.map((item) => {
          if (item.type === 'page') {
            return (
              <li className={`num ${item.isCurrent ? 'active' : ''}`} key={item.page} onClick={item.onClick}>
                <span>{item.page}</span>
              </li>
            );
          }
          return (
            <li className="dots" key={item.page}>
              ...
            </li>
          );
        })}

        {/* <li className="num active">
          <span>1</span>
        </li>
        <li className="num">
          <span>2</span>
        </li>
        <li className="dots">
          <span>...</span>
        </li>
        <li className="num">
          <span>4</span>
        </li>
        <li className="num">
          <span>5</span>
        </li>
        <li className="num">
          <span>6</span>
        </li>
        <li className="dots">
          <span>...</span>
        </li>
        <li className="num">
          <span>8</span>
        </li> */}
        <li className="btn next" onClick={handleClickNext}>
          <span>
            <p>下一頁</p>
            <div>
              <AiFillCaretRight />
            </div>
          </span>
        </li>
      </ul>
    </div>
  );
}
