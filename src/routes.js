// src/routes.js
import React from 'react';
import { Router, Route } from 'react-router';

import MainComponent from './components/MainComponent';
import Home from './components/Home';

/**
 * The routing information for the app
 */
const Routes = (props) => (
  <Router {...props}>
  	<Route component={MainComponent}>
      <Route path="*" component={Home} />
    </Route>
  </Router>
);

export default Routes;