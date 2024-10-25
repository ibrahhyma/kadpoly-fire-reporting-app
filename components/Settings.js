import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './Styles';

const Settings = () => {
    const [notificationSettings, setNotificationSettings] = useState('On');
    const [loginCredentials, setLoginCredentials] = useState({ username: 'admin', password: 'password' });

    const handleSaveSettings = () => {
        alert('Settings saved successfully!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin Settings</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Notification Settings:</Text>
                <TextInput
                    style={styles.input}
                    value={notificationSettings}
                    onChangeText={setNotificationSettings}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Admin Username:</Text>
                <TextInput
                    style={styles.input}
                    value={loginCredentials.username}
                    onChangeText={(text) => setLoginCredentials({ ...loginCredentials, username: text })}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Admin Password:</Text>
                <TextInput
                    style={styles.input}
                    value={loginCredentials.password}
                    secureTextEntry
                    onChangeText={(text) => setLoginCredentials({ ...loginCredentials, password: text })}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
                <Text style={styles.buttonText}>Save Settings</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Settings;
