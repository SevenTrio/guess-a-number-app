import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import defaultStyles from "../constants/default-styles";

const generateRandomBetween = (min, max, exclude) => {
    const safeMin = Math.ceil(min);
    const safeMax = Math.floor(max);
    const rndNumber = Math.floor(Math.random() * (safeMax - safeMin)) + safeMin;

    if (rndNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    }

    return rndNumber;
}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
    const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

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

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setPastGuesses((curPastGuesses) => [nextNumber.toString(), ...curPastGuesses]);
    }

    let listContainerStyle = styles.listContainer;

    if (deviceWidth < 350) {
        listContainerStyle = styles.listContainerBig
    }

    let gameControls = (
        <>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={{
                ...styles.buttonContainer,
                marginTop: deviceHeight > 600 ? 20 : 5
            }}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
        </>
    );

    if (deviceHeight < 500) {
        gameControls = (
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={defaultStyles.titleText}>Opponent's Guess</Text>
            {gameControls}
            <View style={listContainerStyle}>
                <FlatList
                    contentContainerStyle={styles.list}
                    data={pastGuesses}
                    keyExtractor={(item) => item}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                />
            </View>
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
        width: 400,
        maxWidth: '90%',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white'
    }
});

export default GameScreen;
