// * import libraries
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from "react";
import PagerView from 'react-native-pager-view';
import {Alert, Image, StyleSheet, View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

// * import components
import CrossBack from "../../components/crossBack";


//Setting the data for all wallpapers
const data = [require('../../../assets/img/backgrounds/bg1.png'), require('../../../assets/img/backgrounds/bg2.png')];

export default function Backgrounds(props) {
    const [indexBG, setIndexBG] = useState(null);

    const saveBG = async (value) => {
        try {
            const index = value.nativeEvent.position;

            await AsyncStorage.setItem('bg', index.toString());
        } catch (e) {
            Alert.alert('🍠 Oups une erreur est survenue !', "", [{
                text: "C'est noté",
                style: 'cancel',
            }]);
        }
    };

    const getBGIndex = async () => {
        try{
            const value = await AsyncStorage.getItem('bg');
            if (value === null) {
                setIndexBG(0);
            } else {
                setIndexBG(parseInt(value));
            }
        } catch (e) {
            setIndexBG(parseInt(0));
        }
    };

    useEffect( () => {
        (async () => {
            await getBGIndex();
        })();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <CrossBack/>
            <Image source={require("../../../assets/img/backgrounds/backgrounds.png")} style={styles.titleImage}/>
            {indexBG === null? null: (
                <PagerView style={styles.pager} initialPage={indexBG} pageMargin={80} onPageSelected={(e) => saveBG(e)}>
                    {data.map((item, index) => (
                        <View style={styles.page} key={index}>
                            <Image style={styles.page} source={item}/>
                        </View>
                    ))}
                </PagerView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#520D2F',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    pager: {
        height: '75%',
        width: '75%'
    },
    titleImage: {
        width: '100%',
        height: 50,
        marginBottom: 40
    },
    page: {
        width: '100%',
        height: '100%'
    }
});