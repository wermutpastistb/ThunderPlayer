import React from 'react';
import {View, Text, SafeAreaView, Platform, Dimensions, ScrollView, Image, YellowBox, TouchableOpacity} from 'react-native';
import {Header, Left, Right, Body, Label, Title, Icon} from 'native-base'
import {connect} from 'react-redux';
import {playlistStyles} from './styles'

import * as firebase from 'firebase';
import 'firebase/firestore';

import {firebaseConfig} from './constants'

const {SafeAreaViewStyles, headerTitleStyles, listItemStyles, coverImageStyles, songTitleStyles, songSingerStyles, infoContainer} = playlistStyles;


firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
YellowBox.ignoreWarnings(['Setting a timer']);
const list = (state, navigation) => {
    let views = [];
    let array = state.dataArray;
    if (state.isLoaded) {
        array.forEach((element, i) => {
            views.push(
                <TouchableOpacity style={listItemStyles} key={i} onPress={() => navigation.navigate('Player', {data: element})}>
                    <Image source={{uri: element.image}} style={coverImageStyles}/>
                    <View style={infoContainer}>
                        <Text style={songTitleStyles}>{element.name}</Text>
                        <Text style={songSingerStyles}>{element.singer}</Text>
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
class PlaylistScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            dataArray: [],
            isLoaded: false
        }
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
        })
    }
    render() {
        return(
            <SafeAreaView style={SafeAreaViewStyles}>
                <View style={{height: Dimensions.get('screen').height / 10, width: Dimensions.get('screen').width, backgroundColor: '#111', justifyContent: 'center'}}>
                    <Text style={headerTitleStyles}>Your music</Text>
                </View>
                <ScrollView>
                    {list(this.props, this.props.navigation)}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dataArray: state.dataArray,
        isLoaded: state.isLoaded
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fillData: (value) => dispatch({type: 'fillData', value: value}),
        changeIsLoaded: (value) => dispatch({type: 'changeIsLoaded', value: value}),
        pushData: (value) => dispatch({type: 'pushData', value: value})
    }
}

export default container = connect(mapStateToProps, mapDispatchToProps)(PlaylistScreen)