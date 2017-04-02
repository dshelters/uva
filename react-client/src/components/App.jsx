import React from 'react';
import Search from './SearchBar.jsx';
import $ from 'jquery';
import Login from './loginForm.jsx';
import ProductList from './productList.jsx';
import TopBar from './TopBar.jsx';
import ProductOverview from './productOverview.jsx';
import Questionnaire from './Questionnaire.jsx';
import HomePageWines from './HomePageWines.jsx';
import Nav from './Nav.jsx'
import WineList from './WineList.jsx'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';



class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      allWines: {
        reds: {
          path: '/reds',
          title: 'Top Reds',
        },
        whites: {
          path: '/whites',
          title: 'Top Whites',
        },
        uvas: {
          path: '/uvaschoices',
          title: 'Uva\'s Choices',
          choice: 'true',
        },
      },
      products: [],
      // reviews: [],
      topReds: [],
      topWhites: [],
      topRated: [],
      uvasChoice: [],
      searchQuery: '',
      searchHistory: [],
      userHasSearched: false,
      userWantsLogin: false,
      userLoggedIn: false,
      userWantsHomePage: true,
      username: '',
      userID: '',
      invalidPasswordAttempt: false,
      invalidUsername: false,
      userWantsProductList: false,
      userClickedEntry: false,
      currentWine: null,
    }

    this.search = this.search.bind(this);
    this.handleUserWantsHome = this.handleUserWantsHome.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.init = this.init.bind(this);
    this.handleUserWantsProductList = this.handleUserWantsProductList.bind(this);
    this.handleClickedProductEntry = this.handleClickedProductEntry.bind(this);
    // this.mapWinesIntoArray = this.mapWinesIntoArray.bind(this);
    this.postLike = this.postLike.bind(this);
    this.previousLocation = props.location
    console.log('app props con: ', this.props)
  }


  componentWillUpdate(nextProps) {
    console.log('app props in componentWillUpdate: ', this.props)
    const { location } = this.props
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location
    }
  }

  componentDidMount(){
    this.init();
  }

  handleUserWantsHome(event) {
    this.setState({
      userWantsHomePage: true,
      userHasSearched: false,
      userWantsLogin: false,
      userWantsProductList: false,
      userClickedEntry: false,
    })
  }

  handleUserWantsProductList(event){
    console.log('inside  product list handler')
    this.setState({
      userWantsProductList: !this.state.userWantsProductList,
    })
  }

  init(){
    var context = this;
    $.ajax({
      url: '/init',
      success: function (data) {
        context.setState(() => {
          context.state.allWines.reds.wines = data.top10Reds;
          context.state.allWines.whites.wines = data.top10Whites;
          context.state.allWines.uvas.wines = data.topRated;
        })
      },
      error: function(error) {
        console.log('error inside init duuudeeee', error)
      }
    })
  }

  getReviews(product_id){
    var context = this;
    console.log('this is the key', product_id);

    $.ajax({
      url: '/reviews',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        product_id: product_id
      }),
      success: function(reviews){
        if (context.state.reviews && reviews.length === context.state.reviews.length) {
          return;
        }
        context.setState({
          reviews: reviews
        });
      },
      error: function(error){
        console.log('error after getting reviews AJAX', error)
      }
    });
  }

  submitReview (review, rating, wine) {
    var context = this;
    console.log('wine', wine);

    $.ajax({
      url: '/review',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        review: review,
        rating: rating,
        product: wine.name,
        username: context.state.username,
        product_id: wine._id,
        time: Date
      }),
      success: function(data) {
        //TODO: provide user feedback upon successful review
        console.log('Received success submitReview AJAX', data)
      },
      error: function(error) {
        console.log('Error submitReview AJAX', error)
      }
    })
  }

  search (query, price) {
    var context = this;
    var searchHistory = this.state.searchHistory;
    searchHistory[searchHistory.length] = query;
    console.log('serach histnig' , searchHistory);
    this.setState({
      searchHistory: searchHistory,
      userHasSearched: true,
      userWantsProductList: true,
      userWantsHomePage: false
    })
    console.log('query inside search', query);
    console.log('price inside search', price);
    $.ajax({
      url: '/search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        search: query,
        price: price
      }),
      success: function(data) {
        console.log('success res from searchAJAX', data);
        if (data.length > 0) {
          context.setState({
            products: data,
            userHasSearched: true
          })
        }
      },
      error: function(err) {
        console.log(err)
      }
    })
  }

  postLike (wine, likeOrDislike) {
    wine.like = likeOrDislike;

    $.ajax({
      url: '/likes',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        wine: wine
      }),
      success: function(data) {
        console.log('data returned by postLike', data)
      },
      error: function(err) {
        console.error(err);
      }
    })
  }

  handleClickedProductEntry(wine) {
    console.log('inside clicked product entry', wine);
    if (wine) {
      this.setState({
        userClickedEntry: true,
        currentWine: {
          wine: wine
        },
        userWantsHomePage: false
      })
    }
  }

  // mapWinesIntoArray () {
  //   const results = [];
  //   for (const wineType in this.state.allWines) {
  //     results.push(this.state.allWines[wineType]);
  //   }
  //   return results;
  // }

  render () {
    // const { location } = this.props
    // console.log('location in render', location )
    // console.log('location.state in render', location.state )
    // // console.log('!!location.state.modal in render', !!location.state.modal )
    // console.log('this.previousLocation !== location in questionnaire', this.previousLocation !== location)
    // const isModal = !!(
    //   location.state &&
    //   location.state.modal &&
    //   this.previousLocation !== location // not initial render
    // )

    const wineRoutes = Object.values(this.state.allWines);
    // console.log('isModal', isModal)
    
    const Products = () => (
      <ProductList 
        handleUserWantsProductList={this.handleUserWantsProductList} 
        searchHistory={this.state.searchHistory} 
        reviews={this.state.reviews} 
        getReviews={this.getReviews} 
        products={this.state.products} 
        submitReview={this.submitReview} 
        userHasSearched={this.state.userHasSearched} 
        userWantsProductList={this.state.userWantsProductList}
      />
    )

    const Homepage = () => (
      <HomePageWines 
        wineRoutes={wineRoutes}
        handleClickedProductEntry={this.handleClickedProductEntry}
        postLike={this.postLike}
      />
    )

    const ProductOverviewComp = () => (
      <ProductOverview
        reviews={this.state.reviews}
        currentWine={this.state.currentWine}
        getReviews={this.getReviews}
        submitReview={this.submitReview}
      />
    )

    return (
      <div className = 'container'>
        <Router>
          <div>
            <div className = 'topBackgroundImageWrapper'>
              <Link to='/'>  
                <TopBar 
                  username={this.state.username} 
                  userLoggedIn={this.state.userLoggedIn} 
                  handleUserWantsLogin={this.handleUserWantsLogin} 
                  userHasSearched={this.state.userHasSearched}
                />
              </Link>
                <Route path='/questionnaire' component={Questionnaire}/>
              <div className = 'heroImageContainer'>
                <div className = 'heroContentWrapper'>
                  Uva 2.Grape
                  <Search className ='SearchBar' search={this.search} />
                </div>
              </div>    
            </div>
            <div>
              <Link to={{
                pathname: '/questionnaire',
                state: { modal: true}
                }}
              >
                <p>Take Questionnaire to Improve our suggestions!</p>
              </Link>
            </div>
            <div>
              <Nav wineRoutes={wineRoutes} />
              <hr/>
            </div>
            <div>
                <Route exact path='/' component={Homepage} />
                <Route path='/products' component={Products}/>
                <Route path='/product/overview' component={ProductOverviewComp}/>
                {wineRoutes.map((route, index) => (
                  <Route
                    key={index}
                    exact path={route.path}
                    component={() => (
                        <WineList
                          handleClickedProductEntry={this.handleClickedProductEntry}
                          wines={route.wines}
                          postLike={this.postLike}
                          choice={route.choice}
                        />
                      )
                    }
                  />
                ))}
            </div>
          </div>
        </Router>
      </div>
    )
  }
}
              // <Switch location={isModal ? this.previousLocation : location}>
              // </Switch>
              // <Switch location={isModal ? this.previousLocation : location}>
              // </Switch>
                // {isModal ? <Route path='/questionnaire' component={() => (<Questionnaire />)} /> : null}
                // <Switch location={isModal ? this.previousLocation : location}>
                  
                // </Switch>

export default App;