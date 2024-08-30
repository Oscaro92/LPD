import {StatusBar} from 'expo-status-bar';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {Link} from "expo-router";

export default function Concept() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Link href="/" asChild style={styles.cross}>
                <Pressable style={styles.cross}>
                    <Image source={require('../../../assets/img/icones/crossBack.png')} style={styles.imageCross} resizeMode={"contain"}/>
                </Pressable>
            </Link>
            <View style={styles.items}>
                <Image source={require("../../../assets/img/concept/main.png")} style={styles.image} resizeMode={"contain"}/>
                <Text style={styles.text}>La Patate Douce radio est un mélange de saveurs groovy et smoothy, une autoroute du soleil direction ta mer ef purée que c'est bon !</Text>
                <Text style={styles.text}>Ce légume 4 saisons t'apporte de la douceur tout en donnant la pêche. Un assortiment Disco-Funk saupoudré de Bossa Nova, de Jazz accompagné par sa dose d'Electro et de musiques afro.</Text>
                <Text style={styles.text}>Ici aucune Pub, uniquement du partage. Une bibliothèque constamment alimentée de nouveautés pour un plein de Vitamines C.</Text>
                <Text style={styles.text}>Cette radio reste avant tout le projet d'un passionné dont le but est simple:</Text>
                <Text style={[styles.text, {fontSize: 18, fontWeight: "900", alignSelf: 'center'}]}>DONNER LA PATATE (DOUCE)</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#520D2F',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cross: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 50,
        height: 50,
        zIndex: 1
    },
    imageCross: {
        width: '100%',
        height: '100%'
    },
    items: {
        width: '85%',
        height: '85%',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'column'
    },
    image: {
        width: '100%',
        height: 200,
    },
    text: {
        color: '#F4ECC4',
        // fontFamily: 'Futura-Bold', // ! add font
        fontWeight: "700",
        fontSize: 14
    }
});