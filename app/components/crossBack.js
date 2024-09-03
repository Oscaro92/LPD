// * import libraries
import {Link} from "expo-router";
import {Image, Pressable, StyleSheet} from 'react-native';

export default function CrossBack() {
    return (
        <Link href="/" asChild style={styles.cross}>
            <Pressable style={styles.cross}>
                <Image source={require("../../assets/img/icones/crossBack.png")} style={styles.imageCross} resizeMode={"contain"}/>
            </Pressable>
        </Link>
    );
}

const styles = StyleSheet.create({
    cross: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 40,
        height: 40,
        zIndex: 1
    },
    imageCross: {
        width: '100%',
        height: '100%'
    },
});