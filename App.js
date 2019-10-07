import {createAppContainer} from 'react-navigation';
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/imp/reducer'

import playlistScreen from './src/playlistScreen';
import playerScreen from './src/playerScreen'

let store = createStore(reducer);
const AppNavigator = createStackNavigator({
  Playlist: {
    screen: playlistScreen
  },
  Player: {
    screen: playerScreen
  }
 }, 
 {
    initialRouteName: 'Playlist',
    headerMode: 'none'
 }
)
let AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render() {
    return(
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}