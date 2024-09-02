// * import libraries
import {Audio} from 'expo-av';
import {Link} from 'expo-router';
import Lottie from 'lottie-react-native';
import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Animated, Easing, Image, ImageBackground, Pressable, StyleSheet, View} from 'react-native';


export default function App() {
    const [sound, setSound] = useState();
    const [pathBG, setPathBG] = useState(null);
    const [play, setPlay] = useState(false);
    const [animedLogo, setAnimedLogo] = useState(0);
    const [animation, setAnimation] = useState('flex');

    // * function
    const getBGIndex = async () => {
        const value = await AsyncStorage.getItem('bg');
        if (value === "0") {
            setPathBG(require('../assets/img/home/bg1.gif'));
        } else {
            setPathBG(require('../assets/img/home/bg2.png'));
        }
    };

    //Display loading animation
    setTimeout(() => {
        setAnimation('none');
    }, 4040);

    useEffect(() => {
        (async () => {
            await getBGIndex();
        })();
    }, []);

    /*    async function initSound() {
            console.log('Loading Sound');
            const {sound} = await Audio.Sound().createAsync({uri: 'https://listen.radioking.com/radio/285742/stream/472981'}); // https://play.radioking.io/radio-jockey/472981 or https://listen.radioking.com/radio/285742/stream/472981
            setSound(sound);
            console.log('Sound Loaded');
        }

        async function playSound() {
            console.log('Playing Sound');
            await sound.playAsync();

            setPlay(true);
        }

        async function pauseSound() {
            console.log('Pausing Sound');
            await sound.pauseAsync();

            setPlay(false);
        }

        useEffect( () => {
            (async () => {
                console.log('Init Sound');
                await initSound();
            })();
        }, []);

        useEffect(() => {
            return sound
                ? () => {
                    console.log('Unloading Sound');
                    sound.unloadAsync();
                }
                : undefined;
        }, [sound]);*/

    // Easter Egg
    // Create a new Animated.Value
    const rotateValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(rotateValue, {
            toValue: 1,
            duration: 15000,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    ).start();
    // Create the interpolated rotation string
    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Lottie resizeMode="contain" source={require('../assets/animation.json')} autoPlay loop style={[styles.lottie, {display: animation}]}/>
            <ImageBackground source={pathBG} resizeMode="cover" style={styles.bg}>
            <View style={styles.topBox}>
                {animedLogo > 15 ? (
                    <Animated.Image
                        source={require('../assets/img/home/logo.png')}
                        style={[
                            styles.logo,
                            {
                                transform: [{rotate}],
                            },
                        ]}
                    />
                ) : (
                    <Pressable style={styles.logo} onPress={() => setAnimedLogo(animedLogo + 1)}>
                        <Image source={require('../assets/img/home/logo.png')} style={styles.logo}/>
                    </Pressable>
                )}

                <Link href="/pages/menu" asChild>
                    <Pressable style={styles.imageMenu}>
                        <Image style={styles.imageMenu} source={require('../assets/img/home/menu.png')} resizeMode='contain'/>
                    </Pressable>
                </Link>
            </View>
                {/*                {play ? (
                    <Button title="Pause Sound" onPress={pauseSound}/>
                ): (
                    <Button title="Play Sound" onPress={playSound}/>
                )}*/}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    lottie: {
        position: 'absolute',
        width: '120%',
        height: '100%',
        zIndex: 2,
    },
    bg: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        zIndex: -1
    },
    topBox: {
        width: '100%',
        flexDirection: 'row',
        height: 130,
        justifyContent: 'space-between',
        alignItems: 'center',
        position:'relative',
        top: '5%'
    },
    logo: {
        width: 130,
        height: 130,
        left: '5%'
    },
    imageMenu: {
        width: 80,
        height: 80,
        left: '5%',
        zIndex: 1
    }
});