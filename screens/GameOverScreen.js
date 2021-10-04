import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://www.petmd.com/sites/default/files/Senior-Cat-Care-2070625.jpg' }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needs <Text style={styles.highlight}>{roundsNumber}</Text>
                    {' '}rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
                </BodyText>
            </View>
            <MainButton onPress={onRestart}>NEW GAME</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        overflow: 'hidden',
        width: 300,
        height: 300,
        marginVertical: 30,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginVertical: 15,
        marginHorizontal: 30
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;
