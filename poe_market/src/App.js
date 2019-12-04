import React, {Fragment} from 'react';
import './App.css';

// Redux
import {Provider} from 'react-redux'
import store from './store'

// from file
import Listing from './components/listings/Listings'

// setup socket connection
import configureSocket from './socket';
export const socket = configureSocket(store.dispatch);

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
