/**
 * Yeh Basically mera router file hai, jismein mere routes defined hai.
 */

import React from 'react';
import Home from './Home';
import Screen from './Screen';

import { StackNavigator } from 'react-navigation';

const App = StackNavigator(
  {
    Home: { screen: Home },
    Screen: { screen: Screen },
  },
  {
    initialRouteName: 'Home',
  }
);

export default App;