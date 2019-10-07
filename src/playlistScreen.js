import React from 'react';
import {View, Text, SafeAreaView, Platform, Dimensions, ScrollView, Image, YellowBox, TouchableOpacity, Button, StatusBar} from 'react-native';
import {Header, Left, Right, Body, Label, Title, Icon} from 'native-base'

import {connect} from 'react-redux';

import Animated, { Easing } from 'react-native-reanimated';

import {Audio} from 'expo-av'


import {playlistStyles} from './styles';
import {playerStyles} from './styles';
const {SafeAreaViewStyles, headerTitleStyles, listItemStyles, coverImageStyles, songTitleStyles, songSingerStyles, infoContainer} = playlistStyles;
const {coverViewStyles, coverStyles, controlStyles, iconStyles, ButtonStyles} = playerStyles;
const {height, width} = Dimensions.get('screen');

import * as firebase from 'firebase';
import 'firebase/firestore';
import {firebaseConfig} from './imp/constants'
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

YellowBox.ignoreWarnings(['Setting a timer']);

const soundObject = new Audio.Sound();

class PlaylistScreen extends React.Component {
    constructor(){
        super();
        this.playerX = new Animated.Value(-height + (height / 10) + height / 7);
        this.headerOpacity = new Animated.Value(1);
        this.miniPlayerOpacity = new Animated.Value(1);
        this.bigPlayerOpacity = new Animated.Value(0);
        this.bigPlayerX = new Animated.Value(height / 10)
    }
    componentDidMount = async () => {
        let array = [];
        db.collection('music').get()
        .then((snapshot) => {
            snapshot.forEach((element) => {
                array = [...array, {name: element.data().name, singer: element.data().singer, url: element.data().url, image: element.data().image, album: element.data().album, id: element.data().id}];
            })
            this.props.fillData(array);
            console.log(this.props.dataArray)
            this.props.changeIsLoaded(true)
            this.loadAudio(this.props)
        })
    }
    playButton = async (props) => {
        if (props.isPlaying) {
            await soundObject.pauseAsync();
            props.changeIsPlaying(false)
        } else {
            await soundObject.playAsync();
            props.changeIsPlaying(true)
        }
    }
    loadAudio = async (props) => {
        if (props.isAudioLoaded) {
            props.changeIsPlaying(false)
            await soundObject.stopAsync();
            await soundObject.unloadAsync();
            props.changeIsAudioLoaded(false)
            await soundObject.loadAsync({uri: props.dataArray[props.playID].url});
            await soundObject.playAsync();
            props.changeIsAudioLoaded(true);
            props.changeIsPlaying(true);
            props.changeShouldPlaying(props.playID)
        } else {
            await soundObject.loadAsync({uri: props.dataArray[props.playID].url});
            props.changeIsAudioLoaded(true);
            props.changeShouldPlaying(props.playID)
        }
    }
    forwardAudio = async () => {
        if (this.props.playID + 1 >= this.props.dataArray.length) {
            await this.props.changePlay(0);
            await this.loadAudio(this.props);
        } else {
            await this.props.changePlay(this.props.playID + 1);
            await this.loadAudio(this.props);
        }
    }
    backAudio = async () => {
        if (this.props.playID - 1 <= 0) {
            await this.props.changePlay(this.props.dataArray.length - 1);
            await this.loadAudio(this.props);
        } else {
            await this.props.changePlay(this.props.playID - 1);
            await this.loadAudio(this.props);
        }
    }
    upPlayer() {
        Animated.timing(this.playerX, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
        }).start()
        Animated.timing(this.headerOpacity, {
            toValue: 0.3,
            duration: 300,
            easing: Easing.linear
        }).start();
        Animated.timing(this.miniPlayerOpacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
        }).start();
        Animated.timing(this.bigPlayerOpacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear
        }).start();
        Animated.timing(this.bigPlayerX, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
        }).start();
    }
    closePlayer() {
        Animated.timing(this.playerX, {
            toValue: -height + (height / 10) + height / 7,
            duration: 100,
            easing: Easing.linear
        }).start()
        Animated.timing(this.headerOpacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear
        }).start();
        Animated.timing(this.miniPlayerOpacity, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear
        }).start();
        Animated.timing(this.bigPlayerOpacity, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear
        }).start();
        Animated.timing(this.bigPlayerX, {
            toValue: height / 10,
            duration: 300,
            easing: Easing.linear
        }).start();
    }
    render() {
        if (this.props.isLoaded) {
        return(
            <SafeAreaView style={SafeAreaViewStyles}>
                <Animated.View style={{height: height / 10, width: width, backgroundColor: '#111', justifyContent: 'center', opacity: this.headerOpacity}}>
                    <Text style={headerTitleStyles}>Your music</Text>
                </Animated.View>
                <ScrollView>
                    {list(this.props, this.props.navigation, this.props, () => this.loadAudio(this.props))}
                </ScrollView>
                    <Animated.View style={{backgroundColor: '#000', height: height - height / 7, position: 'absolute', bottom: this.playerX, width: width}}>
                        <Animated.View style={{backgroundColor: '#000', height: height / 10, width: width, flexDirection: 'row', opacity: this.miniPlayerOpacity}}>
                            <Image source={{uri: this.props.dataArray[this.props.playID].image}} style={{height: height / 10, width: height / 10 }}/>
                            <TouchableOpacity style={{marginLeft: 10, justifyContent: 'space-around', height: height / 10, flex: 1}} onPress={() => this.upPlayer()}>
                                <Text style={{color: '#fff', fontSize: 24}}>{this.props.dataArray[this.props.playID].name}</Text>
                                <Text style={{color: '#999', fontSize: 16}}>{this.props.dataArray[this.props.playID].singer}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: height / 10, width: width / 8}} onPress={() => this.backAudio(this.props)}>
                                <Icon name='skip-back' type='Feather' style={{fontSize: 28, color: '#fff'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: height / 10, width: width / 8}} onPress={() => this.playButton(this.props)}>
                                <Icon name={this.props.isPlaying ? 'pause' : 'play'} type='Feather' style={{fontSize: 28, color: '#fff'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', height: height / 10, width: width / 8}} onPress={() => this.forwardAudio(this.props)}>
                                <Icon name='skip-forward' type='Feather' style={{fontSize: 28, color: '#fff'}}/>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={{top: this.bigPlayerX, position: 'absolute', opacity: this.bigPlayerOpacity}}>
                        <TouchableOpacity style={{height: 50, width: width, justifyContent: 'center', alignItems: 'center'}} onPress={() => this.closePlayer()}>
                            <Icon name='chevron-down' type='Feather' style={{color: '#999', fontSize: 18}}/>
                        </TouchableOpacity>
                        <View style={coverViewStyles}>
                            <Image source={{uri: this.props.dataArray[this.props.playID].image}} style={coverStyles}/>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: '#fff', fontSize: 28}}>{this.props.dataArray[this.props.playID].name}</Text>
                            <Text style={{color: '#fff8', fontSize: 20}}>{this.props.dataArray[this.props.playID].singer}</Text>
                            <Text style={{color: '#fa57c1'}}>{this.props.dataArray[this.props.playID].album}</Text>
                        </View>
                        <View style={controlStyles}>
                            <TouchableOpacity style={ButtonStyles} onPress={() => this.backAudio(this.props)}>
                                <Icon name='skip-back' type='Feather' style={{...iconStyles, fontSize: 46}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={ButtonStyles} onPress={() => this.playButton(this.props)}>
                                <Icon name={this.props.isPlaying ? 'pause' : 'play'} type='Feather' style={{...iconStyles, fontSize: 60}}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={ButtonStyles} onPress={() => this.forwardAudio(this.props)}>
                                <Icon name='skip-forward' type='Feather' style={{...iconStyles, fontSize: 46}}/>
                            </TouchableOpacity>
                        </View>
                        </Animated.View>
                    </Animated.View>
            </SafeAreaView>
        )
        } else {
            return(
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Loading</Text>
                </View>

            )
        }
    }
}
const list = (state, navigation, props, loadAudio) => {
    let views = [];
    let array = state.dataArray;
    if (state.isLoaded) {
        array.forEach((element, i) => {
            views.push(
                <TouchableOpacity style={listItemStyles} key={i} onPress={async () => {await props.changePlay(i); await loadAudio()}}>
                    <Image source={{uri: element.image}} style={coverImageStyles}/>
                    <View style={infoContainer}>
                        <Text style={songTitleStyles}>{element.name}</Text>
                        <Text style={songSingerStyles}>{element.singer}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                     <View style={{justifyContent: 'center', alignItems: 'center', width: width / 8, height: height / 12}}>
                        <Icon name='music' type='Feather' style={{color: '#fa57c1', fontSize: 30, opacity: props.playID === i ? 1 : 0}}/>
                     </View>
                </TouchableOpacity>
            )
        })
        return views;
    } else {
        return (
            <Text style={{color: '#fff'}}>Loading</Text>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        dataArray: state.dataArray,
        isLoaded: state.isLoaded,
        playID: state.currentPlaying,
        isPlaying: state.isPlaying,
        isAudioLoaded: state.isAudioLoaded,
        shouldPlaying: state.shouldPlaying
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fillData: (value) => dispatch({type: 'fillData', value: value}),
        changeIsLoaded: (value) => dispatch({type: 'changeIsLoaded', value: value}),
        pushData: (value) => dispatch({type: 'pushData', value: value}),
        changePlay: (value) => dispatch({type: 'changeID', value: value}),
        changeIsPlaying: (value) => dispatch({type: 'changeIsPlaying', value: value}),
        changeIsAudioLoaded: (value) => dispatch({type: 'changeIsAudioLoaded', value: value}),
        changeShouldPlaying: (value) => dispatch({type: 'changeShouldPlaying', value: value})
    }
}

export default container = connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen)