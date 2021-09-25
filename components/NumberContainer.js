import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const NumberContainer = ({ children }) => {
    return (
        <View style={styles.numberContainer}>
            <Text style={styles.number}>{children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    numberContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: colors.accent,
        borderRadius: 10
    },
    number: {
        color: colors.accent,
        fontSize: 22
    }
});

export default NumberContainer;
