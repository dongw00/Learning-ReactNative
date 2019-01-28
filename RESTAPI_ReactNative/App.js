import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './Login';
import Profile from './Profile';

class App extends React.Component {
  render() {
    return (
      <Application />
    )
  }
}

const AppNavigator = createStackNavigator({
  Profile: { screen: Profile },
  Home: { screen: Login },
});

export default createAppContainer(AppNavigator);