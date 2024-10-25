// src/components/ScrollContainer.js
import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from './Styles';

const ScrollContainer = ({ children }) => {
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                {children}
            </View>
        </ScrollView>
    );
};

export default ScrollContainer;
