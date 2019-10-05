import React from 'react';
import {SafeAreaView, View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import {Icon} from 'native-base';
import {playerStyles} from './styles';
import {Audio} from 'expo-av'

const {SafeAreaViewStyles, headerViewStyles, coverViewStyles, coverStyles, controlStyles, iconStyles, ButtonStyles} = playerStyles;
const soundObject = new Audio.Sound();

const playButton = async (state, setState) => {
    if (state.isPlaying) {
        setState({isPlaying: false});
        await soundObject.pauseAsync()
    } else {
        setState({isPlaying: true});
        await soundObject.playAsync();
    }
}
const startPlaying = async (data, setState) => {
    if (await soundObject.getStatusAsync().then(resolve => resolve.isLoaded)) {
        await soundObject.stopAsync();
        await soundObject.unloadAsync();
      }
      try {
            await soundObject.loadAsync({uri: data.url}).then(() => {
            setTimeout(() => {    
            setState({isLoaded: true, isPlaying: true})
            soundObject.playAsync();
            }, 2000)
        });
        
      } catch (error) {
        Alert.alert('Произошла ошибка загрузки');
      }
}
export default class Player extends React.Component{
    constructor(){
        super();
        this.state={
            isPlaying: false,
            currentData: {},
            isLoaded: false
        }
    }
    componentDidMount = async () => {
        await Audio.setIsEnabledAsync(true);
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: false,
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true
         })
            const { navigation } = this.props;
            this.focusListener = navigation.addListener('didFocus', () => {
              let data = navigation.getParam('data', 'no-data')
              if (data.id !== this.state.currentData.id) {
                  this.setState({currentData: {
                  name: data.name, singer: data.singer, image: data.image, url: data.url, album: data.album, id: data.id
              }}) 
             startPlaying(data, (value) => this.setState(value))}
             else {
                 return;
             }
            });
    }
    componentWillUnmount() {
        this.focusListener.remove();
      }
    render() {
        return(
            <SafeAreaView style={SafeAreaViewStyles}>
                <View style={headerViewStyles}>
                    <TouchableOpacity style={{height: '100%', width: 60, alignItems: 'center', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('Playlist')}>
                        <Icon name='ios-arrow-back' type='Ionicons' style={{color: '#fa57c1', fontSize: 30}}/>
                    </TouchableOpacity>
                    <Text style={{color: '#333'}}>{this.state.isLoaded ? 'Playing' : 'Loading'}</Text>
                </View>
                <View style={coverViewStyles}>
                    <Image source={{uri: this.state.currentData.image}} style={coverStyles}
                    />
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff', fontSize: 28}}>{this.state.currentData.name}</Text>
                    <Text style={{color: '#fff8', fontSize: 20}}>{this.state.currentData.singer}</Text>
                    <Text style={{color: '#fa57c1'}}>{this.state.currentData.album}</Text>
                </View>
                <View style={controlStyles}>
                    <TouchableOpacity style={ButtonStyles}>
                        <Icon name='skip-back' type='Feather' style={{...iconStyles, fontSize: 46}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={ButtonStyles} onPress={() => playButton(this.state, (value) => this.setState(value))}>
                        <Icon name={this.state.isPlaying ? 'pause' : 'play'} type='Feather' style={{...iconStyles, fontSize: 60}}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={ButtonStyles} onPress={() => soundObject.stopAsync()}>
                        <Icon name='skip-forward' type='Feather' style={{...iconStyles, fontSize: 46}}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}