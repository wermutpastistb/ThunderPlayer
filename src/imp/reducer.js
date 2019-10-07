const initState = {
    isLoaded: false,
    isPlaying: false, 
    dataArray: [],
    shouldPlaying: 0,
    isAudioLoaded: false,
    currentPlaying: 0
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
           shouldPlaying: state.shouldPlaying
         }
       case 'changeIsLoaded':
         return {
           isLoaded: action.value,
           dataArray: state.dataArray,
           currentPlaying: state.currentPlaying,
           isPlaying: state.isPlaying,
           isAudioLoaded: state.isAudioLoaded,
           shouldPlaying: state.shouldPlaying
         }
       case 'changeID': 
         return {
           isLoaded: state.isLoaded,
           dataArray: state.dataArray,
           currentPlaying: action.value,
           isPlaying: state.isPlaying,
           isAudioLoaded: state.isAudioLoaded,
           shouldPlaying: state.shouldPlaying
         }
       case 'changeIsPlaying':
         return {
           isLoaded: state.isLoaded,
           dataArray: state.dataArray,
           currentPlaying: state.currentPlaying,
           isPlaying: action.value,
           isAudioLoaded: state.isAudioLoaded,
           shouldPlaying: state.shouldPlaying
         }
       case 'changeIsAudioLoaded':
         return {
          isLoaded: state.isLoaded,
          dataArray: state.dataArray,
          currentPlaying: state.currentPlaying,
          isPlaying: state.isPlaying,
          isAudioLoaded: action.value,
          shouldPlaying: state.shouldPlaying
         }
       case 'changeShouldPlaying':
         return {
          isLoaded: state.isLoaded,
          dataArray: state.dataArray,
          currentPlaying: state.currentPlaying,
          isPlaying: state.isPlaying,
          isAudioLoaded: state.isAudioLoaded,
          shouldPlaying: action.value
         }
      default:
        return state;
    }
  }