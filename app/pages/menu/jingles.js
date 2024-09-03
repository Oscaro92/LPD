// * import libraries
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

// * import components
import CrossBack from '../../components/crossBack'

export default function Jingles() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto"/>
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
});