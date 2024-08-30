import {Link} from "expo-router";
import {StatusBar} from 'expo-status-bar';
import {Image, Pressable, StyleSheet, Text, SafeAreaView, View} from 'react-native';

export default function Menu() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto"/>
            <Text style={{position: 'absolute', top: 5, right: 5}}>Coucou</Text>
            <Link href="/pages/menu/backgrounds" asChild style={styles.button}>
                <Pressable style={styles.button}>
                    <Image source={require('../../../assets/menu/backgrounds.png')} style={styles.image}/>
                </Pressable>
            </Link>
{/*            <Link href="/pages/menu/jingles" asChild>
                <Pressable style={styles.button}>
                    <Image source={require('../../../assets/menu/jingles.png')} style={styles.image}/>
                </Pressable>
            </Link>
            <Link href="/pages/menu/concept" asChild>
                <Pressable style={styles.button}>
                    <Image source={require('../../../assets/menu/backgrounds.png')} style={styles.image}/>
                </Pressable>
            </Link>
            <Link href="/pages/menu/selections" asChild>
                <Pressable style={styles.button}>
                    <Image source={require('../../../assets/menu/backgrounds.png')} style={styles.image}/>
                </Pressable>
            </Link>
            <View style={styles.twoButton}>
                <Link href="/pages/menu/playlists" asChild>
                    <Pressable style={styles.halfImage}>
                        <Image source={require('../../../assets/menu/backgrounds.png')} style={styles.image}/>
                    </Pressable>
                </Link>
                <Link href="/pages/menu/shop" asChild>
                    <Pressable style={styles.halfImage}>
                        <Image source={require('../../../assets/menu/backgrounds.png')} style={styles.image}/>
                    </Pressable>
                </Link>
            </View>
            <Link href="/pages/menu/soutenir" asChild>
                <Pressable style={styles.button}>
                    <Image source={require('../../../assets/menu/backgrounds.png')} style={styles.image}/>
                </Pressable>
            </Link>
            <View>
                <Text>rating</Text>
                <Text>instagram</Text>
            </View>*/}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#481121',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        display: 'flex'
    },
    button: {
        position: 'relative',
        width: '80%',
        height: 140
    },
    twoButton: {
        width: '80%',
        height: 140,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        resizeMode: 'contain'
    },
    halfImage: {
        width: '50%',
    }
});
