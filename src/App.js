import React, { Component } from 'react';
// import * as BooksAPI from './BooksAPI'
import { Switch,Route } from 'react-router-dom';
import Provider, {Context}from './providers/index';
import SearchView from './views/SearchView';
import LibraryView from './views/LibraryView';
import './App.css';

class BooksApp extends Component {
  // state = {
  //   /**
  //    * TODO: Instead of using this state variable to keep track of which page
  //    * we're on, use the URL in the browser's address bar. This will ensure that
  //    * users can use the browser's back and forward buttons to navigate between
  //    * pages, as well as provide a good URL they can bookmark and share.
  //    */
  //   showSearchPage: false,
  // }

  render() {
    return (
      <div className="app">
        <Provider>
          <Switch>
            {/* <Route exact path={'/'} component={LibraryView}></Route>
            <Route exact path={'/search'} component={SearchView}></Route> */}
            <Route exact path={'/'} render={() => (
            <Context.Consumer>
              {context => <LibraryView {...context} />}
            </Context.Consumer> )}/>
            <Route exact path={'/search'} render={() => (
            <Context.Consumer>
              {context => <SearchView {...context} />}
            </Context.Consumer> )}/>
          </Switch>
        </Provider>
      </div>
    )
  }
}

export default BooksApp
