import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

class Questionnaire extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    const { history } = this.props;
  }
  // back (e) {
  //   e.stopPropagation()
  //   history.goBack()
  // }

  render () {
    // console.log('this.props in Questionnaire', this.props)
    // console.log('history in Questionnaire', history)
    // console.log('location in Questionnaire', location )
    // console.log('location.state in Questionnaire', location.state )
    // // console.log('!!location.state.modal in render', !!location.state.modal )
    // console.log('this.previousLocation !== location in render', this.previousLocation !== location)
    // const { location } = this.props
    // const isModal = !!(
    //   location.state &&
    //   location.state.modal &&
    //   this.previousLocation !== location // not initial render
    // )

    return (
      
        <div>
          <h2>Help Us Give You Great Recommendations</h2>
          <form action="http://localhost:3000/train" method='POST'>
            <div>
              Please check each wine type that you enjoy drinking. <br/> (Must select at least one)
            </div>
            <div>
              <input type="checkbox" name="wineType" value="red"/>
              <label>Red</label><br/>
              <input type="checkbox" name="wineType" value="white"/>
              <label>White</label>
            </div>
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
          </form>
        </div>
    )
  }

}

export default Questionnaire;
