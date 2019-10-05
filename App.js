import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import playlistScreen from './src/playlistScreen';
import playerScreen from './src/playerScreen'
const initState = {
  isLoaded: false,
  isPlaying: false, 
  
}
const reducer = (state, action) => {
  switch(action.type){
    default:
      return state;
  }
}
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
export default createAppContainer(AppNavigator)