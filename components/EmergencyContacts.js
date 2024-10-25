import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons
import { styles } from './Styles';

const emergencyContacts = [
    { name: 'Fire Department', number: '911', icon: 'flame' },
    { name: 'Police Department', number: '999', icon: 'shield-checkmark' },
    { name: 'KadPoly Security', number: '08012345678', icon: 'lock-closed' },
];

const EmergencyContacts = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Emergency Contacts</Text>

            {emergencyContacts.map((contact, index) => (
                <View key={index} style={styles.contactCard}>
                    <Icon name={contact.icon} size={30} color="#006400" style={styles.contactIcon} />
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactName}>{contact.name}</Text>
                        <TouchableOpacity style={styles.callButton}>
                            <Text style={styles.callButtonText}>Call {contact.number}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default EmergencyContacts;
