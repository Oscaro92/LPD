import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  Animated
} from 'react-native';
import TrackPlayer, {
  Event,
  Capability,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
const {width, height} = Dimensions.get('window');
import normalize from 'react-native-normalize';
import moment from 'moment';
import MarqueeText from 'react-native-marquee';
import ProgressBar from "react-native-animated-progress";
import { trigger } from "react-native-haptic-feedback";
import PlayButton from './PlayButton';

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({
      waitForBuffer:false,
    });
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,

        Capability.SeekTo
      ],
    });
    await TrackPlayer.add(songs)
    await TrackPlayer.seekTo(10);

  } catch (error) {
    console.log(error);
  }
};

//Function for little player
const MusicPlayer = () => {
  const [trackTitle, setTrackTitle] = useState();
  const [trackArtist, setTrackArtist] = useState();
  const [trackArtwork,setTrackArtwork]= useState()
  const [titleNow,setTitleNow] = useState();
  const [coverAlbum,setCoverAlbum] = useState();
  const [artistNow, setArtistNow] = useState();
  const [startedAt,setStartedAt] = useState('');
  const [endAt,setEndAt] = useState();
  const [duration,setDuration]= useState();
  const [timeNow,setTimeNow]= useState()
  const [timeBlock,setTimeBlock] = useState()
  const [timeNowBaretteDeShit, setTimeNowBaretteDeShit] = useState()

  useEffect(() => {
      setupPlayer()
    }, []);

  async function CallApi(setTitleNow, titleNow, setCoverAlbum, setArtistNow, artistNow, trackArtist, setStartedAt, startedAt, setEndAt, endAt, setDuration, duration) {
    const greg = await fetch('https://api.radioking.io/widget/radio/radio-jockey/track/current');
      const response = await greg.json();
      const tpnow = moment().unix()
      const tpstart = moment(response.started_at, "YYYY-MM-DD HH:mm Z").unix()
      const letemp = Date.now() - new Date(response.started_at).getTime()
    
      setTitleNow(response.title)
      setArtistNow(response.artist)
      setCoverAlbum(response.cover)
      setStartedAt(response.started_at)
      setEndAt(response.end_at)
      setDuration(response.duration)
      setTimeNow(tpnow - tpstart)

      console.log(letemp)
      if(tpnow - tpstart >= duration) {
        setTimeBlock(false)
      }else{
        setTimeBlock(true)
      }

      setTimeNowBaretteDeShit(letemp/1000)
      TrackPlayer.updateMetadataForTrack(0, {
        title: response.title,
        artist: response.artist,
        artwork: response.cover,
        duration: response.duration
      });

      return (
        songs = [{
            id: 0,
            title: titleNow,
            artist: artistNow,
            start: startedAt,
            end: endAt,
            duration: duration,
            cover: '../assets/img/img1.jpg',
            url: "https://api.radioking.io/radio/285742/listen.m3u",
          }, ]
        )
    }

  async function waitAndDo() {
    setTimeout( async function () {
      await CallApi(setTitleNow, titleNow, setCoverAlbum, setArtistNow, artistNow, trackArtist, setStartedAt, startedAt, setEndAt, endAt, setDuration, duration, timeNowBaretteDeShit, setTimeNowBaretteDeShit)
      waitAndDo();
    }, 1000);
  }

  useEffect(() => {
    CallApi(setTitleNow, titleNow, setCoverAlbum, setArtistNow, artistNow, trackArtist, setStartedAt, startedAt, setEndAt, endAt, setDuration, duration ,timeNowBaretteDeShit, setTimeNowBaretteDeShit)
    waitAndDo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      const {
        title,
        artwork,
        artist
      } = track;
      setTrackTitle(title);
      setTrackArtist(artist);
      setTrackArtwork(artwork);
    }
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = parseInt(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    
    <View style={style.mainContainer}>
      {/* Little music player section */}
      {/* Title & Artist Name */}
      <View style={style.playerInfos}> 
        {/* Image cover album */}
        <Image source={{uri:coverAlbum}} style={{ height: normalize(55), width: normalize(55),borderRadius:10}}/>
        
        <View style={style.songContentBlockInfo}>
          <View style={style.songContent}>
            <MarqueeText speed = {0.1} marqueeOnStart = {true} delay={1000} loop={true} style = {[style.songTitle]} >
                {titleNow}
            </MarqueeText>
            <MarqueeText speed = {0.1} marqueeOnStart = {true} delay = {1000} loop={true} style = {[style.songArtist]} >
                {artistNow}
            </MarqueeText>
          </View>
          {/* Progress bar */}
          <View style={style.blockInfo}>
            <View style ={style.progressBar}>
              <ProgressBar animated ={false} progress={Math.round(timeNowBaretteDeShit/duration*100)} width ={'100%'} height={3} backgroundColor="#FA7C00" trackColor ="#BEB7a0" />
            </View>

            {/* Timer */}
            <View style={style.progressLevelDuraiton}>
              {timeBlock ? (
                <Text style={style.progressLabelText}>
                  {~~((timeNowBaretteDeShit % 3600)/60)}:{new Date(timeNowBaretteDeShit*1000).toLocaleTimeString().substring(6)}
                </Text>
              ):
                <Text style={style.progressLabelText}>
                  {~~((duration % 3600)/60)}:{new Date(duration * 1000).toLocaleTimeString().substring(6)}
                </Text>
              }
                <Text style={style.progressLabelText2}>
                {~~((duration % 3600)/60)}:{new Date(duration * 1000).toLocaleTimeString().substring(6)}
                </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MusicPlayer;

const style = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative' ,
    display:'flex',
  },
  songContent: {
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: 'auto',
    justifyContent: 'flex-start',
    overflow: 'visible',
    position: 'relative',
    width: 'auto',
    color: '#EEEEEE',
    zIndex: 1,
  },
  songTitle: {
    width: 141,
    fontSize: 14,
    fontWeight: '700',
    color:'#F4ECC4',
    fontFamily:'Futura-Bold'
  },
  songArtist: {
    fontSize: 12,
    width: 141,
    fontWeight: '300',
    color:'#BDB6A0',
    fontFamily:'Futura'
  },
  progressBar: {
    width: '100%',
    height: normalize(3),
    zIndex:0
  },
  blockInfo:{
    flexDirection: 'column',
  },
  progressLevelDuraiton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex:0
  },
   progressLabelText: {
    color: '#FA7C00',
    fontSize:8,
    fontFamily:'Futura',
    marginTop:normalize(4),
    color: '#FA7C00',
    zIndex:-10,
    position:'relative'
  },
  progressLabelText2: {
    marginLeft:normalize(120),
    marginTop:normalize(4),
    color: '#BEB7A0',
    fontSize:8,
    zIndex:0,
    fontFamily:'Futura',
    position:'absolute'
  },
  playerInfos:{
    display:'flex',
    flexDirection:'row',
  },
  songContentBlockInfo:{
    paddingLeft:15,
    paddingRight:15,
    height:'100%'
  }
});