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
  dataArray: [],
  currentPlaying: 0,
  isAudioLoaded: false
}
const reducer = (state = initState, action) => {
  switch(action.type){
     case 'fillData':
       return {
         dataArray: action.value,
         isLoaded: state.isLoaded,
         currentPlaying: state.currentPlaying,
         isPlaying: state.isPlaying,
         isAudioLoaded: state.isAudioLoaded
       }
     case 'changeIsLoaded':
       return {
         isLoaded: action.value,
         dataArray: state.dataArray,
         currentPlaying: state.currentPlaying,
         isPlaying: state.isPlaying,
         isAudioLoaded: state.isAudioLoaded
       }
     case 'changeID': 
       return {
         isLoaded: state.isLoaded,
         dataArray: state.dataArray,
         currentPlaying: action.value,
         isPlaying: state.isPlaying,
         isAudioLoaded: state.isAudioLoaded
       }
     case 'changeIsPlaying':
       return {
         isLoaded: state.isLoaded,
         dataArray: state.dataArray,
         currentPlaying: state.currentPlaying,
         isPlaying: action.value,
         isAudioLoaded: state.isAudioLoaded
       }
     case 'changeIsAudioLoaded':
       return {
        isLoaded: state.isLoaded,
        dataArray: state.dataArray,
        currentPlaying: state.currentPlaying,
        isPlaying: state.isPlaying,
        isAudioLoaded: action.value
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