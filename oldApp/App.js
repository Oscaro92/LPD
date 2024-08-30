import React, {useCallback, useState, useEffect} from 'react';
import {
    View,
    StatusBar,
    Alert,
    StyleSheet,
    Text,
    Pressable,
    Image,
    Dimensions,
    Linking,
    ActivityIndicator,
    FlatList,
    Vibration,
    Animated,
    Easing
} from 'react-native';
import MusicPlayer from './screens/MusicPlayer';
import LittlePlayer from './screens/LittlePlayer'
import {NavigationContainer} from '@react-navigation/native';
import {
    createStackNavigator,
    TransitionPresets,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {ScrollView} from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import moment from "moment";
import * as fr from 'moment/locale/fr'; //! Do Not Delete this line, is for local date
import Clipboard from '@react-native-community/clipboard';
import normalize from 'react-native-normalize';
import TrackPlayer, {
    Capability,
    State,
    usePlaybackState,
} from 'react-native-track-player';
import GestureRecognizer from 'react-native-swipe-gestures';
import MarqueeText from 'react-native-marquee';
import {
    BarIndicator,
} from 'react-native-indicators';
import store from 'react-native-simple-store';
import Lottie from 'lottie-react-native';

const {width, height} = Dimensions.get('window');
export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH);
var RNFS = require('react-native-fs');
var path = RNFS.DocumentDirectoryPath + '/test.txt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Notification from './screens/Notification';
import {trigger} from "react-native-haptic-feedback";

//*Setting up url
const url = "https://www.instagram.com/lapatatedouce_radio/?hl=fr"
const url2 = "https://apps.apple.com/fr/app/la-patate-douce/id1542981247"
const url3 = "https://www.pigallestud.io/"
const mxtp1 = "https://soundcloud.com/lapatatedouce/selection-by-oracle-sisters?in=lapatatedouce/sets/la-patate-douce-selections"
const mxtp2 = "https://soundcloud.com/lapatatedouce/selection-by-corine?in=lapatatedouce/sets/la-patate-douce-selections"
const mxtp3 = "https://soundcloud.com/lapatatedouce/selection-by-tonique-man?in=lapatatedouce/sets/la-patate-douce-selections"
const mxtp4 = "https://soundcloud.com/lapatatedouce/mix-by-maryolo-la-patate-douce-mixtape?in=lapatatedouce/sets/la-patate-douce-mixtapes"
const mxtp5 = "https://soundcloud.com/lapatatedouce/mix-from-nofraje-la-patate-douce-mixtape?in=lapatatedouce/sets/la-patate-douce-mixtapes"
const mxtp6 = "https://soundcloud.com/lapatatedouce/mix-by-ferdix-n2-la-patate-douce-mixtape?in=lapatatedouce/sets/la-patate-douce-mixtapes"
const mxtp7 = "https://soundcloud.com/lapatatedouce/mix-from-emilien-la-patate-douce-mixtape?in=lapatatedouce/sets/la-patate-douce-mixtapes"
const mxtp8 = "https://m.soundcloud.com/lapatatedouce/spooners-selection"
const mxtp9 = "https://soundcloud.com/lapatatedouce/selection-by-antonin"
const mxtp10 = "https://soundcloud.com/lapatatedouce/selection-by-bomel"
const mxtp11 = "https://soundcloud.com/lapatatedouce/daymax"
const mxtp12 = "https://soundcloud.com/lapatatedouce/selection-by-heritage-listed-1"
const mxtp13 = "https://soundcloud.com/lapatatedouce/selection-by-lord"
const mxtp14 = "https://soundcloud.com/lapatatedouce/selection-lucien-kimono"
const mxtp15 = "https://soundcloud.com/lapatatedouce/selection-by-macadam-crocodile"
const mxtp16 = "https://soundcloud.com/lapatatedouce/selection-by-maxime-nerguisian"
const mxtp17 = "https://soundcloud.com/lapatatedouce/selection-by-mi-man"
const mxtp18 = "https://soundcloud.com/lapatatedouce/selection-motel-club"
const mxtp19 = "https://soundcloud.com/lapatatedouce/selection-by-sauce-blanche"
const mxtp20 = "https://soundcloud.com/lapatatedouce/selection-by-palomina"
const soundc = "https://soundcloud.com/lapatatedouce"
const selec1 = "https://soundcloud.com/lapatatedouce/selection-by-mi-man?in=lapatatedouce/sets/la-patate-douce-selections"
const selec2 = "https://soundcloud.com/lapatatedouce/selection-by-sauce-blanche?in=lapatatedouce/sets/la-patate-douce-selections"
const selec3 = "https://soundcloud.com/lapatatedouce/selection-motel-club?in=lapatatedouce/sets/la-patate-douce-selections"
const support = "https://lydia-app.com/pots?id=75606-soutien-pour-la"

const Spacer = ({ size }) => <View style={{ height: size }} />;

//* Setting up React Native Track Player
const setupPlayer = async () => {
    try {
        await TrackPlayer.setupPlayer({
            waitForBuffer: false
        });
        await TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
                Capability.SeekTo
            ],
        });
        await TrackPlayer.add(songs)
        await TrackPlayer.seekTo(10);
    } catch (error) {
        console.log(error);
    }
};

var Sound = require('react-native-sound');

//Home Screen
function Home({navigation, props}) {
    const [isHiding, setIsHiding] = useState('flex');
    const [buttonIsHidding, setButtonIsHidding] = useState('none');
    const [buttonIsHidding2, setButtonIsHidding2] = useState('flex');
    const [pathBg, setPathBg] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [titleNow, setTitleNow] = useState();
    const [coverAlbum, setCoverAlbum] = useState();
    const [artistNow, setArtistNow] = useState();
    const [startedAt, setStartedAt] = useState();
    const [endAt, setEndAt] = useState();
    const [duration, setDuration] = useState();
    const [date, setDate] = useState(new Date());
    const [permissions, setPermissions] = useState({});
    const [animedLogo, setAnimedLogo] = useState(0);

    // Enable Notification Local (not one signal)
    useEffect(() => {
        Notification.schduleNotification(date)
    });
    //Display animation opening
    setTimeout(() => {
        setIsHiding('none')
        setButtonIsHidding('flex')
    }, 4000);

    //Display loading aninmation
    setTimeout(() => {
        setButtonIsHidding2('none')
    }, 4040);

    //Player Initialisation
    useEffect(() => {
        setupPlayer()
    }, []);

    //URL for api call
    const baseUrl = 'https://api.radioking.io/widget/radio/radio-jockey/track/current';

    //Call API for tracking the current song
    function CallApi(setTitleNow, titleNow, setCoverAlbum, setArtistNow, artistNow, trackArtist, setStartedAt, startedAt, setEndAt, endAt, setDuration, duration) {
        axios(
            baseUrl,
        ).then((response) => {
            setTitleNow(response.data.title)
            setArtistNow(response.data.artist)
            setCoverAlbum(response.data.cover)
            setStartedAt(response.data.started_at)
            setEndAt(response.data.end_at)
            setDuration(response.data.duration)
        });
        return (
            songs = [{
                id: 0,
                title: titleNow,
                artist: artistNow,
                start: startedAt,
                end: endAt,
                duration: duration,
                artwork: coverAlbum,
                url: "https://api.radioking.io/radio/285742/listen.m3u",
            },]
        )
    }


    CallApi(setTitleNow, titleNow, setCoverAlbum, setArtistNow, artistNow, trackArtist, setStartedAt, startedAt, setEndAt, endAt, setDuration, duration)
    //Set The background with cache
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@IDBack')
            if (value === "0") {
                setPathBg(require('./assets/img/bg1.gif'))
            } else if (value === "1") {
                setPathBg(require('./assets/img/bg4M.png'))
            } else if (value === "2") {
                setPathBg(require('./assets/img/bg4Off.png'))
            } else if (value === "3") {
                setPathBg(require('./assets/img/bg2Final.gif'))
            } else {
                setPathBg(require('./assets/img/bg1.gif'))
            }
        } catch (e) {
        }
    }

    //Set the background every 1 second
    useEffect(() => {
        const interval = setInterval(() => {
            getData()
        }, 1000);
        return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

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

//Display the home screen
    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#520D2F'}}>
            <StatusBar barStyle="light-content"/>
            <Image source={pathBg} style={{width: width, height: height, zIndex: 0}}/>
            {/* <Lottie resizeMode="cover" source={require('./assets/animation.json')} autoPlay loop
                    style={{zIndex: 40, display: buttonIsHidding2}}/> */}

            <View style={{ width: '100%', position: 'absolute', paddingTop:'30%', paddingHorizontal:'5%', flexDirection: 'row', height:130, justifyContent:'space-between', alignItems:'center'}}>
                {animedLogo > 15 ? (
                    <Animated.Image
                        source={require('./assets/img/logo.png')}
                        style={[
                        style.logo,
                        {
                            transform: [{ rotate }],
                        },
                        ]}
                    />
                ):(
                    <Pressable style={style.logo} onPress={() => setAnimedLogo(animedLogo + 1)}>
                        <Image source={require('./assets/img/logo.png')} style={{width: normalize(130), height: normalize(130)}}/>
                    </Pressable>
                )}                
                <Pressable style={style.menuButton} onPress={() => navigation.navigate('MenuTop')}>
                    <Image style={{width: 80, height: 80, zIndex: 1}}
                        source={require('./assets/img/menu.png')}/>
                </Pressable>
            </View>

            <Pressable style={style.morebutton} 
                        onPress={() => navigation.navigate('DetailSong')}
                        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}/>




            <View style={[style.littlePlayer]}>


                {/* <ActivityIndicator size="large" color="#F67918"
                                   style={{
                                       position: 'absolute', display: isHiding,
                                       top: normalize(36), left: normalize(30), zIndex: 30
                                   }}>

                </ActivityIndicator> */}

                <GestureRecognizer onSwipeUp={() => navigation.navigate('BigPlayer')}style={style.overOpen}>

                    <Pressable  onPress={() => navigation.navigate('BigPlayer')}>
                        <Image
                            style={style.openBigPlayer}
                            source={require('./assets/img/closeplayer.png')}
                        />
                    </Pressable>

                </GestureRecognizer>


                <View style={style.leftorange}>
                    <View style={style.roundred}>
                        <PlayButton/>
                    </View>
                </View>
                <View style={style.rightred}>
                    <View style={style.contentWrapperLP}>
                        <LittlePlayer navigation={navigation}/>
                        <View>
                            <Image style={style.morebuttonplus} source={require("./assets/img/more.png")}/>
                        </View>  
                    </View>
                </View>
            </View>
        </View>
    );
}

//Detail of the current song
function DetailSong({navigation}) {
    const [trackArtist, setTrackArtist] = useState();
    const [titleNow, setTitleNow] = useState();
    const [coverAlbum, setCoverAlbum] = useState();
    const [artistNow, setArtistNow] = useState();
    const [startedAt, setStartedAt] = useState();
    const [endAt, setEndAt] = useState();
    const [duration, setDuration] = useState();

    //Testing the date to match
    function testDate() {
        let date1 = new Date().getMilliseconds
        let date2 = new Date().getMilliseconds
        return (
            durationTime = date2 - date1
        )
    }

    //API call to get current
    const baseUrl = 'https://api.radioking.io/widget/radio/radio-jockey/track/current';

    function CallApi(setTitleNow, titleNow, setCoverAlbum, setArtistNow, artistNow, trackArtist, setStartedAt, startedAt, setEndAt, endAt, setDuration, duration) {
        //Call API for tracking the current song
        axios(
            baseUrl,
        ).then((response) => {
            setTitleNow(response.data.title)
            setArtistNow(response.data.artist)
            setCoverAlbum(response.data.cover)
            setStartedAt(response.data.started_at)
            setEndAt(response.data.end_at)
            setDuration(response.data.duration)
            testDate()
        });
        return (
            songs2 = [
                {
                    id: 0,
                    title: titleNow,
                    artist: artistNow,
                    start: startedAt,
                    end: endAt,
                    duration: duration,
                    cover: '../assets/img/img1.jpg',
                    url: "https://api.radioking.io/radio/285742/listen.m3u",
                    spotify: "https://open.spotify.com/search/" + titleNow + "+" + artistNow,
                    appleMusic: "https://music.apple.com/us/search?term=" + titleNow + " " + artistNow,
                    youtube: "https://www.youtube.com/results?search_query=" + titleNow + "+" + artistNow,
                    soundcloud: "https://soundcloud.com/search?q=" + titleNow + "+" + artistNow,
                    bandcamp: "https://bandcamp.com/search?q=" + titleNow + "+" + artistNow,
                    deezer: "https://www.deezer.com/search/" + titleNow + "+" + artistNow,
                },
            ]
        )
    }


    CallApi(setTitleNow, titleNow, setCoverAlbum, setArtistNow, artistNow, trackArtist, setStartedAt, startedAt, setEndAt, endAt, setDuration, duration)

    //List of all links for platforms
    const spotifypress = useCallback(async () => {
        const supported = await Linking.canOpenURL(songs2[0].spotify);
        if (supported) {
            await Linking.openURL(songs2[0].spotify);
        } else {
            Alert.alert(`Don't know how to open this URL: ${songs2[0].spotify}`);
        }
    }, [songs[0].spotify]);

    const applePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(songs2[0].appleMusic);
        if (supported) {
            await Linking.openURL(songs2[0].appleMusic);
        } else {
            Alert.alert(`Don't know how to open this URL: ${songs2[0].appleMusic}`);
        }
    }, [songs[0].appleMusic]);

    const youtubepress = useCallback(async () => {
        const supported = await Linking.canOpenURL(songs2[0].youtube);
        if (supported) {
            await Linking.openURL(songs2[0].youtube);
        } else {
            Alert.alert(`Don't know how to open this URL: ${songs2[0].youtube}`);
        }
    }, [songs[0].youtube]);

    const soundcloudpress = useCallback(async () => {
        const supported = await Linking.canOpenURL(songs2[0].soundcloud);

        if (supported) {
            await Linking.openURL(songs2[0].soundcloud);
        } else {
            Alert.alert(`Don't know how to open this URL: ${songs2[0].soundcloud}`);
        }
    }, [songs[0].soundcloud]);

    const bandcamppress = useCallback(async () => {
        const supported = await Linking.canOpenURL(songs2[0].bandcamp);

        if (supported) {
            await Linking.openURL(songs2[0].bandcamp);
        } else {
            Alert.alert(`Don't know how to open this URL: ${songs2[0].bandcamp}`);
        }
    }, [songs[0].bandcamp]);

    const deezerpress = useCallback(async () => {
        const supported = await Linking.canOpenURL(songs2[0].deezer);
        if (supported) {
            await Linking.openURL(songs2[0].deezer);
        } else {
            Alert.alert(`Don't know how to open this URL: ${songs2[0].deezer}`);
        }
    }, [songs[0].deezer]);

    const copyToClipboard = () => {
        Clipboard.setString(titleNow + " " + artistNow);
        Alert.alert(
            "Titre copié ! 🔥",
            "Il te reste qu’à l’envoyer à ton meilleur ami ou à ton pire ennemi",
            [
                {text: "J'ai compris"}
            ]
        )
    };

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#282D3E',
            height: height,
            width: width
        }}>
            <View style={{width: '100%', height: 97, borderRadius: 34, backgroundColor: '#86888f'}}>
                <Image source={{uri: coverAlbum}} style={{
                    height: 72,
                    width: 72,
                    borderRadius: 17,
                    left: 45,
                    top: 12,
                    position: 'absolute',
                    display: 'flex',
                    zIndex: 10
                }}/>
                <View style={{position: 'absolute', marginLeft: 120, top: 18}}>
                    <MarqueeText speed={0.1} marqueeOnStart={true} delay={1000} loop={true}
                                 style={[style.songContent, style.songTitle]}>
                        {titleNow}
                    </MarqueeText>
                    <MarqueeText speed={0.1} marqueeOnStart={true} delay={1000} loop={true}
                                 style={[style.songContent, style.songArtist]}>
                        {artistNow}
                    </MarqueeText>
                </View>
                <Text style={{fontFamily: "BarutaBlack", color: '#F4ECC4', marginLeft: normalize(250), top: 68}}
                      onPress={() => copyToClipboard()}>COPIER LE TITRE</Text>
            </View>
            <View style={{top: 40}}>
                <Pressable onPress={spotifypress}>
                    <Image style={{width: normalize(303), height: normalize(45), top: 3}}
                           source={require('./assets/img/more/spotify.png')}></Image>
                </Pressable>
                <Pressable onPress={applePress}>
                    <Image style={{width: normalize(303), height: normalize(50), top: 9}}
                           source={require('./assets/img/more/AppleMusic.png')}></Image>
                </Pressable>
                <Pressable onPress={youtubepress}>
                    <Image style={{width: normalize(303), height: normalize(50), top: 9}}
                           source={require('./assets/img/more/Youtube.png')}></Image>
                </Pressable>
                <Pressable onPress={soundcloudpress}>
                    <Image style={{width: normalize(303), height: normalize(47), top: 9}}
                           source={require('./assets/img/more/Soundcloud.png')}></Image>
                </Pressable>
                <Pressable onPress={deezerpress}>
                    <Image style={{width: normalize(303), height: normalize(47), top: 9}}
                           source={require('./assets/img/more/Deezer.png')}></Image>
                </Pressable>
                <Pressable onPress={bandcamppress}>
                    <Image style={{width: normalize(295), height: normalize(41), top: 9, left: '3%'}}
                           source={require('./assets/img/more/bandcamp.png')}></Image>
                </Pressable>
            </View>
        </View>
    );
}

//The button on all the screen
function PlayButton({props}) {
    const [shouldShow, setShouldShow] = useState(false);
    const playBackState = usePlaybackState();
    const [stating, setStating] = useState('');
    const [isSpinner, setIsSpinner] = useState(false);

    function isPlayingActive() {
        if (stating == 'paused') {
            setShouldShow(true)
        } else if (stating == 'idle') {
            setShouldShow(true)
        } else if (stating == 'playing') {
            setShouldShow(true)
        } else {
            setShouldShow(true)
        }
    }

    useEffect(() => {
        setupPlayer()
        togglePlayBack(playBackState)

        isPlayingActive()
    }, []);


    //On press on play
    function playfunc() {
        togglePlayBack(playBackState)
        setStating(playBackState)
        const options = {
            enableVibrateFallback: true,
        };

        trigger("impactLight", options);
    }

    //On press on pause
    function pausefunc() {
        togglePlayBack(playBackState)
        setStating(playBackState)
        const options = {
            enableVibrateFallback: true,
        };

        trigger("impactLight", options);
    }

    //Function get current state of the player
    const togglePlayBack = async playBackState => {
        setIsSpinner(playBackState === State.Paused)

        setTimeout(() => {
            setIsSpinner(false)
        }, 2000)

        const currentTrack = await TrackPlayer.getCurrentTrack();
        setStating(playBackState)
        //If currrent track is not null do
        if (currentTrack != null) {
            if (playBackState === State.Paused) { //If player state is to pause the player have to play
                await TrackPlayer.play();
                setShouldShow(false)
                setStating(playBackState)
            } else if (playBackState === State.Playing) {   //If player state is play the player have to pause
                await TrackPlayer.pause();
                setShouldShow(true)
            } else if (playBackState === "idle") { // If the player did not finish to load the player loading
                isPlayingActive()
            } else if (playBackState === "ready") { //If the player is ready display play button
                await TrackPlayer.play();
                setShouldShow(false)
            }
        }
    };
    return (
        <View>
            <Pressable onPress={() => togglePlayBack(playBackState)}>
                {shouldShow ? (
                        <Pressable onPress={() => playfunc() && TrackPlayer.play()}>
                            <Image source={require("./assets/img/playing.png")} style={style.playButtonMain}></Image>
                        </Pressable>
                    ) :
                    isSpinner ?
                        <ActivityIndicator color={'white'} size={'small'} style={style.playButtonMain}/>
                        :
                        <Pressable onPress={() => pausefunc()}>
                            <View>
                                <Image source={require("./assets/img/pausing.png")}
                                       style={style.pauseButtonMain}></Image>
                            </View>
                        </Pressable>
                }
            </Pressable>
        </View>
    )
}

//Detail of the liked songs
function DetailSongLike({route}) {
    const [titleNow, setTitleNow] = useState();
    const [coverAlbum, setCoverAlbum] = useState();
    const [artistNow, setArtistNow] = useState();
    const {title, artist, coverUrl} = route.params;

    useEffect(() => {
        setTitleNow(title)
        setArtistNow(artist)
        setCoverAlbum(coverUrl)
    }, [])

    const spotifypress = useCallback(async () => {
        const supported = await Linking.canOpenURL("https://open.spotify.com/search/" + titleNow + " " + artistNow);

        if (supported) {
            await Linking.openURL("https://open.spotify.com/search/" + titleNow + " " + artistNow);
        } else {
            Alert.alert(`Don't know how to open this URL: ${"https://open.spotify.com/search/" + titleNow + " " + artistNow}`);
        }
    });

    const applePress = useCallback(async () => {
        const supported = await Linking.canOpenURL("music://www.music.apple.com/fr/search?term=" + titleNow + " " + artistNow);
        if (supported) {
            await Linking.openURL("music://www.music.apple.com/fr/search?term=" + titleNow + " " + artistNow);
        } else {
            Alert.alert(`Don't know how to open this URL: ${"music://www.music.apple.com/fr/search?term=" + titleNow + " " + artistNow}`);
        }
    });

    const youtubepress = useCallback(async () => {
        const supported = await Linking.canOpenURL("https://www.youtube.com/results?search_query=" + titleNow + "+" + artistNow);
        if (supported) {
            await Linking.openURL("https://www.youtube.com/results?search_query=" + titleNow + "+" + artistNow);
        } else {
            Alert.alert(`Don't know how to open this URL: ${"https://www.youtube.com/results?search_query=" + titleNow + "+" + artistNow}`);
        }
    });

    const soundcloudpress = useCallback(async () => {
        const supported = await Linking.canOpenURL("soundcloud://www.soundcloud.com/search?q=" + titleNow + "+" + artistNow);
        if (supported) {
            await Linking.openURL("soundcloud://www.soundcloud.com/search?q=" + titleNow + "+" + artistNow);
        } else {
            Alert.alert(`Don't know how to open this URL: ${"soundcloud://www.soundcloud.com/search?q=" + titleNow + "+" + artistNow}`);
        }
    });

    const bandcamppress = useCallback(async () => {
        const supported = await Linking.canOpenURL("bandcamp://www.bandcamp.com/search?q=" + titleNow + "+" + artistNow);
        if (supported) {
            await Linking.openURL("bandcamp://www.bandcamp.com/search?q=" + titleNow + "+" + artistNow);
        } else {
            Alert.alert(`Don't know how to open this URL: ${"bandcamp://www.bandcamp.com/search?q=" + titleNow + "+" + artistNow}`);
        }
    });

    const deezerpress = useCallback(async () => {
        const supported = await Linking.canOpenURL("deezer://www.deezer.com/search/" + titleNow + " " + artistNow);
        if (supported) {
            await Linking.openURL("deezer://www.deezer.com/search/" + titleNow + " " + artistNow);
        } else {
            Alert.alert(`Don't know how to open this URL: ${"deezer://www.deezer.com/search/" + titleNow + " " + artistNow}`);
        }
    });

    const copyToClipboard = () => {
        Clipboard.setString(titleNow + " " + artistNow);
        Alert.alert(
            "Titre copié ! 🔥",
            "Il te reste qu’à l’envoyer à ton meilleur ami ou à ton pire ennemie    ",
            [
                {
                    text: "J'ai compris",
                }
            ]
        )
    };
//Display the detail of the song
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#282D3E',
            height: height,
            width: width
        }}>
            <View style={{width: '100%', height: 97, borderRadius: 34, backgroundColor: '#86888f'}}>
                <Image source={{uri: coverAlbum}} style={{
                    height: 72,
                    width: 72,
                    borderRadius: 17,
                    left: 45,
                    top: 12,
                    position: 'absolute',
                    display: 'flex',
                    zIndex: 10
                }}/>
                <View style={{position: 'absolute', marginLeft: 120, top: 18}}>
                    <MarqueeText speed={0.1} marqueeOnStart={true} delay={1000} loop={true}
                                 style={[style.songContent, style.songTitle]}>
                        {titleNow}
                    </MarqueeText>
                    <MarqueeText speed={0.1} marqueeOnStart={true} delay={1000} loop={true}
                                 style={[style.songContent, style.songArtist]}>
                        {artistNow}
                    </MarqueeText>
                </View>
                <Text style={{fontFamily: "BarutaBlack", color: '#F4ECC4', marginLeft: normalize(250), top: 68}}
                      onPress={() => copyToClipboard()}>COPIER LE TITRE</Text>
            </View>
            <View style={{top: 40}}>
                <Pressable onPress={spotifypress}>
                    <Image style={{width: normalize(303), height: normalize(45), top: 3}}
                           source={require('./assets/img/more/spotify.png')}></Image>
                </Pressable>
                <Pressable onPress={applePress}>
                    <Image style={{width: normalize(303), height: normalize(50), top: 9}}
                           source={require('./assets/img/more/AppleMusic.png')}></Image>
                </Pressable>
                <Pressable onPress={youtubepress}>
                    <Image style={{width: normalize(303), height: normalize(50), top: 9}}
                           source={require('./assets/img/more/Youtube.png')}></Image>
                </Pressable>
                <Pressable onPress={soundcloudpress}>
                    <Image style={{width: normalize(303), height: normalize(47), top: 9}}
                           source={require('./assets/img/more/Soundcloud.png')}></Image>
                </Pressable>
                <Pressable onPress={deezerpress}>
                    <Image style={{width: normalize(303), height: normalize(47), top: 9}}
                           source={require('./assets/img/more/Deezer.png')}></Image>
                </Pressable>
                <Pressable onPress={bandcamppress}>
                    <Image style={{width: normalize(295), height: normalize(41), top: 9, left: '3%'}}
                           source={require('./assets/img/more/bandcamp.png')}></Image>
                </Pressable>
            </View>
        </View>
    );
}

//The big player on slide up. //? This component is only for navigation
function BigPlayer({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={style.container}>
                <StatusBar barStyle="light-content"/>
                <MusicPlayer navigation={navigation}/>
            </View>
        </View>
    );
}

//The main page of the navigation menu
function MainPage({navigation}) {
    const handlePress = useCallback(async () => {
        //Setting up the redirections links for menu items
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    const handlePress2 = useCallback(async () => {
        const supported = await Linking.canOpenURL(url2);
        if (supported) {
            await Linking.openURL(url2);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url2}`);
        }
    }, [url2]);

    const handlePress3 = useCallback(async () => {
        const supported = await Linking.canOpenURL(url3);
        if (supported) {
            await Linking.openURL(url3);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url3}`);
        }
    }, [url]);

    return (
        <View style={{
            flex: 1, alignItems: 'center',
            backgroundColor: '#520D2F', width: "100%",
        }}>
            <StatusBar barStyle="light-content"/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{marginTop: 100, width: '100%', flexDirection: 'column', alignItems: 'center'}}>
                    <Pressable
                        style={{width: '90%'}}
                        onPress={() => navigation.navigate('Backgrounds')}>
                        <Image style={{width: '100%', height: 129}}
                               resizeMode={'contain'}
                               source={require("./assets/img/menu/background.png")}></Image>
                    </Pressable>
                    <Spacer size={10}/>
                    <Pressable style={{width: '90%'}}
                               onPress={() => navigation.navigate('Jingles')}>
                        <Image style={{width: '100%', height: 129}}
                               resizeMode={'contain'}
                               source={require("./assets/img/menu/jingle.png")}></Image>
                    </Pressable>
                    <Spacer size={10}/>
                    <Pressable
                        style={{width: '90%'}}
                        onPress={() => navigation.navigate('Concept')}>
                        <Image style={{width: '100%', height: 129}}
                               resizeMode={'contain'}
                               source={require("./assets/img/menu/concept.png")}></Image>
                    </Pressable>
                    <Spacer size={10}/>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
                        <Pressable style={{width: '50%', height: '100%'}} onPress={() => navigation.navigate('Mixtapes')}>
                            <Image style={{width: '100%', height: 135}}
                                resizeMode={'contain'}
                                source={require("./assets/img/menu/selections.png")}></Image>
                        </Pressable>
                        <Pressable style={{width: '50%', height: '100%'}} onPress={() => navigation.navigate('Selections')}>
                            <Image style={{width: '100%', height: 135}}
                                resizeMode={'contain'}
                                source={require("./assets/img/menu/playlists.png")}></Image>
                        </Pressable>
                    </View>
                    <Spacer size={10}/>
                    <Pressable style={{width: '90%'}} onPress={() => navigation.navigate('Goodies')}>
                        <Image style={{width: '100%', height: 129}}
                               resizeMode={'contain'}
                               source={require("./assets/img/menu/goodies.png")}></Image>
                    </Pressable>
                    <Spacer size={10}/>
                    <Pressable style={{width: '90%'}} onPress={() => navigation.navigate('Support')}>
                        <Image style={{width: '100%', alignSelf: 'center', height: 129}}
                               resizeMode={'contain'}
                               source={require("./assets/img/menu/soutenir.png")}></Image>
                    </Pressable>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '90%'}}>
                        <Pressable style={{width: '50%'}} onPress={handlePress2}>
                            <Image style={{width: '100%', height: 135}}
                                resizeMode={'contain'}
                                source={require("./assets/img/menu/rating.png")}></Image>
                        </Pressable>
                        <Pressable style={{width: '50%'}} onPress={handlePress}>
                            <Image style={{width: '100%', height: 135}}
                                resizeMode={'contain'}
                                source={require("./assets/img/menu/instagram.png")}></Image>
                        </Pressable>
                    </View>
                    <Text style={{
                        color: '#F4ECC4',
                        fontFamily: 'Futura-Bold',
                        fontWeight: "700",
                        fontSize: 14
                    }}>Made with 🍠</Text>
                    <Pressable onPress={handlePress3}>
                        <Text style={{
                            color: '#F4ECC4',
                            fontFamily: 'Futura-Bold',
                            fontWeight: "700",
                            fontSize: 14,
                            textDecorationLine: 'underline'
                        }}>by Le Studio Pigalle</Text>
                    </Pressable>
                    <Spacer size={10}/>
                </View>
            </ScrollView>
        </View>
    );
}

//The background page
function Backgrounds({navigation}) {
    const [shouldShow, setShouldShow] = useState(true);
    const [currentSetWallPaperIndex, setCurrentWallPaperIndex] = useState(null);
    const [currentShowingWallPaperIndex, setCurrentShowingWallPaperIndex] = useState(0);

    const setWallpaperGetter = async () => {
        const value = await AsyncStorage.getItem('@IDBack')
        setCurrentWallPaperIndex(value);
    }

    useEffect(async () => {
        await setWallpaperGetter()
    }, [])

    //Setting the data for all wallpapers
    const data = [
        {
            id: 1,
            name: "L'originale",
            detail: 'Ceci est le décor signature de la radio, imaginé une après-midi ensoleillée de confinement. Sur le tourne-disques se jouait  "On the Radio" by Donna Summer.  ',
            url: require('./assets/img/bg1.png'),
        },
        {
            id: 2,
            name: "Le Summer",
            detail: 'Ceci est le décor signature de la radio, imaginé une après-midi ensoleillée de confinement. Sur le tourne-disques se jouait  "On the Radio" by Donna Summer.  ',
            url: require('./assets/img/bg4.png'),

        },

    ];

    useEffect(() => {
        Alert.alert('💡 Tuto Background', "Pour changer de background tu n'as qu'à swiper et revenir à l'écran d'accueil", [{
            text: "J'ai VRAIMENT compris",
            style: 'cancel',
        },
            {
                text: "J'ai compris",
                style: 'ok',
            },
        ]);
    }, []);

//Setting the wallpaper item
    const renderItem = ({item, index}) => {

        return (
            <View
                style={{
                    borderRadius: 100,
                    alignItems: 'center',
                    justifyContent:'center',
                    height: Dimensions.get('screen').height / 1.5,
                    width: '100%'
                }}>
                <Image
                    source={item.url}
                    resizeMode={'contain'}
                    style={{ 
                        width: '100%',
                        height: '100%',
                        zIndex: 0, borderRadius: 20
                    }}/>
            </View>

        );
    };

    //Storing the wallpaper choice
    const storeData = async (index) => {
        try {
            await AsyncStorage.setItem('@IDBack', JSON.stringify(index))
            await setWallpaperGetter()
        } catch (e) {
            // saving error
        }
    }
    //Getting the wallpaper choice carousel
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#520D2F'
        }}>

            <View style={{top: '10%', alignItems: 'center', justifyContent:'center'}}>
                <Image source={require("./assets/img/BACKGROUNDS.png")}
                       style={{width: normalize(278), height: normalize(50), marginBottom: 40}}/>
{/* 
                <Image source={require("./assets/img/BACKGROUNDS.png")}
                       style={{width: normalize(278), height: normalize(50)}}/> */}

                <Carousel 
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={width}
                    itemWidth={ITEM_WIDTH}
                    itemHeight={Dimensions.get('screen').height / 1.2}
                    layout={'stack'}
                    inactiveSlideOpacity={0}
                    inactiveSlideScale={-1}
                    layoutCardOffset={18}
                    onSnapToItem={(index) => {
                        setCurrentShowingWallPaperIndex(index)
                        console.log("index on onSnapToItem", index)
                        storeData(index) && setShouldShow(!shouldShow)
                    }}
                />

            </View>
        </View>
    );
}

//The Goodies page
function Goodies({navigation}) {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
        }
    }, [url]);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#520D2F',
            height: height,
            width: width
        }}>
            <Image source={require("./assets/img/goodie/title.png")} style={{width: 201, height: 44, top: -20}}></Image>
            <Pressable onPress={handlePress}>
                <Image source={require("./assets/img/goodie/main.png")}
                       style={{width: 331.64, height: 584.54, top: 20}}></Image>
            </Pressable>
        </View>

    );
}

//The concept page
function Concept({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#520D2F'}}>
            <Image source={require("./assets/img/concept/mainLogo.png")}
                   style={{width: 326, height: 184, top: 0}}></Image>
            <Image source={require("./assets/img/concept/text.png")} style={{width: 297, height: 405, top: 20}}></Image>
        </View>
    );
}

//The support page
function Support({navigation}) {
    const handlePress = useCallback(async () => {
        const supported = await Linking.canOpenURL(support);

        if (supported) {
            await Linking.openURL(support);
        } else {
            Alert.alert(`Don't know how to open this URL: ${support}`);
        }
    }, [support]);
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#520D2F'}}>
            <Image source={require("./assets/img/support/title.png")}
                   style={{width: 300, height: 58, top: -150}}></Image>
            <Image source={require("./assets/img/support/mainVisu.png")}
                   style={{width: 292, height: 152, top: -130}}></Image>
            <View style={{width: 180, height: 160, alignItems: 'center', top: -100}}>
                <Image source={require("./assets/img/support/text.png")} style={{width: 325, height: 330}}></Image>
                <Pressable onPress={handlePress}>
                    <Image style={{width: 240, height: 101}}
                           source={require("./assets/img/support/button.png")}></Image>
                </Pressable>
            </View>
        </View>
    );
}

//The jingle page
function Jingles({navigation}) {
    const IS_ANDROID = Platform.OS === 'android';
    const [shouldShow, setShouldShow] = useState(true);

    //Set the data of all jingles
    const data = [
        {
            id: 1,
            backColor: '#FECB00',
            title: "JINGLES",
            content: require('./assets/img/jingles/1.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerBleuForYellow.png')
        },

        {
            id: 2,
            backColor: '#F67918',
            name: require('./assets/img/jingles/2.png'),
            play: require('./assets/audio/stephane.mp3'),
            duration: 11000,
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back2.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForOrange.png'),
            activityIndicatorColor: '#FFCA00'
        },
        {
            id: 3,
            backColor: '#075C87',
            duration: 10000,
            name: require('./assets/img/jingles/3.png'),
            play: require('./assets/audio/ppchampagne.mp3'),
            button: require('./assets/img/jingles/playBlue.png'),
            imageBack: require('./assets/img/jingles/back3.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerPinkForBlue.png'),
            pause: require('./assets/img/jingles/pauseForBlue.png'),
            activityIndicatorColor: '#F5A1B9'
        },
        {
            id: 4,
            backColor: '#F5A1B9',
            duration: 8000,
            name: require('./assets/img/jingles/4.png'),
            play: require('./assets/audio/victoriapostillon.mp3'),
            button: require('./assets/img/jingles/playPink.png'),
            imageBack: require('./assets/img/jingles/back4.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerRedForPink.png'),
            pause: require('./assets/img/jingles/pauseForPink.png'),
            activityIndicatorColor: '#BD1550'
        },
        {
            id: 5,
            backColor: '#BD1550',
            duration: 10000,
            name: require('./assets/img/jingles/5.png'),
            play: require('./assets/audio/pippahotpatate.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back5.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForRed.png'),
            activityIndicatorColor: '#FFCA00'
        },
        {
            id: 6,
            backColor: '#FFCA00',
            duration: 10000,
            name: require('./assets/img/jingles/6.png'),
            play: require('./assets/audio/granny.mp3'),
            button: require('./assets/img/jingles/playYellow.png'),
            imageBack: require('./assets/img/jingles/back6.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerBleuForYellow.png'),
            pause: require('./assets/img/jingles/pauseForYellow.png'),
            activityIndicatorColor: '#36579E'
        },
        {
            id: 7,
            backColor: '#F67918',
            duration: 6000,
            name: require('./assets/img/jingles/7.png'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            play: require('./assets/audio/patatedure.mp3'),
            imageBack: require('./assets/img/jingles/back2.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForOrange.png'),
            activityIndicatorColor: '#FFCA00'
        },
        {
            id: 8,
            backColor: '#075C87',
            duration: 6000,
            name: require('./assets/img/jingles/8.png'),
            play: require('./assets/audio/margotpuree.mp3'),
            button: require('./assets/img/jingles/playBlue.png'),
            imageBack: require('./assets/img/jingles/back3.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerPinkForBlue.png'),
            pause: require('./assets/img/jingles/pauseForBlue.png'),
            activityIndicatorColor: '#F5A1B9'
        },
        {
            id: 9,
            backColor: '#F5A1B9',
            duration: 10000,
            name: require('./assets/img/jingles/9.png'),
            play: require('./assets/audio/pa1955.mp3'),
            button: require('./assets/img/jingles/playPink.png'),
            imageBack: require('./assets/img/jingles/back4.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerRedForPink.png'),
            pause: require('./assets/img/jingles/pauseForPink.png'),
            activityIndicatorColor: '#BD1550'
        },
        {
            id: 10,
            backColor: '#BD1550',
            name: require('./assets/img/jingles/10.png'),
            play: require('./assets/audio/victoriacestnul.mp3'),
            duration: 6000,
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back5.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForRed.png'),
            activityIndicatorColor: '#FFCA00'
        },
        {
            id: 11,
            backColor: '#FFCA00',
            duration: 6000,
            name: require('./assets/img/jingles/11.png'),
            play: require('./assets/audio/mattochticoupdblanc.mp3'),
            button: require('./assets/img/jingles/playYellow.png'),
            imageBack: require('./assets/img/jingles/back6.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerBleuForYellow.png'),
            pause: require('./assets/img/jingles/pauseForYellow.png'),
            activityIndicatorColor: '#36579E'
        },
        {
            id: 12,
            backColor: '#F67918',
            duration: 6000,
            name: require('./assets/img/jingles/12.png'),
            play: require('./assets/audio/biobaptiste.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back2.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForOrange.png'),
            activityIndicatorColor: '#FFCA00'
        },
        {
            id: 13,
            backColor: '#075C87',
            duration: 4000,
            name: require('./assets/img/jingles/13.png'),
            play: require('./assets/audio/puree.mp3'),
            button: require('./assets/img/jingles/playBlue.png'),
            imageBack: require('./assets/img/jingles/back3.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerPinkForBlue.png'),
            pause: require('./assets/img/jingles/pauseForBlue.png'),
            activityIndicatorColor: '#F5A1B9'
        },
        {
            id: 14,
            backColor: '#F5A1B9',
            duration: 3000,
            name: require('./assets/img/jingles/14.png'),
            play: require('./assets/audio/juliettelegumineuse.mp3'),
            button: require('./assets/img/jingles/playPink.png'),
            imageBack: require('./assets/img/jingles/back4.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerRedForPink.png'),
            pause: require('./assets/img/jingles/pauseForPink.png'),
            activityIndicatorColor: '#BD1550'
        },
        {
            id: 15,
            backColor: '#BD1550',
            duration: 6000,
            name: require('./assets/img/jingles/15.png'),
            play: require('./assets/audio/ppmenthe.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back5.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForRed.png'),
            activityIndicatorColor: '#FFCA00'
        },
        {
            id: 16,
            backColor: '#FFCA00',
            duration: 4000,
            name: require('./assets/img/jingles/16.png'),
            play: require('./assets/audio/navetcharlotte.mp3'),
            button: require('./assets/img/jingles/playYellow.png'),
            imageBack: require('./assets/img/jingles/back6.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerBleuForYellow.png'),
            pause: require('./assets/img/jingles/pauseForYellow.png'),
            activityIndicatorColor: '#36579E'
        },
        {
            id: 17,
            backColor: '#F67918',
            duration: 4000,
            name: require('./assets/img/jingles/17.png'),
            play: require('./assets/audio/paulapatatedouuuce.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back2.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForOrange.png'),
            activityIndicatorColor: '#FFCA00'
        },
    ];

    function animatedStyle(index, animatedValue, carouselProps) {
        return {
            opacity: animatedValue.interpolate({
                inputRange: [-5, 1, 5],
                outputRange: [0, 2, 5],
                extrapolate: 'clamp'
            })
        }
    }


    //Render of the jingles
    const renderItem = ({item}) => {
        Sound.setCategory('Playback');
        var ding = new Sound(item.play)

        function playAnimation() {
            setShouldShow(false)
            setTimeout(() => {
                setShouldShow(true)
            }, item.duration)
        }

        return (
            <View style={{
                padding: 0,
                alignItems: 'center',
                height: '100%',
                width: width,
                backgroundColor: item.backColor
            }}>
                <Image source={item.imageBack} style={{
                    width: '100%',
                    position: 'absolute',
                    marginTop: '-200%',
                    zIndex: -1,
                }}/>
                
                    
                {/* Burger */}
                <View style={{flexDirection:'row', width:'100%', alignItems:'flex-start', paddingVertical:'15%', paddingHorizontal:'10%'}}>
                    <Pressable onPress={() => navigation.navigate('JinglesMenu')}>
                        <Image source={item.burgerMenuIcon} style={{
                            width: 42,
                            height: 42,
                            position: 'relative',
                            zIndex: 10,
                        }}></Image>
                    </Pressable>
                </View>
                {item.content !== undefined ? (
                    <Image source={item.content} style={{
                        width: '100%',
                        height: '35%',
                        resizeMode: 'contain',
                        alignItems: 'center',
                        zIndex: 12
                    }}/>
                ):null}

                <Image source={item.name} style={{marginTop:200, width: 280, height: 62}}/>
                {shouldShow ? (
                    <Pressable Pressable onPress={() => ding.play() && playAnimation()} style={{zIndex: 10}}>
                        <Image source={item.button} style={{width: normalize(62), height: normalize(62)}}/>
                    </Pressable>
                ) : (
                    <View style={{width: normalize(62), height: normalize(62)}}>
                        <BarIndicator waveMode='outline' count={5} color={item.activityIndicatorColor}/>
                    </View>
                )} 
            </View>
        );
    };
    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#520D2F'}}>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={width}
                itemHeight={height + height}
                sliderHeight={height + height}
                layout={'stack'}
                vertical={true}
                hasParallaxImages={false}
                slideInterpolatedStyle={animatedStyle}
            />
        </View>
    );
}

//The Jingle menu page
function JinglesMenu({navigation}) {
    const IS_ANDROID = Platform.OS === 'android';
    const [shouldShow, setShouldShow] = useState(true);
    const data = [
        {
            id: 2,
            backColor: '#F67918',
            name: "“MARCEL LE CAMIONNEUR“",
            size: 20,
            play: require('./assets/audio/stephane.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back2.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForOrange.png')
        },
        {
            id: 3,
            backColor: '#075C87',
            name: "“REPAS CHAMPAGNE“",
            size: 24,
            play: require('./assets/audio/ppchampagne.mp3'),
            button: require('./assets/img/jingles/playBlue.png'),
            imageBack: require('./assets/img/jingles/back3.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerPinkForBlue.png'),
            pause: require('./assets/img/jingles/pauseForBlue.png'),
        },
        {
            id: 4,
            backColor: '#F5A1B9',
            name: "“LE POSTILLON“",
            size: 24,
            play: require('./assets/audio/victoriapostillon.mp3'),
            button: require('./assets/img/jingles/playPink.png'),
            imageBack: require('./assets/img/jingles/back4.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerRedForPink.png'),
            pause: require('./assets/img/jingles/pauseForPink.png')
        },
        {
            id: 5,
            backColor: '#BD1550',
            name: "“Hot patate“",
            size: 24,
            play: require('./assets/audio/pippahotpatate.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back5.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForRed.png')
        },
        {
            id: 6,
            backColor: '#FFCA00',
            name: "“90 ANS“",
            size: 24,
            play: require('./assets/audio/granny.mp3'),
            button: require('./assets/img/jingles/playYellow.png'),
            imageBack: require('./assets/img/jingles/back6.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerBleuForYellow.png'),
            pause: require('./assets/img/jingles/pauseForYellow.png')

        },
        {
            id: 7,
            backColor: '#F67918',
            name: "“LA PATATE DURE“",
            size: 24,
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            play: require('./assets/audio/patatedure.mp3'),
            imageBack: require('./assets/img/jingles/back2.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForOrange.png')
        },
        {
            id: 8,
            backColor: '#075C87',
            name: "“VOUS AIMEZ LA PURÉE ?“",
            size: 20,
            play: require('./assets/audio/margotpuree.mp3'),
            button: require('./assets/img/jingles/playBlue.png'),
            imageBack: require('./assets/img/jingles/back3.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerPinkForBlue.png'),
            pause: require('./assets/img/jingles/pauseForBlue.png')
        },
        {
            id: 9,
            backColor: '#F5A1B9',
            name: "“1955“",
            size: 24,
            play: require('./assets/audio/pa1955.mp3'),
            button: require('./assets/img/jingles/playPink.png'),
            imageBack: require('./assets/img/jingles/back4.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerRedForPink.png'),
            pause: require('./assets/img/jingles/pauseForPink.png')
        },
        {
            id: 10,
            backColor: '#BD1550',
            name: "“C’EST NUL“",
            size: 24,
            play: require('./assets/audio/victoriacestnul.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back5.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForRed.png')
        },
        {
            id: 11,
            backColor: '#FFCA00',
            name: "“CHTI COUP DE BLANC“",
            size: 22,
            play: require('./assets/audio/mattochticoupdblanc.mp3'),
            button: require('./assets/img/jingles/playYellow.png'),
            imageBack: require('./assets/img/jingles/back6.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerBleuForYellow.png'),
            pause: require('./assets/img/jingles/pauseForYellow.png')
        },
        {
            id: 12,
            backColor: '#F67918',
            name: "“BIO POUR LA SANTÉ“",
            size: 24,
            play: require('./assets/audio/biobaptiste.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back2.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForOrange.png')
        },
        {
            id: 13,
            backColor: '#075C87',
            name: "“PURÉE QUE C’EST BON“",
            size: 24,
            play: require('./assets/audio/puree.mp3'),
            button: require('./assets/img/jingles/playBlue.png'),
            imageBack: require('./assets/img/jingles/back3.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerPinkForBlue.png'),
            pause: require('./assets/img/jingles/pauseForBlue.png')
        },
        {
            id: 14,
            backColor: '#F5A1B9',
            name: "“RADIO LÉGUMINEUSE“",
            size: 24,
            play: require('./assets/audio/juliettelegumineuse.mp3'),
            button: require('./assets/img/jingles/playPink.png'),
            imageBack: require('./assets/img/jingles/back4.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerRedForPink.png'),
            pause: require('./assets/img/jingles/pauseForPink.png')
        },
        {
            id: 15,
            backColor: '#BD1550',
            name: "“LA MENTHE DOUCE“",
            size: 24,
            play: require('./assets/audio/ppmenthe.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back5.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForRed.png')
        },
        {
            id: 16,
            backColor: '#FFCA00',
            name: "“PAS DE NAVET”",
            size: 24,
            play: require('./assets/audio/navetcharlotte.mp3'),
            button: require('./assets/img/jingles/playYellow.png'),
            imageBack: require('./assets/img/jingles/back6.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerBleuForYellow.png'),
            pause: require('./assets/img/jingles/pauseForYellow.png')
        },
        {
            id: 17,
            backColor: '#F67918',
            name: "“LA PATATE DOUUUUCE”",
            size: 22,
            play: require('./assets/audio/paulapatatedouuuce.mp3'),
            button: require('./assets/img/jingles/playOrangeAndRed.png'),
            imageBack: require('./assets/img/jingles/back2.png'),
            burgerMenuIcon: require('./assets/img/jingles/burgerYellowForOrange.png'),
            pause: require('./assets/img/jingles/pauseForOrange.png')
        },
    ];

    //The function that renders the list of jingles
    const renderItem = ({item}) => {
        Sound.setCategory('Playback');
        var ding = new Sound(item.play)
        return (
            <View style={{alignItems: 'center', marginTop: 15,}}>
                <Pressable onPress={() => ding.play()} style={{zIndex: 10}}>
                    <Text style={{
                        fontFamily: 'BarutaBlack',
                        color: item.backColor,
                        fontSize: item.size
                    }}>{item.name}</Text>
                </Pressable>
            </View>
        );
    };
    return (
        <View style={{flex: 1, alignItems: 'center', backgroundColor: '#481121'}}>
            <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.id} style={{marginTop: 120}}/>
        </View>
    );
}

//The mixtape page
function Mixtapes({navigation}) {
    const handlePress3 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp1);

        if (supported) {
            await Linking.openURL(mxtp1);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp1}`);
        }
    }, [mxtp1]);

    const handlePress4 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp2);

        if (supported) {
            await Linking.openURL(mxtp2);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp2}`);
        }
    }, [mxtp2]);

    const handlePress5 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp3);

        if (supported) {
            await Linking.openURL(mxtp3);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp3}`);
        }
    }, [mxtp3]);

    const handlePress6 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp4);

        if (supported) {
            await Linking.openURL(mxtp4);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp4}`);
        }
    }, [mxtp4]);

    const handlePress7 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp5);

        if (supported) {
            await Linking.openURL(mxtp5);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp5}`);
        }
    }, [mxtp5]);


    const handlePress8 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp6);

        if (supported) {
            await Linking.openURL(mxtp6);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp6}`);
        }
    }, [mxtp6]);

    const handlePress9 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp7);

        if (supported) {
            await Linking.openURL(mxtp7);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp7}`);
        }
    }, [mxtp7]);

    const handlePress10 = useCallback(async () => {
        const supported = await Linking.canOpenURL(soundc);

        if (supported) {
            await Linking.openURL(soundc);
        } else {
            Alert.alert(`Don't know how to open this URL: ${soundc}`);
        }
    }, [soundc]);

    const handlePress11 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp8);

        if (supported) {
            await Linking.openURL(mxtp8);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp8}`);
        }
    }, [mxtp8]);

    const handlePress12 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp9);

        if (supported) {
            await Linking.openURL(mxtp9);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp9}`);
        }
    }, [mxtp9]);

    const handlePress13 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp10);

        if (supported) {
            await Linking.openURL(mxtp10);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp10}`);
        }
    }, [mxtp10]);

    const handlePress14 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp11);

        if (supported) {
            await Linking.openURL(mxtp11);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp11}`);
        }
    }, [mxtp11]);

    const handlePress15 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp12);

        if (supported) {
            await Linking.openURL(mxtp12);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp12}`);
        }
    }, [mxtp12]);

    const handlePress16 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp13);

        if (supported) {
            await Linking.openURL(mxtp13);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp13}`);
        }
    }, [mxtp13]);

    const handlePress17 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp14);

        if (supported) {
            await Linking.openURL(mxtp14);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp14}`);
        }
    }, [mxtp14]);

    const handlePress18 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp15);

        if (supported) {
            await Linking.openURL(mxtp15);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp15}`);
        }
    }, [mxtp15]);

    const handlePress19 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp16);

        if (supported) {
            await Linking.openURL(mxtp16);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp16}`);
        }
    }, [mxtp16]);

    const handlePress20 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp17);

        if (supported) {
            await Linking.openURL(mxtp17);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp17}`);
        }
    }, [mxtp17]);

    const handlePress21 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp18);

        if (supported) {
            await Linking.openURL(mxtp18);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp18}`);
        }
    }, [mxtp18]);

    const handlePress22 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp19);

        if (supported) {
            await Linking.openURL(mxtp19);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp19}`);
        }
    }, [mxtp19]);

    const handlePress23 = useCallback(async () => {
        const supported = await Linking.canOpenURL(mxtp20);

        if (supported) {
            await Linking.openURL(mxtp20);
        } else {
            Alert.alert(`Don't know how to open this URL: ${mxtp20}`);
        }
    }, [mxtp20]);


    // sperme
    return (
        <View style={{flex: 1, flexDirection:'column',alignItems: 'center', backgroundColor: '#481121'}}>
            <StatusBar barStyle="dark-content"/>
            <View style={{flexDirection:'column', width:'100%', minHeight: '30%'}}>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    backgroundColor: '#481121',
                    zIndex: 1,
                    borderBottomRightRadius:55,
                    borderBottomLeftRadius:55
                }} >
                    <View style={{
                        backgroundColor:'#F5ECC4',
                        minHeight: '70%',
                        alignItems:'center',
                        justifyContent:'center',
                        borderBottomEndRadius:55,
                        borderBottomStartRadius:55,
                        zIndex: 2
                    }}>
                        <Text style={{fontFamily:'Baruta', fontSize:40, color:'#481121'}}>SÉLECTIONS</Text>
                    </View>
                    <View style={{
                        backgroundColor:'#481121',
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
                    }}>
                        <Text style={{
                            fontFamily:'Futura', 
                            fontSize:11, 
                            fontWeight:'bold', 
                            color:'#F5ECC4', 
                            textAlign: 'center',
                        }}>DÉCOUVREZ LES SÉLECTIONS ET MIX SAVOUREUX CONCOCTÉS PAR NOS ARTISTES PRÉFÉRÉS</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={{marginTop:-40, zIndex: -1}}>
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

                <View style={{
                    backgroundColor: '#F0A519',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,
                    marginTop:-40,
                    zIndex: -2
                    
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
                            source={require("./assets/img/selections/selec_tonique.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#481121'}}>
                            Selection by Tonique & Man
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress5()}>
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
                    zIndex: -3
                    
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
                            source={require("./assets/img/selections/selec_spooners.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#F0A519'}}>
                            Selection by Spooners
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress11()}>
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
                    backgroundColor: '#F0A519',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,
                    marginTop:-40,
                    zIndex: -4
                    
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
                            source={require("./assets/img/selections/selec_antonin.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#481121'}}>
                            Selection by Antonin
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress12()}>
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
                    zIndex: -5
                    
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
                            source={require("./assets/img/selections/selec_bomel.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#F0A519'}}>
                            Selection by Bomel
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress13()}>
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
                    backgroundColor: '#F0A519',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,
                    marginTop:-40,
                    zIndex: -6
                    
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
                            source={require("./assets/img/selections/selec_daymax.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#481121'}}>
                            Selection by Daymax
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress14()}>
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
                    zIndex: -7
                    
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
                            source={require("./assets/img/selections/selec_heritage.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#F0A519'}}>
                            Selection by Heritage Listed
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress15()}>
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
                    backgroundColor: '#F0A519',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,
                    marginTop:-40,
                    zIndex: -8
                    
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
                            source={require("./assets/img/selections/selec_lord.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#481121'}}>
                            Selection by LORD
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress16()}>
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
                    zIndex: -9
                    
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
                            source={require("./assets/img/selections/selec_lucien.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#F0A519'}}>
                            Selection by Lucien Kimono
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress17()}>
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
                    backgroundColor: '#F0A519',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,
                    marginTop:-40,
                    zIndex: -10
                    
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
                            source={require("./assets/img/selections/selec_macadam.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#481121'}}>
                            Selection by Macadam Crocodile
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress18()}>
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
                    zIndex: -11
                    
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
                            source={require("./assets/img/selections/selec_maxime.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#F0A519'}}>
                            Selection by Maxime Nerguisian
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress19()}>
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
                    backgroundColor: '#F0A519',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,
                    marginTop:-40,
                    zIndex: -12
                    
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
                            source={require("./assets/img/selections/selec_mi.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#481121'}}>
                            Selection by Mi Man
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress20()}>
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
                    zIndex: -13
                    
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
                            source={require("./assets/img/selections/selec_motel.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#F0A519'}}>
                            Selection by Motel Club
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress21()}>
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
                    backgroundColor: '#F0A519',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    borderBottomLeftRadius: 55,
                    borderBottomRightRadius: 55,
                    marginTop:-40,
                    zIndex: -14
                    
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
                            source={require("./assets/img/selections/selec_sauce.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#481121'}}>
                            Selection by Sauce Blanche
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress22()}>
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
                    zIndex: -15
                    
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
                            source={require("./assets/img/selections/selec_palo.png")}/>
                            <Spacer size={20}/>
                        <Text style={{fontFamily:'Baruta', fontSize:21, color:'#F0A519'}}>
                            Selection by Palomina
                        </Text>
                            <Spacer size={20}/>
                        <Pressable onPress={() => handlePress23()}>
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
                    width: width,
                    height: 100,
                    backgroundColor: '#F5ECC4',
                    alignItems: "center",
                    justifyContent: 'center',
                    marginTop: 10,
                    zIndex: 0,
                    paddingHorizontal: 11,
                    paddingVertical: 11,
                }}>
                    <Pressable onPress={handlePress10}>
                        <Text style={{
                            fontFamily:'Futura', 
                            fontSize:11, 
                            fontWeight:'bold', 
                            color:'#481121', 
                            textAlign: 'center',}}>RETROUVEZ TOUTES NOS SÉLÉCTIONS ET MIX 
                        SUR NOTRE SOUNDCLOUD </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

//The selection page
function Selections({navigation}) {
    const handlePress3 = useCallback(async () => {
        const supported = await Linking.canOpenURL("https://open.spotify.com/user/31jtgdnr2bmjias4xxsxxpueplhu?si=00496f41aedb4a8d");

        if (supported) {
            await Linking.openURL("https://open.spotify.com/user/31jtgdnr2bmjias4xxsxxpueplhu?si=00496f41aedb4a8d");
        } else {
            Alert.alert(`Don't know how to open this URL: ${"https://open.spotify.com/user/31jtgdnr2bmjias4xxsxxpueplhu?si=00496f41aedb4a8d"}`);
        }
    }, [selec1]);

    const handlePress4 = useCallback(async () => {
        const supported = await Linking.canOpenURL(selec2);

        if (supported) {
            await Linking.openURL(selec2);
        } else {
            Alert.alert(`Don't know how to open this URL: ${selec2}`);
        }
    }, [selec2]);

    const handlePress5 = useCallback(async () => {
        const supported = await Linking.canOpenURL(selec3);

        if (supported) {
            await Linking.openURL(selec3);
        } else {
            Alert.alert(`Don't know how to open this URL: ${selec3}`);
        }
    }, [selec3]);

    const handlePress10 = useCallback(async () => {
        const supported = await Linking.canOpenURL(soundc);

        if (supported) {
            await Linking.openURL(soundc);
        } else {
            Alert.alert(`Don't know how to open this URL: ${soundc}`);
        }
    }, [soundc]);

    return (
        <View style={{flex: 1, flexDirection:'column',alignItems: 'center', backgroundColor: '#481121'}}>
            <StatusBar barStyle="dark-content"/>
            <View style={{flexDirection:'column', width:'100%', height:'30%'}}>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    backgroundColor: '#F0A519',
                    zIndex: 1,
                    borderBottomRightRadius:55,
                    borderBottomLeftRadius:55
                }} >
                    <View style={{
                        backgroundColor:'#F5ECC4',
                        height: '70%',
                        alignItems:'center',
                        justifyContent:'center',
                        borderBottomEndRadius:55,
                        borderBottomStartRadius:55,
                        zIndex: 2
                    }}>
                        <Text style={{fontFamily:'Baruta', fontSize:40, color:'#481121'}}>Playlists</Text>
                    </View>
                    <View style={{
                        backgroundColor:'#F0A519',
                        width:'100%',
                        height:'30%',
                        alignItems:'center',
                        justifyContent:'center',
                        borderBottomEndRadius:55,
                        borderBottomStartRadius:55,
                        zIndex: 2
                    }}>
                        <Text style={{fontFamily:'Futura', fontSize:14, fontWeight:'bold', color:'#F5ECC4'}}>DÉCOUVREZ NOS PLAYLISTS SUR SPOTIFY</Text>
                    </View>
                </View>
            </View>
            <View style={{
                zIndex: 2,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                width: '100%',
                marginBottom :'10%',
                marginTop:'10%',
                flex:1
                }}>
                    <Image 
                        style={{width: '80%', height: undefined, aspectRatio: 1}} 
                        source={require("./assets/img/playlists/BestofGroove.png")}
                    />
                    <Pressable onPress={() => handlePress3()}>
                        <View style={{
                            backgroundColor: '#0049C3',
                            borderRadius: 23,
                            paddingHorizontal: 34,
                            paddingVertical: 17,
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
                                }}
                            />
                        </View>
                    </Pressable>
            </View>
        </View>
    );
}

//The calendar page
function Calendar({navigation}) {
    const [dataFinal, setDataFinal] = useState([]);
    const [currentDate, setCurrentDate] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        var date = moment().locale('fr').format(' dddd DD/MM ')
        setCurrentDate(date);
    }, []);

    //API call for events
    function CalendarEvent() {
        var axios = require("axios").default;
        var options = {
            method: 'POST',
            url: 'https://api.cronofy.com/oauth/token',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            data: {
                client_id: 'bCjbPFCdBIeaf5e_EGcymHbHlhHMunaK',
                client_secret: 'BfEBBJ1rR-cKTsa-mFGwNYgDPGyk_hW9B2E4F4bZ4utSptvAN1VzxTEItpEEIVexCelMh7pb1XJRT66FozODqA',
                grant_type: 'refresh_token',
                refresh_token: 'XQWm4Zo6b0ORBdG11Ivr4qlntPBuMlgi'
            }
        };
        //Get acces token
        axios.request(options).then(function (response) {
            var accesToken = response.data.access_token;
            var dateNow = moment().format("YYYY-MM-DD")
            var dateEnd = moment().add(1, 'days').format("YYYY-MM-DD")
            var axios = require("axios").default;
            var options = {
                method: 'GET',
                url: `https://api.cronofy.com/v1/events`,
                params: {
                    from: dateNow,
                    to: dateEnd,
                    tzid: 'America/Danmarkshavn'
                },
                headers: {
                    Authorization: 'Bearer ' + accesToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            };
            //Get events
            axios.request(options).then(function (response) {
                let events = response.data.events
                for (let ev in events) {
                    events[ev].event_uid = ev
                    events[ev].startNotif = response.data.events[ev].start
                    events[ev].start = moment(events[ev].start, "YYYY-MM-DD HH:mm Z").format("HH:mm")
                    events[ev].end = moment(events[ev].end, "YYYY-MM-DD HH:mm Z").format("HH:mm")
                }
                if (parseInt(events[events.length - 1].start[1]) <= 2) {
                    events.pop()
                }
                
                let uniqueSummaries = {};

                events = events.filter(event => {
                    if (!uniqueSummaries[event.summary]) {
                        uniqueSummaries[event.summary] = true;
                        return true;
                    }
                    return false;
                });

                setDataFinal(events);
            })
                .catch(function (error) {
                    console.log(error);
                });
        })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        CalendarEvent()
    }, []);

    //Render of events
    const Item = ({item, onPress, height, display}) => {
        function addEventToCalendar() {
            Alert.alert('Rappel activé !', "Tu recevras une notification quand l'événement débutera 🍠", [{
                text: 'Ça marche !',
                style: 'cancel',
            },
            ]);
            Notification.schduleNotification(new Date(item.startNotif), item.description.replace("<p>", "").replace("</p>", "").replace("</br>", "").replace("<br>", ""), item.summary)
        }

        return (
            <View style={[{
                flex: 1,
                width: 294,
                borderBottomColor: '#F4ECC4',
                borderBottomWidth: 0.3,
                marginTop: 10,
                alignItems: 'center'
            }, height + 20]}>
                <Pressable onPress={onPress}>
                    <Text style={{
                        color: "#E46A4D",
                        fontSize: 16,
                        fontWeight: "500",
                        marginLeft: 70,
                        fontFamily: 'Futura'
                    }}>{item.summary}</Text>
                    <Text style={{
                        color: "#F4ECC3",
                        fontFamily: 'BarutaBlack',
                        fontSize: 16,
                        position: 'relative',
                        marginRight: 150,
                        bottom: 25
                    }}>{item.start[0]}{item.start[1]}H{item.start[3]}{item.start[4]}</Text>
                    
                </Pressable>
                <View style={{width: 249, height: 100, display}}>
                    <Text style={{
                        color: "#F4ECC3",
                        fontSize: 10,
                        fontFamily: 'Futura',
                        marginBottom: 50
                    }}>{item.description.replace("<p>", "").replace("</p>", "").replace("</br>", "").replace("<br>", "")}</Text>
                    <Pressable onPress={() => addEventToCalendar()}>
                        <Image source={require('./assets/img/bel.png')} style={{
                            position: 'absolute',
                            width: normalize(16.11),
                            height: normalize(17),
                            left: '90%',
                            bottom: 20
                        }}></Image>
                    </Pressable>
                </View>
            </View>
        )
    };

    //Set the drop down animation
    const renderItem = ({item}) => {
        const height = item.event_uid === selectedId ? 80 : 30
        const display = item.event_uid === selectedId ? "flex" : "none"
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.event_uid)}
                height={{height}}
                display={display}
            />
        );
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#481121'}}>
            <Text style={{fontFamily: 'BarutaBlack', color: '#E46A4E', fontSize: 27, marginTop: 370}}>Programme du
                jour</Text>
            <Text style={{
                fontFamily: 'Futura',
                color: '#F4F2DE',
                fontSize: 18,
                fontWeight: '700',
                marginTop: normalize(10)
            }}>{currentDate}</Text>
            <View style={{marginTop: 100, height: height}}>
                <FlatList
                    data={dataFinal}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.event_uid}
                    extraData={selectedId}
                />
            </View>
        </View>
    )

}

//The Navigation function for menu
function MenuMain({navigation}) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="MainPage" component={MainPage} options={{
                headerTitleStyle: {
                    display: 'none'
                },
                headerBackVisible: false,
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#520D2F',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height: 50,
                }
            }}/>
            <Stack.Screen
                name="Backgrounds"
                component={Backgrounds}
                options={{
                    headerTitleStyle: {
                        display: 'none'
                    },
                    headerBackVisible: false,
                    headerBackTitleVisible: false,
                    headerTitle: null,
                    headerLeft: null,
                    headerTransparent: true,
                    headerStyle: {
                        backgroundColor: '#520D2F',
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0, // remove shadow on iOS
                        height: 50,
                    },
                }}
            />
            <Stack.Screen name="Goodies" component={Goodies} options={{
                headerTitleStyle: {
                    display: 'none'
                },
                headerBackVisible: false,
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#520D2F',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height: 50,
                }
            }}/>
            <Stack.Screen name="Concept" component={Concept} options={{
                headerTitleStyle: {
                    display: 'none'
                },
                headerBackVisible: false,
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#520D2F',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height: 50,
                }
            }}/>
            <Stack.Screen name="Support" component={Support} options={{
                headerTitleStyle: {
                    display: 'none'
                },
                headerBackVisible: false,
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#520D2F',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height: 50,
                }
            }}/>
            <Stack.Screen name="Jingles" component={Jingles} options={{
                headerTitleStyle: {
                    display: 'none'
                },
                headerBackVisible: false,
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#520',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height: 0,
                }
            }}/>
            <Stack.Screen name="Mixtapes" component={Mixtapes} options={{
                headerTitleStyle: {
                    display: 'none'
                },
                headerBackVisible: false,
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#520',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height: 0,
                }
            }}/>

            <Stack.Screen name="Selections" component={Selections} options={{
                headerTitleStyle: {
                    display: 'none'
                },
                headerBackVisible: false,
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#520',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height: 0,
                }
            }}/>

            <Stack.Screen name="JinglesMenu" component={JinglesMenu} options={{
                headerTitleStyle: {
                    display: 'none'
                },
                headerBackVisible: false,
                headerBackTitleVisible: false,
                headerTitle: null,
                headerTransparent: true,
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#520',
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0, // remove shadow on iOS
                    height: 0,
                }
            }}/>

        </Stack.Navigator>
    );
}

//Creation navigation
const Stack = createStackNavigator();

//The main navigation page
function MyStack({navigation}) {
    return (
        <Stack.Navigator initialRouteName="Home"
                         screenOptions={{
                             headerShown: true,
                             gestureEnabled: true,
                             cardOverlayEnabled: true,
                             presentation: "modal",
                             ...TransitionPresets.ModalPresentationIOS,
                         }}
        >
            <Stack.Screen name="Home" component={Home} options={{
                translucent: true,
                headerBackTitleVisible: false,
                headerTransparent: true,
                headerShown: true,
                headerTitleStyle: {
                    display: 'none'
                },
            }}/>
            <Stack.Screen
                name="BigPlayer"
                component={BigPlayer}
                options={({navigation}) => ({
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                    headerTitleStyle: {
                        display: 'none'
                    },
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0, // remove shadow on iOS
                        height: 400,
                    },
                    headerRight: () => (
                        <Pressable style={{
                            zIndex: 10,
                            position: 'absolute',
                            alignItems: 'center',
                            width: width,
                            height: normalize(230),
                            marginTop: normalize(120)
                        }} onPress={() => TransitionPresets.ModalSlideFromBottomIOS && navigation.navigate('Home')}>
                            <Image style={{
                                width: normalize(23),
                                height: normalize(3),
                                alignItems: 'center',
                                left: normalize(5),
                                top: normalize(-50)
                            }} source={require('./assets/img/closeplayer.png')}></Image>
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <View/>
                    )
                })
                }
            />


            <Stack.Screen
                name="MenuTop"
                component={MenuMain}
                options={({navigation}) => ({
                    ...TransitionPresets.SlideFromRightIOS,
                    headerTitleStyle: {
                        display: 'none'
                    },
                    headerBackTitleVisible: false,
                    headerTransparent: {
                        position: 'absolute',
                    },
                    display: 'none',
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0, // remove shadow on iOS
                        height: 70,
                    },
                    headerRight: () => (
                        <Pressable
                            style={{
                                // width: 50, height: 40, backgroundColor: 'white',
                                borderRadius: 8, justifyContent: 'center', alignItems: 'center',
                                marginLeft: 12, marginTop: 12
                            }}
                            onPress={() => navigation.goBack()}>

                            {/*<Text style={{color: "black", fontSize: 20}}>*/}
                            {/*    {"<"}*/}
                            {/*</Text>*/}

                            <Image style={{marginTop: 10, marginRight: 25, width: 40, height: 38}}
                                   source={require('./assets/img/crossBack.png')}></Image>
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <View/>
                    )
                })
                }
            />

            <Stack.Screen
                name="DetailSong"
                component={DetailSong}
                options={({navigation}) => ({
                    ...TransitionPresets.SlideFromRightIOS,
                    headerTitleStyle: {
                        display: 'none'
                    },
                    headerBackTitleVisible: false,
                    headerTransparent: {
                        position: 'absolute',
                    },
                    display: 'none',
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0, // remove shadow on iOS
                        height: 70,
                    },
                    headerRight: () => (
                        <Pressable
                            style={{
                                // width: 50, height: 40, backgroundColor: 'white',
                                borderRadius: 8, justifyContent: 'center', alignItems: 'center',
                                marginLeft: 12, marginTop: 12
                            }}
                            onPress={() => navigation.goBack()}>


                            <Image style={{marginTop: 10, marginRight: 25, width: 40, height: 38}}
                                   source={require('./assets/img/crossBack.png')}></Image>
                        </Pressable>
                    ),
                    headerLeft: () => (
                        <View/>
                    )
                })
                }
            />

            <Stack.Screen
                name="DetailSongLike"
                component={DetailSongLike}
                options={({navigation}) => ({
                    ...TransitionPresets.SlideFromRightIOS,
                    headerTitleStyle: {
                        display: 'none'
                    },
                    headerBackTitleVisible: false,
                    headerTransparent: {
                        position: 'absolute',
                    },
                    display: 'none',
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0, // remove shadow on iOS
                        height: 70,
                    },
                    headerRight: () => (
                        <Pressable
                            style={{
                                // width: 50, height: 40, backgroundColor: 'white',
                                borderRadius: 8, justifyContent: 'center', alignItems: 'center',
                                marginLeft: 12, marginTop: 12
                            }}
                            onPress={() => navigation.goBack()}>

                            <Image style={{marginTop: 10, marginRight: 25, width: 40, height: 38}}
                                   source={require('./assets/img/crossBack.png')}></Image>

                        </Pressable>
                    ),                    
                    headerLeft: () => (
                        <View/>
                    )
                })
                }
            />

            <Stack.Screen name="Calendar"
                          component={Calendar}
                          options={({navigation}) => ({
                              ...TransitionPresets.SlideFromRightIOS,
                              headerTitleStyle: {
                                  display: 'none'
                              },
                              headerBackTitleVisible: false,
                              headerTransparent: {
                                  position: 'absolute',
                              },
                              display: 'none',
                              headerStyle: {
                                  backgroundColor: 'transparent',
                                  elevation: 0,
                                  shadowOpacity: 0,
                                  height: 70,
                              },
                              headerRight: () => (
                                    <Pressable
                                        style={{
                                            // width: 50, height: 40, backgroundColor: 'white',
                                            borderRadius: 8, justifyContent: 'center', alignItems: 'center',
                                            marginLeft: 12, marginTop: 12
                                        }}
                                        onPress={() => navigation.goBack()}>

                                        <Image style={{marginTop: 10, marginRight: 25, width: 40, height: 38}}
                                                source={require('./assets/img/crossBack.png')}></Image>

                                    </Pressable>
                                ),
                                headerLeft: () => (
                                    <View/>
                                )
                          })
                          }/>
        </Stack.Navigator>
    );
}


const App = () => {
    return (
        <NavigationContainer style={{backgroundColor: '#520D2F'}}>
            <MyStack/>
        </NavigationContainer>
    );
};

export default App;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    backgroundVideoCarousel: {
        height: 452,
        width: 247,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0,
        borderRadius: 75
    },
    logo: {
        zIndex: 5,
        width: normalize(130),
        height: normalize(132)
    },
    littlePlayer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '15.4%',
        position:'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    openBigPlayer: {
        width: normalize(23),
        height: normalize(3),
    },
    overOpen: {
        position: 'absolute',
        top: 5, // Ajustez cette valeur selon vos besoins
        left: '50%',
        transform: [{ translateX: -15 }],
        width: 200,
        height: 80,
        borderRadius: 2,
        zIndex: 10,
    },
    menuButton: {
        zIndex: 30,
    },
    fadingContainer: {
        padding: 20,
    },
    fadingText: {
        fontSize: 28
    },
    buttonRow: {
        flexBasis: 100,
        justifyContent: "space-evenly",
        marginVertical: 16
    },
    morebutton: {
        width: 50,
        height: 50,
        zIndex: 10,
        position: 'absolute',
        left: '85%',
        top:'90%'
    },
    morebuttonplus: {
        width: 26,
        height: 26,
    },
    songContent: {
        marginLeft: 9,
        color: '#EEEEEE',
        zIndex: 0,
    },
    songTitle: {
        fontSize: 14,
        color: '#F4ECC4',
        marginTop: 10,
        zIndex: 0,
        fontFamily: 'Futura-Bold',
        fontWeight: "700",
        width: 180
    },
    songArtist: {
        fontSize: 14,
        fontWeight: '500',
        color: '#BDB6A0',
        zIndex: 0,
        fontFamily: 'Futura'
    },
    playButtonMain: {
        width: normalize(41),
        height: normalize(41),
        zIndex: 100,
    },
    pauseButtonMain: {
        width: normalize(41),
        height: normalize(41),
        zIndex: 100,
    },
    leftorange: {
        position:'relative',
        width:'25%',
        height:'100%',
        backgroundColor:'#fa7c00',
        borderTopLeftRadius: 40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    rightred: {
        position:'relative',
        width:'75%',
        height:'100%',
        backgroundColor:'#520D2F',
        borderTopRightRadius: 40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    },
    roundred: {
        width: 65,
        height: 65,
        borderRadius: 100,
        backgroundColor: '#520D2F',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    contentWrapperLP: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
});
