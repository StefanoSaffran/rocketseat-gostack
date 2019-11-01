import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './pages/Home';
import Cart from './pages/Cart';

import Header from './components/Header';
import HeaderLogo from './components/HeaderLogo';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      defaultNavigationOptions: navigation => ({
        headerLeft: <HeaderLogo {...navigation} />,
        headerRight: <Header {...navigation} />,
        headerStyle: {
          backgroundColor: '#141419',
        },
      }),
      cardStyle: {
        backgroundColor: '#141419',
      },
    }
  )
);

export default Routes;
