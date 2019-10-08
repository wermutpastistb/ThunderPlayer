const initState = {
    isLoaded: false,
    isPlaying: false, 
    dataArray: [],
    shouldPlaying: 0,
    isAudioLoaded: false,
    currentPlaying: 0,
    currentTab: 'songs'
  }
 export default reducer = (state = initState, action) => {
    switch(action.type){
       case 'fillData':
         return {
           dataArray: action.value,
           isLoaded: state.isLoaded,
           currentPlaying: state.currentPlaying,
           isPlaying: state.isPlaying,
           isAudioLoaded: state.isAudioLoaded,
           shouldPlaying: state.shouldPlaying,
           currentTab: state.currentTab
         }
       case 'changeIsLoaded':
         return {
           isLoaded: action.value,
           dataArray: state.dataArray,
           currentPlaying: state.currentPlaying,
           isPlaying: state.isPlaying,
           isAudioLoaded: state.isAudioLoaded,
           shouldPlaying: state.shouldPlaying,
           currentTab: state.currentTab
         }
       case 'changeID': 
         return {
           isLoaded: state.isLoaded,
           dataArray: state.dataArray,
           currentPlaying: action.value,
           isPlaying: state.isPlaying,
           isAudioLoaded: state.isAudioLoaded,
           shouldPlaying: state.shouldPlaying,
           currentTab: state.currentTab
         }
       case 'changeIsPlaying':
         return {
           isLoaded: state.isLoaded,
           dataArray: state.dataArray,
           currentPlaying: state.currentPlaying,
           isPlaying: action.value,
           isAudioLoaded: state.isAudioLoaded,
           shouldPlaying: state.shouldPlaying,
           currentTab: state.currentTab
         }
       case 'changeIsAudioLoaded':
         return {
          isLoaded: state.isLoaded,
          dataArray: state.dataArray,
          currentPlaying: state.currentPlaying,
          isPlaying: state.isPlaying,
          isAudioLoaded: action.value,
          shouldPlaying: state.shouldPlaying,
          currentTab: state.currentTab
         }
       case 'changeShouldPlaying':
         return {
          isLoaded: state.isLoaded,
          dataArray: state.dataArray,
          currentPlaying: state.currentPlaying,
          isPlaying: state.isPlaying,
          isAudioLoaded: state.isAudioLoaded,
          shouldPlaying: action.value,
          currentTab: state.currentTab
         }
       case 'changeTab': 
        return {
          isLoaded: state.isLoaded,
          dataArray: state.dataArray,
          currentPlaying: state.currentPlaying,
          isPlaying: state.isPlaying,
          isAudioLoaded: state.isAudioLoaded,
          shouldPlaying: state.shouldPlaying,
          currentTab: action.value
        }
      default:
        return state;
    }
  }