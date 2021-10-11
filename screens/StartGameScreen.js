import React, { useEffect, useState } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    KeyboardAvoidingView
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import colors from "../constants/colors";

const StartGameScreen = ({ onStartGame }) => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const updateLayout = () => {
        setButtonWidth(Dimensions.get('window').width / 4)
    };

    useEffect(() => {
        const eventListener = Dimensions.addEventListener('change', updateLayout);

        return () => {
            if (eventListener) eventListener.remove();
        }
    });

    const closeKeyboardHandler = () => {
        Keyboard.dismiss();
    };

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
    };

    const confirmInputHandler = () => {
        const chosenNumber = Number.parseInt(enteredValue, 10)

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [{
                    text: 'Okay',
                    style: 'destructive',
                    onPress: resetInputHandler
                }]
            );
            return;
        }

        setEnteredValue('');
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position"
                                  keyboardVerticalOffset={30}
            >
                <TouchableWithoutFeedback onPress={closeKeyboardHandler}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input style={styles.input}
                                   value={enteredValue}
                                   onChangeText={numberInputHandler}
                                   keyboardType="number-pad"
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   maxLength={2}
                                   blurOnSubmit
                            />
                            <View style={styles.buttonsContainer}>
                                <View style={{
                                    ...styles.button,
                                    width: buttonWidth
                                }}>
                                    <Button title="Reset"
                                            color={colors.accent}
                                            onPress={resetInputHandler}
                                    />
                                </View>
                                <View style={{
                                    ...styles.button,
                                    width: buttonWidth
                                }}>
                                    <Button title="Confirm"
                                            color={colors.primary}
                                            onPress={confirmInputHandler}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        alignItems: 'center',
        width: '80%',
        minWidth: 300,
        maxWidth: '95%'
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15
    },
    button: {
        minWidth: 88
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
