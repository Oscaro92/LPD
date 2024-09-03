// * import libraries
import {StatusBar} from 'expo-status-bar';
import * as WebBrowser from "expo-web-browser";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

// * import component
import CrossBack from '../../components/crossBack'
const Spacer = ({ size }) => <View style={{ height: size }} />;
const light_play = require('../../../assets/img/icones/light_play.png');
const Item = ({ item, color, zIndex }) => {
    const handleUrl = async (value) => {
        await WebBrowser.openBrowserAsync(value);
    };

    return (
        <View style={[styles.item, {backgroundColor: color, zIndex: zIndex}]}>
            <Image style={styles.image} source={item.image}/>
            <Spacer size={20}/>
            <Text style={styles.nameSelection}>
                {item.name}
            </Text>
            <Spacer size={20}/>
            <Pressable onPress={() => handleUrl(item.url)}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        ÉCOUTER
                    </Text>
                    <Image source={light_play} style={styles.imageLightPlay}/>
                </View>
            </Pressable>
        </View>
    )
}

// * data
const data = [
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-oracle-sisters?in=lapatatedouce/sets/la-patate-douce-selections",
        image: require("../../../assets/img/selections/selec_oracle.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-corine?in=lapatatedouce/sets/la-patate-douce-selections",
        image: require("../../../assets/img/selections/selec_corine.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-tonique-man?in=lapatatedouce/sets/la-patate-douce-selections",
        image: require("../../../assets/img/selections/selec_tonique.png")
    },
    {
        url: "https://m.soundcloud.com/lapatatedouce/spooners-selection",
        image: require("../../../assets/img/selections/selec_spooners.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-antonin",
        image: require("../../../assets/img/selections/selec_antonin.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-bomel",
        image: require("../../../assets/img/selections/selec_bomel.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/daymax",
        image: require("../../../assets/img/selections/selec_daymax.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-heritage-listed-1",
        image: require("../../../assets/img/selections/selec_heritage.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-lord",
        image: require("../../../assets/img/selections/selec_lord.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-lucien-kimono",
        image: require("../../../assets/img/selections/selec_lucien.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-macadam-crocodile",
        image: require("../../../assets/img/selections/selec_macadam.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-maxime-nerguisian",
        image: require("../../../assets/img/selections/selec_maxime.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-mi-man",
        image: require("../../../assets/img/selections/selec_mi.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-motel-club",
        image: require("../../../assets/img/selections/selec_motel.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-sauce-blanche",
        image: require("../../../assets/img/selections/selec_sauce.png")
    },
    {
        url: "https://soundcloud.com/lapatatedouce/selection-by-palomina",
        image: require("../../../assets/img/selections/selec_palo.png")
    }
]

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

            <ScrollView style={styles.scrollView}>
                {data.map((item, index) => (
                    <View style={styles.items}>
                        {(index % 2) === 0 ? (
                            <Item item={item} color={"#F0A519"} zIndex={1}/>
                        ):(
                            <Item item={item} color={"#520D2F"} zIndex={0}/>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBox: {
        flexDirection:'column',
        width:'100%',
        position: 'relative',
        height: '30%',
        backgroundColor: '#520D2F',
        zIndex: 0,
        borderBottomRightRadius:55,
        borderBottomLeftRadius:55
    },
    title: {
        backgroundColor: '#F5ECC4',
        minHeight: '20%',
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
        justifyContent:'center',
        alignItems:'center',
        borderBottomEndRadius:55,
        borderBottomStartRadius:55,
        paddingHorizontal: 11,
        paddingVertical: 11,
        flexGrow: 1,
        marginTop: -40
    },
    subTitleText: {
        //fontFamily:'Futura',
        marginTop: 40,
        fontSize:11,
        fontWeight:'bold',
        color:'#F5ECC4',
        textAlign: 'center'
    },
    scrollView: {
        width: '100%',
        zIndex: -1
    },
    items: {
        width: '100%'
    },
    item: {
        backgroundColor: '#F0A519',
        alignItems: "center",
        justifyContent: 'space-between',
        borderBottomLeftRadius: 55,
        borderBottomRightRadius: 55,
        flexDirection: 'column',
        flex:1,
        width: '100%',
        marginTop: -40
    },
    nameSelection: {
        fontFamily:'Baruta',
        fontSize:21,
        color:'#520D2F'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        // fontFamily: 'Futura-Bold',
        fontSize: 17,
        color: '#F5ECC4',
        marginRight: 10,
    },
    image: {
        width: '50%',
        height: undefined,
        aspectRatio: 1
    },
    imageLightPlay: {
        width: 20,
        height: 20,
        zIndex:20
    }
});