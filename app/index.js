// * import libraries
import {Audio} from 'expo-av';
import { Link } from 'expo-router';
import Lottie from 'lottie-react-native';
import {useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Button, ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';

export default function App() {
  const [sound, setSound] = useState();
  const [play, setPlay] = useState(false);

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

  return (
      <View style={styles.container}>
        <StatusBar style="auto"/>
        {/*            <Lottie resizeMode="cover" source={require('./assets/animation.json')} autoPlay loop
                    style={{zIndex: 40, display: buttonIsHidding2}}/>*/}
        <ImageBackground source={require('../assets/icon.png')} resizeMode="cover" style={styles.image}>
          <Link href="/pages/menu" asChild>
            <Pressable>
              <Text>Menu</Text>
            </Pressable>
          </Link>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width: "100%"
  },
});
