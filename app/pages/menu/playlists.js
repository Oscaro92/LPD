// * import libraries
import {StatusBar} from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

// * import components
import CrossBack from '../../components/crossBack'

export default function Playlists() {
    const handlePress = async () => {
        await WebBrowser.openBrowserAsync('https://open.spotify.com/user/31jtgdnr2bmjias4xxsxxpueplhu?si=00496f41aedb4a8d');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <CrossBack/>
            <View style={styles.topBox}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>Playlists</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subTitleText}>DÉCOUVREZ NOS PLAYLISTS SUR SPOTIFY</Text>
                </View>
            </View>
            <View style={styles.bottomBox}>
                <Image style={styles.image} source={require("../../../assets/img/playlists/BestofGroove.png")}/>
                <Pressable onPress={() => handlePress()}>
                    <View style={styles.button}>
                        <Text style={styles.text}>
                            ÉCOUTER
                        </Text>
                        <Image source={require('../../../assets/img/icones/light_play.png')} style={styles.imagePlay}/>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#520D2F',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
    },
    topBox: {
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        height: '30%',
        width: '100%',
        backgroundColor: '#F0A519',
        zIndex: 0,
        borderBottomRightRadius:55,
        borderBottomLeftRadius:55
    },
    title: {
        backgroundColor:'#F5ECC4',
        height: '70%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomEndRadius:55,
        borderBottomStartRadius:55,
        zIndex: 1
    },
    titleText: {
        // fontFamily:'Baruta',
        color:'#520D2F',
        fontSize:40
    },
    subTitle: {
        backgroundColor:'#F0A519',
        width:'100%',
        height:'30%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomEndRadius:55,
        borderBottomStartRadius:55,
        zIndex: 1
    },
    subTitleText: {
        // fontFamily:'Futura',
        fontSize:14,
        fontWeight:'bold',
        color:'#F5ECC4'
    },
    bottomBox: {
        zIndex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom :'10%',
        marginTop:'10%',
        flex:1
    },
    image: {
        width: '80%',
        height: undefined,
        aspectRatio: 1
    },
    button: {
        backgroundColor: '#0049C3',
        borderRadius: 23,
        paddingHorizontal: 34,
        paddingVertical: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        //fontFamily: 'Futura-Bold',
        fontSize: 17,
        color: '#F5ECC4',
        marginRight: 10,
    },
    imagePlay: {
        width: 20,
        height: 20,
        zIndex:20
    }
});