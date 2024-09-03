// * import libraries
import {StatusBar} from 'expo-status-bar';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

// * import component
import CrossBack from '../../components/crossBack'

export default function Selections() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <CrossBack/>
            <View style={styles.topBox}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>SÉLECTIONS</Text>
                </View>
                <View style={styles.subTitle}>
                    <Text style={styles.subTitleText}>DÉCOUVREZ LES SÉLECTIONS ET MIX SAVOUREUX CONCOCTÉS PAR NOS ARTISTES PRÉFÉRÉS</Text>
                </View>
            </View>

            <ScrollView style={{marginTop:-40, zIndex: -1}}>
                {/* Add map of selection + condition */}
                <View style={{
                    backgroundColor: '#F0A519',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,

                }}>
                    <View style={{
                        zIndex: 2,
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom :40,
                        marginTop:80,
                        flex:1
                    }}>
                        <Image
                            style={{width: '50%', height: undefined, aspectRatio: 1}}
                            source={require("./assets/img/selections/selec_oracle.png")}/>
                        <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#481121'}}>
                            Selection by Oracle sisters
                        </Text>
                        <Spacer size={20}/>
                        <Pressable onPress={() => handlePress3()}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontFamily: 'Futura-Bold',
                                    fontSize: 17,
                                    color: '#F5ECC4',
                                    marginRight: 10,
                                }}>
                                    ÉCOUTER
                                </Text>
                                <Image
                                    source={require('./assets/img/playlists/icons8-jouer.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        zIndex:20
                                    }}/>
                            </View>
                        </Pressable>
                    </View>
                </View>

                <View style={{
                    backgroundColor: '#481121',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,
                    marginTop:-40,
                    zIndex: -1

                }}>
                    <View style={{
                        zIndex: 1,
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        marginBottom :40,
                        marginTop:80,
                        flex:1
                    }}>
                        <Image
                            style={{width: '50%', height: undefined, aspectRatio: 1}}
                            source={require("./assets/img/selections/selec_corine.png")}/>
                        <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#F0A519'}}>
                            Selection by Corine
                        </Text>
                        <Spacer size={20}/>
                        <Pressable onPress={() => handlePress4()}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontFamily: 'Futura-Bold',
                                    fontSize: 17,
                                    color: '#F5ECC4',
                                    marginRight: 10,
                                }}>
                                    ÉCOUTER
                                </Text>
                                <Image
                                    source={require('./assets/img/playlists/icons8-jouer.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        zIndex:20
                                    }}/>
                            </View>
                        </Pressable>
                    </View>
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
    },
    topBox: {
        flexDirection:'column',
        width:'100%',
        minHeight: '30%',
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        backgroundColor: '#520D2F',
        zIndex: 0,
        borderBottomRightRadius:55,
        borderBottomLeftRadius:55
    },
    title: {
        backgroundColor: '#F5ECC4',
        minHeight: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomEndRadius: 55,
        borderBottomStartRadius: 55,
        zIndex: 1
    },
    titleText: {
        //fontFamily:'Baruta',
        color:'#520D2F',
        fontSize:40
    },
    subTitle: {
        backgroundColor:'#520D2F',
        width:'100%',
        height:'30%',
        alignItems:'center',
        justifyContent:'center',
        borderBottomEndRadius:55,
        borderBottomStartRadius:55,
        zIndex: 2,
        paddingHorizontal: 11,
        paddingVertical: 11,
        flexGrow: 1
    },
    subTitleText: {
        //fontFamily:'Futura',
        fontSize:11,
        fontWeight:'bold',
        color:'#F5ECC4',
        textAlign: 'center',
    }
});