// * import libraries
import * as Device from "expo-device";
import {StatusBar} from 'expo-status-bar';
import * as WebBrowser from "expo-web-browser";
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

// * import components
import CrossBack from '../../components/crossBack';

export default function Soutenir() {
    const handleUrl = async () => {
        await WebBrowser.openBrowserAsync("https://lydia-app.com/pots?id=75606-soutien-pour-la");
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <CrossBack/>
            <Image source={require("../../../assets/img/soutenir/title.png")} style={styles.titleImage}/>
            <Image source={require("../../../assets/img/soutenir/main.png")} style={styles.image} resizeMethod="contain"/>
            <Text style={styles.text}>
                &emsp;&emsp;Si vous êtes une personne absolument invroyable et que vous voulez faire une bonne action dans ce monde de brute, vous pouvez nous apporter votre soutien en faisant un don !
            </Text>
            <Text style={styles.text}>
                Les dons nous aideront à:{"\n"}
                &emsp;&emsp;• Continuer à avoir ZERO PUB{"\n"}
                &emsp;&emsp;• Faire évoluer l'App & Site{"\n"}
                &emsp;&emsp;• Organiser des évènements{"\n"}
                &emsp;&emsp;• Payer les nombreux frais existants
            </Text>
            <View style={styles.bottomBox}>
                <Image source={require("../../../assets/img/soutenir/arrow.png")} style={styles.arrow} resizeMethod="contain"/>
                <Pressable style={styles.button} onPress={() => handleUrl()}>
                    <Text style={styles.textButton}>
                        Faire un Don
                    </Text>
                </Pressable>
                <Text style={[styles.text, {alignSelf: 'center', width: 'auto'}]}>
                    Même 1€ ça fait plaisir
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#520D2F',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    text: {
        color: '#F4ECC4',
        //fontFamily: 'Futura-Bold', // ! add font
        fontWeight: "700",
        fontSize: 14,
        width: '80%'
    },
    titleImage: {
        width: "100%",
        height: 50,
    },
    image: {
        width: '80%',
        height: 150,
    },
    bottomBox: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        width: '80%',
        height: 75,
    },
    button: {
        width: "auto",
        height: "auto",
        borderWidth: 3,
        borderColor: '#F4ECC4',
        backgroundColor: '#FFD226',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        paddingHorizontal: 30,
        paddingVertical: 15
    },
    textButton: {
        color: '#520D2F',
        //fontFamily: 'Futura-Bold', // ! add font
        fontWeight: "700",
        fontSize: 28,

    }
});