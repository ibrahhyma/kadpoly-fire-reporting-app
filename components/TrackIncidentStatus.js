import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './Styles'; // Import your existing styles
import { fetchIncidentStatus } from './mockDatabase'; // Import the fetch function

const TrackIncidentStatus = () => {
    const [name, setName] = useState('');
    const [incidentStatus, setIncidentStatus] = useState(null);
    const [error, setError] = useState('');

    const handleTrackStatus = () => {
        const status = fetchIncidentStatus(name);
        if (status) {
            setIncidentStatus(status);
            setError('');
        } else {
            setIncidentStatus(null);
            setError('No incident found for this name.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Track Incident Status</Text>

            {/* Form Card */}
            <View style={styles.formCard}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter your full name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Full Name"
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleTrackStatus}>
                    <Text style={styles.buttonText}>Track Status</Text>
                </TouchableOpacity>

                {error && <Text style={styles.errorText}>{error}</Text>}
            </View>

            {/* Status Card */}
            {incidentStatus && (
                <View style={styles.statusCard}>
                    <View style={styles.cardContent}>
                        <Text style={styles.statusText}>
                            <Text style={styles.boldText}>Full Name: </Text>{incidentStatus.fullName}
                        </Text>
                        <Text style={styles.statusText}>
                            <Text style={styles.boldText}>Report Details: </Text>{incidentStatus.reportDetails}
                        </Text>
                        <Text style={styles.statusText}>
                            <Text style={styles.boldText}>Location: </Text>{incidentStatus.location}
                        </Text>
                        <Text style={styles.statusText}>
                            <Text style={styles.boldText}>Incident Details: </Text>{incidentStatus.incidentDetails}
                        </Text>
                        <Text style={styles.statusText}>
                            <Text style={styles.boldText}>Status: </Text>{incidentStatus.status}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default TrackIncidentStatus;
