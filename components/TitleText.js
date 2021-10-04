import React from "react";
import { Text, StyleSheet } from "react-native";

const TitleText = ({ children, style, ...restProps }) => {
    return (
        <Text style={{ ...styles.titleText, ...style }} {...restProps}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});

export default TitleText;
