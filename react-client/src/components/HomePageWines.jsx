import React from 'react';
import WineList from './WineList.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

class HomePageWines extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const {wineRoutes, handleClickedProductEntry, postLike} = this.props;
    return (
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
  }
};

export default HomePageWines;
