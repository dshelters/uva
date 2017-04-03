import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Questionnaire extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    // this.question = 0;
    // this.updateQuestion = this.updateQuestion.bind(this);
    this.currentQuestion = this.currentQuestion.bind(this);
  } 

  updateQuestion (forwardOrBack) {

    console.log('this.question', this.question)
    if (forwardOrBack < 1 && this.question < 1) {
      return undefined;
    }
    this.question = this.question + forwardOrBack;
  }

  currentQuestion (upOrDown) {
    const loc = this.props.location.pathname;
    console.log('loc', loc);
    let num = loc[loc.length - 1];
    num = (num === '/' || num === 'e') ? 0 : (num - 0);
    num = num + upOrDown;
    console.log('num', num);
    return num > -1 ? num : 0;
  }

  showNavButtons () {
    const loc = this.currentQuestion();

  }

  render () {
    console.log('this.props in questionnaire', this.props)

    const Next = () => (
      <div className='nextButton'>
        <Link to={`/questionnaire/${this.currentQuestion(1) + ''}`}>
          <button >Next question </button>
        </Link>
      </div>
    )

    const Back = () => (
      <div className='backButton'>
        <Link to={`/questionnaire/${this.currentQuestion(-1) + ''}`}>
          <button >Last Question</button>
        </Link>
      </div>
    )

    const RedOrWhite = () => (
      <div>
        <div>
          Please check each wine type that you enjoy drinking. <br/> (Must select at least one)
        </div>
        <div>
          <input type="checkbox" name="wineType" value="red"/>
          <label>Red</label><br/>
          <input type="checkbox" name="wineType" value="white"/>
          <label>White</label>
        </div>
      </div>
    )

    const Varietal = () => (
      <div>
        <div>
          Please check each common varietal that you enjoy drinking. <br/> (Must select at least one)
        </div>
        <div>            
          <input type="checkbox" name="varietal" value="cabernet"/>
          <label>Cabernet</label><br/>
          <input type="checkbox" name="varietal" value="merlot"/>
          <label>Merlot</label><br/>
          <input type="checkbox" name="varietal" value="chardonnay"/>
          <label>Chardonnay</label><br/>
          <input type="checkbox" name="varietal" value="sauvignonBlanc"/>
          <label>Sauvignon Blanc</label><br/>
          <input type="checkbox" name="varietal" value="unsure"/>
          <label>If you're not sure/don't know check here (only check this box if none of the above are checked)!</label>            
        </div>
      </div>
    )

    const Price = () => (
      <div> 
        <div>
          Please check each price you would be comfortable paying for one bottle of wine. <br/> (Must select at least one)
        </div>
        <div>            
          <input type="checkbox" name="price" value="10"/>
          <label>$10</label><br/>
          <input type="checkbox" name="price" value="20"/>
          <label>$20</label><br/>
          <input type="checkbox" name="price" value="30"/>
          <label>$30</label><br/>
          <input type="checkbox" name="price" value="40"/>
          <label>$40</label><br/>
          <input type="checkbox" name="price" value="50"/>
          <label>$50</label><br/>
          <input type="checkbox" name="price" value="60"/>
          <label>$60</label><br/>
          <input type="checkbox" name="price" value="70"/>
          <label>$70</label><br/>
          <input type="checkbox" name="price" value="80"/>
          <label>$80</label><br/>
          <input type="checkbox" name="price" value="90"/>
          <label>$90</label><br/>
          <input type="checkbox" name="price" value="100"/>
          <label>$100</label><br/>                                                                                                            
        </div>
        <div>
            <button>Submit Preferences</button>
          </div>
      </div>
    )

    return (
      <div className='questionnaire'>
        <h2>Help Us Give You Great Recommendations</h2>
        <form action="http://localhost:3000/train" method='POST'>
          <Route exact path='/questionnaire/1' component={RedOrWhite} />
          <Route exact path='/questionnaire/2' component={Varietal} />
          <Route exact path='/questionnaire/3' component={Price} />
          
        </form>
        {this.showNavButtons()}
      </div>
    )
  }

}

export default Questionnaire;
