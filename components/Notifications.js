import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import { mockDatabase } from './mockDatabase'; // Ensure this path is correct
import Icon from 'react-native-vector-icons/FontAwesome';

const screenWidth = Dimensions.get('window').width;

const Notifications = () => {
    const [message, setMessage] = useState('');
    const [notifications, setNotifications] = useState(mockDatabase.notifications);
    const [editIndex, setEditIndex] = useState(null); // Track the index of the notification being edited

    const handleSendNotification = () => {
        if (message.trim()) {
            if (editIndex !== null) {
                // Update existing notification
                const updatedNotifications = notifications.map((notif, index) =>
                    index === editIndex ? { ...notif, message } : notif
                );
                setNotifications(updatedNotifications);
                mockDatabase.notifications = updatedNotifications; // Update mock database
                setEditIndex(null); // Clear edit mode
            } else {
                // Create new notification
                const newNotification = { id: notifications.length + 1, message };
                setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
                mockDatabase.notifications.push(newNotification); // Update the mock database
            }
            alert('Notification sent: ' + message);
            setMessage(''); // Clear input field
        } else {
            alert('Please enter a message before sending.');
        }
    };

    const handleEditNotification = (index) => {
        setMessage(notifications[index].message); // Set the message to the input for editing
        setEditIndex(index); // Set the index for editing
    };

    const handleDeleteNotification = (id) => {
        const updatedNotifications = notifications.filter(notif => notif.id !== id);
        setNotifications(updatedNotifications);
        mockDatabase.notifications = updatedNotifications; // Update mock database
        alert('Notification deleted.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Send Notifications</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Message:</Text>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Enter notification message"
                    multiline
                    numberOfLines={4}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSendNotification}>
                <Icon name="paper-plane" size={20} color="#fff" />
                <Text style={styles.buttonText}>{editIndex !== null ? 'Update Notification' : 'Send Notification'}</Text>
            </TouchableOpacity>

            <View style={styles.notificationList}>
                <Text style={styles.listHeader}>Sent Notifications</Text>
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.notificationItem}>
                            <Text style={styles.notificationText}>{item.message}</Text>
                            <View style={styles.iconContainer}>
                                <TouchableOpacity onPress={() => handleEditNotification(index)}>
                                    <Icon name="edit" size={20} color="#006400" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteNotification(item.id)}>
                                    <Icon name="trash" size={20} color="#ff0000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#003300',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        fontSize: 16,
        color: '#003300',
        marginBottom: 5,
    },
    input: {
        height: 100, // Increased height for multiline input
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width: '90%',
    },
    button: {
        backgroundColor: '#006400',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 10,
    },
    notificationList: {
        marginTop: 20,
        width: '100%',
    },
    listHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    notificationItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between text and icons
        alignItems: 'center',
    },
    notificationText: {
        fontSize: 16,
        flex: 1, // Make text flexible to take available space
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Notifications;
