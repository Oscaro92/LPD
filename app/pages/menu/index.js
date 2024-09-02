// * import libraries
import React from "react";
import {Link} from "expo-router";
import {StatusBar} from 'expo-status-bar';
import {Image, Pressable, StyleSheet, Text, ScrollView, View} from 'react-native';

// * import components
import CrossBack from '../../components/crossBack';

const Spacer = ({ size }) => <View style={{ height: size }} />;

export default function Menu() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <CrossBack/>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.items}>
                    <Link href="/pages/menu/backgrounds" asChild style={styles.button}>
                        <Pressable style={styles.button}>
                            <Image source={require('../../../assets/img/menu/backgrounds.png')} style={styles.image} resizeMode={"contain"}/>
                        </Pressable>
                    </Link>
                    <Spacer size={10}/>
                    <Link href="/pages/menu/jingles" asChild style={styles.button}>
                        <Pressable style={styles.button}>
                            <Image source={require('../../../assets/img/menu/jingles.png')} style={styles.image} resizeMode={"contain"} />
                        </Pressable>
                    </Link>
                    <Spacer size={10}/>
                    <Link href="/pages/menu/concept" asChild style={styles.button}>
                        <Pressable style={styles.button}>
                            <Image source={require('../../../assets/img/menu/concept.png')} style={styles.image} resizeMode={"contain"}/>
                        </Pressable>
                    </Link>
                    <Spacer size={10}/>
                    <View style={styles.twoButton}>
                        <Link href="/pages/menu/selections" asChild style={styles.halfImage}>
                            <Pressable style={styles.halfImage}>
                                <Image source={require('../../../assets/img/menu/selections.png')} style={styles.image} resizeMode={"contain"}/>
                            </Pressable>
                        </Link>
                        <Link href="/pages/menu/playlists" asChild style={styles.halfImage}>
                            <Pressable style={styles.halfImage}>
                                <Image source={require('../../../assets/img/menu/playlists.png')} style={styles.image} resizeMode={"contain"}/>
                            </Pressable>
                        </Link>
                    </View>
                    <Spacer size={10}/>
                    <Link href="/pages/menu/shop" asChild style={styles.halfImage}>
                        <Pressable style={styles.button}>
                            <Image source={require('../../../assets/img/menu/backgrounds.png')} style={styles.image} resizeMode={"contain"}/>
                        </Pressable>
                    </Link>
                    <Spacer size={10}/>
                    <Link href="/pages/menu/soutenir" asChild style={styles.halfImage}>
                        <Pressable style={styles.button}>
                            <Image source={require('../../../assets/img/menu/soutenir.png')} style={styles.image} resizeMode={"contain"}/>
                        </Pressable>
                    </Link>
                    <Spacer size={10}/>
                    <View style={styles.twoButton}>
                        <Pressable style={styles.halfImage}>
                            <Image source={require('../../../assets/img/menu/rating.png')} style={styles.image} resizeMode={"contain"}/>
                        </Pressable>
                        <Pressable style={styles.halfImage}>
                            <Image source={require('../../../assets/img/menu/instagram.png')} style={styles.image} resizeMode={"contain"}/>
                        </Pressable>
                    </View>
                    <Spacer size={10}/>
                    <Text style={styles.footer}>Made with 🍠</Text>
                    <Pressable>
                        <Text style={[styles.footer, {textDecorationLine: 'underline'}]}>by Le Studio Pigalle</Text>
                    </Pressable>
                    <Spacer size={10}/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#520D2F',
        alignItems: 'center',
        width: "100%",
    },
    scrollView: {
        height: '100%',
        width: '100%',
    },
    items: {
        marginTop: '20%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        width: '90%',
        height: 130
    },
    twoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        height: 130
    },
    image: {
        width: '100%',
        height: 130
    },
    halfImage: {
        width: '50%',
    },
    footer: {
        color: '#F4ECC4',
        // fontFamily: 'Futura-Bold', // ! add font
        fontWeight: "700",
        fontSize: 14
    }
});
