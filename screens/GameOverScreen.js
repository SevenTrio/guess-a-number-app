import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    Text,
    Image,
    StyleSheet,
    Dimensions
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);

    const updateLayout = () => {
        setDeviceWidth(Dimensions.get('window').width);
        setDeviceHeight(Dimensions.get('window').height);
    };

    useEffect(() => {
        const eventListener = Dimensions.addEventListener('change', updateLayout);

        return () => {
            if (eventListener) eventListener.remove();
        }
    });

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>The Game is Over!</TitleText>
                <View style={{
                          ...styles.imageContainer,
                          width: deviceWidth * 0.7,
                          height: deviceWidth * 0.7,
                          borderRadius: (deviceWidth * 0.7) / 2,
                          marginVertical: deviceHeight / 30
                }}>
                    <Image
                        source={{ uri: 'https://www.petmd.com/sites/default/files/Senior-Cat-Care-2070625.jpg' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={{ ...styles.resultContainer, marginVertical: deviceHeight / 60 }}>
                    <BodyText style={{...styles.resultText, fontSize: deviceHeight < 400 ? 16 : 20 }}>
                        Your phone needs <Text style={styles.highlight}>{roundsNumber}</Text>
                        {' '}rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
                    </BodyText>
                </View>
                <MainButton onPress={onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'black'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30
    },
    resultText: {
        textAlign: 'center'
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
