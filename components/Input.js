import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = ({ style, ...restProps }) => {
    return (
        <TextInput style={{ ...styles.input, ...style }} {...restProps} />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    }
});

export default Input;
