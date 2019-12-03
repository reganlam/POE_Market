import React, {Fragment} from 'react';
import logo from './logo.svg';
import './App.css';

// Redux
import {Provider} from 'react-redux'
import store from './store'

// from file
import Listing from './components/listing/Listing'

const App = () => (
  <Provider store = {store}>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Fragment>
          <Listing />
        </Fragment>
      </header>
    </div>
  </Provider>
)

export default App;
