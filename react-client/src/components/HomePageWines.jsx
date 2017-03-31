import React from 'react';
import WineList from './WineList.jsx';

var HomePageWines = ({topReds, topWhites, topRated, handleClickedProductEntry}) => (
  <div className='topItemsWrapper'>
    <div className='trendingWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topReds}
      />
    </div>
    <div className='bestValueWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topWhites}
      />
    </div>

    <div className='UvasChoiceWineListWrapper'>
      <WineList
        handleClickedProductEntry={handleClickedProductEntry}
        wines={topRated}
      />
    </div>
  </div>
);

export default HomePageWines;
