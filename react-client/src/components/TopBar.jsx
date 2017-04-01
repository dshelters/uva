import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


const TopBar = (props) => (

  <div>
    <Link to='/'>
      <div className='flexContainer'>
        <button onClick={props.handleUserWantsHome} className='flexItem flexEdge' value='login'>Home</button>
     </div>  
    </Link>
  </div>
)

export default TopBar;