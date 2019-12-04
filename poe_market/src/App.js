import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';

// Redux
import {Provider} from 'react-redux'
import store from './store'

// from file
import Listing from './components/listings/Listings'

const App = () => (
  <Provider store = {store}>
    <div className="App-header">
      <Fragment>
        <Listing />
      </Fragment>
    </div>
  </Provider>
)

export default App;
