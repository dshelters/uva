import React from 'react';
import WineList from './WineList.jsx';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Nav = (props) => (
  <div>
    {props.wineRoutes.map((route, index) => (
      <Link to={route.path} key={index}>
        <div className='nav'>
            <h2>{route.title}</h2>
        </div>
      </Link>
    ))}
  </div>
)

export default Nav;