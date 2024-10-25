import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { styles } from './Styles';
import { mockDatabase } from './mockDatabase';

const ManageIncidents = () => {
    const [incidents, setIncidents] = useState(mockDatabase.incidents);
    const [personnel] = useState(mockDatabase.personnel);

    const handleUpdateIncident = (id, status) => {
        const updatedIncidents = incidents.map(incident => {
            if (incident.id === id) {
                return { ...incident, status: status };
            }
            return incident;
        });

        setIncidents(updatedIncidents);
        Alert.alert('Success', 'Incident updated successfully');
    };

    const handleDeleteIncident = (id) => {
        const updatedIncidents = incidents.filter(incident => incident.id !== id);
        setIncidents(updatedIncidents);
        Alert.alert('Success', 'Incident deleted successfully');
    };

    const handleAssignPersonnel = (id, personnelName) => {
        const updatedIncidents = incidents.map(incident => {
            if (incident.id === id) {
                return { ...incident, assignedTo: personnelName };
            }
            return incident;
        });

        setIncidents(updatedIncidents);
        Alert.alert('Success', `${personnelName} assigned to the incident.`);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.header}>Manage Incidents</Text>

            {incidents.map((incident) => (
                <View key={incident.id} style={styles.incidentCard}>
                    <Text style={styles.incidentText}>Full Name: {incident.fullName}</Text>
                    <Text style={styles.incidentText}>Location: {incident.location}</Text>
                    <Text style={styles.incidentText}>Status: {incident.status}</Text>
                    <Text style={styles.incidentText}>Assigned To: {incident.assignedTo || 'Not Assigned'}</Text>
                    <Text style={styles.incidentText}>Report Details: {incident.reportDetails}</Text>
                    <Text style={styles.incidentText}>Incident Details: {incident.incidentDetails}</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.fullWidthButton]}
                            onPress={() => handleUpdateIncident(incident.id, 'Resolved')}
                        >
                            <Text style={styles.buttonText}>Mark as Resolved</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.fullWidthButton]}
                            onPress={() => handleDeleteIncident(incident.id)}
                        >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.fullWidthButton]}
                            onPress={() => handleAssignPersonnel(incident.id, personnel[0].name)}
                        >
                            <Text style={styles.buttonText}>Assign to {personnel[0].name}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default ManageIncidents;
