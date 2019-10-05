import React from 'react';
import {View, Text, SafeAreaView, Platform, Dimensions, ScrollView, Image, YellowBox, TouchableOpacity} from 'react-native';
import {Header, Left, Right, Body, Label, Title, Icon} from 'native-base'
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
    if (state.isLoaded) {
        state.dataArray.forEach((element, i) => {
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
export default class PlaylistScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            dataArray: [],
            isLoaded: false
        }
    }
    componentDidMount = async () => {
        db.collection('music').get()
        .then((snapshot) => {
            snapshot.forEach((element) => {
                this.setState({dataArray: [...this.state.dataArray, {name: element.data().name, singer: element.data().singer, url: element.data().url, image: element.data().image, album: element.data().album, id: element.data().id}],
                isLoaded: true});
            })
        })
    }
    render() {
        return(
            <SafeAreaView style={SafeAreaViewStyles}>
                <View style={{height: Dimensions.get('screen').height / 10, width: Dimensions.get('screen').width, backgroundColor: '#111', justifyContent: 'center'}}>
                    <Text style={headerTitleStyles}>Yours music</Text>
                </View>
                <ScrollView>
                    {list(this.state, this.props.navigation)}
                </ScrollView>
            </SafeAreaView>
        )
    }
}
