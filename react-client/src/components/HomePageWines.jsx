import React from 'react';
import WineList from './WineList.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

const HomePageWines = ({wineRoutes, handleClickedProductEntry, postLike}) => (
  <div className='topItemsWrapper'>
    {wineRoutes.map((route, index) => (
      <div key={index}>
        <WineList
          handleClickedProductEntry={handleClickedProductEntry}
          wines={route.wines}
          postLike={postLike}
        />
      </div>
    ))}
  </div>
)

export default HomePageWines;
