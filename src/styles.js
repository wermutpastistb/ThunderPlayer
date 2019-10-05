import {StyleSheet, Platform, StatusBar, Dimensions} from 'react-native';

export const playlistStyles = StyleSheet.create({
    SafeAreaViewStyles: {
        marginTop: Platform.select({
            ios: 0,
            android: StatusBar.currentHeight
        }),
        backgroundColor: '#000',
        flex: 1
    },
    headerTitleStyles: {
        fontSize: 38,
        color: '#fa57c1',
        marginLeft: 15
    },
    listItemStyles: {
        height: Dimensions.get('screen').height / 12, 
        width: Dimensions.get('screen').width, 
        flexDirection: 'row', 
        backgroundColor: '#000',
        marginTop: 8,
        borderBottomColor: '#0004',
        borderBottomWidth: 0.5
    },
    coverImageStyles: {
        height: Dimensions.get('screen').height / 12, 
        width: Dimensions.get('screen').width / 6,
        borderRadius: 5
    },
    songTitleStyles: {
        color: '#fff',
        fontSize: 24
    },
    songSingerStyles: {
        color: '#fff8',
        fontSize: 12
    },
    infoContainer: {
        marginLeft: 10,
        justifyContent: 'space-around'
    }
})

export const playerStyles = StyleSheet.create({
    SafeAreaViewStyles: {
        marginTop: Platform.select({
            ios: 0,
            android: StatusBar.currentHeight
        }),
        backgroundColor: '#000',
        flex: 1,
    },
    headerViewStyles: {
        height: Dimensions.get('screen').height / 14, 
        width: Dimensions.get('screen').width, 
        backgroundColor: '#000', 
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    coverViewStyles: {
        height: Dimensions.get('screen').width,
        width: Dimensions.get('screen').width,
        backgroundColor: '#0001',
        justifyContent:'center',
        alignItems: 'center'
    },
    coverStyles: {
        height: Dimensions.get('screen').width * 0.9,
        width: Dimensions.get('screen').width * 0.9,
        borderRadius: 10
    },
    controlStyles: {
        flexDirection: 'row',
        height: Dimensions.get('screen').height / 6,
        width: Dimensions.get('screen').width,
    },
    iconStyles: {
        color: '#fff'
    },
    ButtonStyles: {
        height: '100%',
        width: '33%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})