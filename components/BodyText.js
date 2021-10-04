import React from "react";
import { Text, StyleSheet } from "react-native";

const BodyText = ({ children, style, ...restProps }) => {
    return (
        <Text style={{ ...styles.bodyText, ...style }} {...restProps}>
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    bodyText: {
        fontFamily: 'open-sans'
    }
});

export default BodyText;
