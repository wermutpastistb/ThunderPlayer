import {createAppContainer} from 'react-navigation';
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import playlistScreen from './src/playlistScreen';
import playerScreen from './src/playerScreen'
const initState = {
  isLoaded: false,
  isPlaying: false, 
  dataArray: []
}
const reducer = (state = initState, action) => {
  switch(action.type){
     case 'fillData':
       return {
         dataArray: action.value,
         isLoaded: state.isLoaded
       }
     case 'changeIsLoaded':
       return {
         isLoaded: action.value,
         dataArray: state.dataArray
       }
     case 'pushData':
       return {
         dataArray: [...state.dataArray, action.value]
       }
    default:
      return state;
  }
}
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