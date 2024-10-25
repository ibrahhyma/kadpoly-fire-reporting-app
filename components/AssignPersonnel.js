import React from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import { styles } from './Styles';
import { mockDatabase } from './mockDatabase';
import Icon from 'react-native-vector-icons/FontAwesome';

const AssignPersonnel = () => {
    const handleAssign = (incidentId, personnel) => {
        const incident = mockDatabase.incidents.find((incident) => incident.id === incidentId);

        if (incident) {
            if (incident.assignedTo) {
                Alert.alert('Assignment Error', 'Personnel is already assigned to this incident.');
                return;
            }

            incident.assignedTo = personnel;
            incident.status = 'Assigned';  // Update status to "Assigned"
            Alert.alert(`Personnel ${personnel} successfully assigned to the incident.`);
        } else {
            Alert.alert('Error', 'Incident not found.');
        }
    };

    const renderIncident = ({ item }) => (
        <View style={styles.incidentCard}>
            <Text style={styles.incidentText}>
                <Icon name="fire" size={18} color="#ff6347" /> Full Name: {item.fullName}
            </Text>
            <Text style={styles.incidentText}>
                <Icon name="map-marker" size={18} color="#4682b4" /> Location: {item.location}
            </Text>
            <Text style={styles.incidentText}>
                <Icon name={item.status === 'Resolved' ? 'check-circle' : 'exclamation-circle'} 
                    size={18} color={item.status === 'Resolved' ? '#32cd32' : '#ff6347'} />
                Status: {item.status}
            </Text>
            <Text style={styles.incidentText}>
                <Icon name="user" size={18} color="#4682b4" /> Assigned To: {item.assignedTo || 'Not Assigned'}
            </Text>

            <Text style={styles.assignLabel}>Assign Personnel:</Text>
            <FlatList
                data={mockDatabase.personnel}
                keyExtractor={(person) => person.id.toString()}
                renderItem={({ item: person }) => (
                    <TouchableOpacity
                        style={[
                            styles.assignButton,
                            item.assignedTo ? styles.disabledButton : null, // Disable button if assigned
                        ]}
                        onPress={() => handleAssign(item.id, person.name)}
                        disabled={!!item.assignedTo} // Disable if personnel is already assigned
                    >
                        <Icon name="user-plus" size={20} color="#fff" />
                        <Text style={styles.buttonText}> Assign {person.name} ({person.role})</Text>
                    </TouchableOpacity>
                )}
                nestedScrollEnabled={true} // Enables scroll within FlatList inside ScrollView
            />
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
            <Text style={styles.header}>
                <Icon name="tasks" size={24} color="#4682b4" /> Assign Personnel to Incidents
            </Text>
            <FlatList
                data={mockDatabase.incidents}
                keyExtractor={(incident) => incident.id.toString()}
                renderItem={renderIncident}
                style={styles.incidentList}
            />
        </ScrollView>
    );
};

export default AssignPersonnel;
