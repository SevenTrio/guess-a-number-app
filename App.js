import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import StartGameScreen from "./screens/StartGameScreen";

const App = () => {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    
    const configureNewGame = () => {
        setGuessRounds(0);
        setUserNumber(null);
    }

    const startGameHandler = (selectedNumber) => {
        setUserNumber(selectedNumber);
        setGuessRounds(0);
    };

    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds);
    }

    let content = <StartGameScreen onStartGame={startGameHandler}/>;

    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOverScreen
                roundsNumber={guessRounds}
                userNumber={userNumber}
                onRestart={configureNewGame}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <Header title="Guess a Number"/>
            {content}
            <StatusBar style="auto"/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});

export default App;
