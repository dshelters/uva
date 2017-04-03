import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


const NavButtons = (props) => {
  console.log('props in nav buttons', props);
  const currentQuestion = () => {
    const loc = props.location.pathname;
    console.log('loc', loc);
    let num = loc[loc.length - 1];
    num = (num === '/' || num === 'e') ? 0 : (num - 0);
    console.log('num', num);
    return num;
  }

  const loc = currentQuestion();

  // return (
    if (loc === 0) {
      return (
        <div className='questionNav'>

            <Link to={`/questionnaire/${loc + 1 + ''}`}>
              <button>Begin Survey!</button>
            </Link>

        </div>  
      )
    }

    if (loc > 0 && loc < 3) {
      return (
        <div className='questionNav'> 

            <Link to={`/questionnaire/${loc - 1 + ''}`}>
              <button>Previous</button>
            </Link>

            <Link to={`/questionnaire/${loc + 1 + ''}`}>
              <button>Next</button>
            </Link>

        </div>
      )
    }

    if (loc === 3) {
      return (
        <div className='questionNav'>

            <Link to={`/questionnaire/${loc - 1 + ''}`}>
              <button>Previous</button>
            </Link>

        </div>
      )
    }
  
}

export default NavButtons;