import React from 'react';
import {TouchableOpacity, Image, View, Text, Dimensions} from 'react-native';
import {Icon} from 'native-base';

import {playlistStyles} from '../styles';

const {height, width} = Dimensions.get('screen');
const {listItemStyles, coverImageStyles, infoContainer, songSingerStyles, songTitleStyles} = playlistStyles;
export default list = (props, loadAudio) => {
    let views = [];
    let array = props.dataArray;
    if (props.isLoaded) {
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