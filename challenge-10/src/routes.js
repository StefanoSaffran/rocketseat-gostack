import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SignIn from './Pages/SignIn';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
  })
);
