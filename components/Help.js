import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './Styles';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing icons

const Help = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Help & Support</Text>

            <View style={styles.helpSection}>
                <Icon name="help-circle-outline" size={24} color="#006400" style={styles.icon} />
                <Text style={styles.helpQuestion}>How do I report an incident?</Text>
                <Text style={styles.helpAnswer}>
                    Navigate to the "Report Incident" section and fill in the required details. Then, click "Submit."
                </Text>
            </View>

            <View style={styles.helpSection}>
                <Icon name="checkmark-circle-outline" size={24} color="#006400" style={styles.icon} />
                <Text style={styles.helpQuestion}>How can I track my incident status?</Text>
                <Text style={styles.helpAnswer}>
                    Use the "Track Incident Status" feature by entering your full name to see the current status of your report.
                </Text>
            </View>

            {/* Add more FAQs as needed */}
        </ScrollView>
    );
};

export default Help;
