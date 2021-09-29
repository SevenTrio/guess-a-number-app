import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";

const generateRandomBetween = (min, max, exclude) => {
    const safeMin = Math.ceil(min);
    const safeMax = Math.floor(max);
    const rndNumber = Math.floor(Math.random() * (safeMax - safeMin)) + safeMin;

    if (rndNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    }

    return rndNumber;
}

const GameScreen = ({ userChoice, onGameOver }) => {
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween(1, 100, userChoice)
    );
    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if (
            (direction === 'lower' && currentGuess < userChoice) ||
            (direction === 'greater' && currentGuess > userChoice)
        ) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                { text: 'Sorry!', style: 'cancel' }
            ]);

            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds((rounds) => rounds + 1);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER"
                        onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="GREATER"
                        onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        maxWidth: '80%',
        marginTop: 20
    }
});

export default GameScreen;
