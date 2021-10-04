import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needs <Text style={styles.highlight}>{roundsNumber}</Text>
                    {' '}rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.
                </BodyText>
            </View>
            <Button title="NEW GAME" onPress={onRestart}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
