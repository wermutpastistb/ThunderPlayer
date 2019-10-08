import React from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';
import {Icon} from 'native-base';
const {height, width} = Dimensions.get('screen');
import {playlistStyles} from '../styles';
const {headerTitleStyles} = playlistStyles;
export default class headerComponent extends React.Component {
    render() {
        return (
            <View style={{height: height / 10, width: width, backgroundColor: '#000', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity style={{marginHorizontal: 15}} onPress={this.props.leftButton}>
                        <Icon name={this.props.leftIconName} type={this.props.leftIconType} style={{fontSize: 28, color: '#fa57c1'}}/>
                    </TouchableOpacity>
                    <Text style={headerTitleStyles}>{this.props.title}</Text>
                </View>
        )
    }
}