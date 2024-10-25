import React, { useState, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { styles } from './Styles';
import { mockDatabase } from './mockDatabase';
import Icon from 'react-native-vector-icons/FontAwesome';

const IncidentReport = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [reportDetails, setReportDetails] = useState('');
    const [location, setLocation] = useState('');
    const [incidentDetails, setIncidentDetails] = useState('');
    const [message, setMessage] = useState('');
    const [incidentList, setIncidentList] = useState([]);

    useEffect(() => {
        setIncidentList(mockDatabase.incidents);
    }, []);

    const handleSubmit = () => {
        if (!fullName || !reportDetails || !location || !incidentDetails) {
            setMessage('Please fill out all fields.');
            return;
        }

        const newIncident = {
            id: Date.now(),
            fullName,
            reportDetails,
            location,
            incidentDetails,
            status: 'Pending',
        };

        mockDatabase.incidents.push(newIncident); 
        setIncidentList([...mockDatabase.incidents]);
        setMessage('Incident reported successfully!');
        clearInputs();
    };

    const clearInputs = () => {
        setFullName('');
        setReportDetails('');
        setLocation('');
        setIncidentDetails('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Report Incident</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name:</Text>
                <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter full name"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Report Details:</Text>
                <TextInput
                    style={styles.input}
                    value={reportDetails}
                    onChangeText={setReportDetails}
                    placeholder="Enter report details"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Location:</Text>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Enter location"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Incident Details:</Text>
                <TextInput
                    style={styles.input}
                    value={incidentDetails}
                    onChangeText={setIncidentDetails}
                    placeholder="Enter incident details"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Incident</Text>
            </TouchableOpacity>

            {message ? (
                <Text style={styles.successText}>{message}</Text>
            ) : null}

            <Text style={styles.header}>Reported Incidents</Text>
            <FlatList
                data={incidentList}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.incidentCard}>
                        <View style={styles.cardHeader}>
                            <Icon name="exclamation-circle" size={24} color="#FF6347" />
                            <Text style={styles.cardTitle}>{item.fullName}</Text>
                        </View>
                        <Text style={styles.cardText}>
                            <Icon name="info-circle" size={16} color="#4682B4" /> 
                            <Text> {item.reportDetails}</Text>
                        </Text>
                        <Text style={styles.cardText}>
                            <Icon name="map-marker" size={16} color="#32CD32" /> 
                            <Text> {item.location}</Text>
                        </Text>
                        <Text style={styles.cardText}>
                            <Icon name="file-text" size={16} color="#FFD700" /> 
                            <Text> {item.incidentDetails}</Text>
                        </Text>
                        <Text style={styles.cardStatus}>Status: <Text style={item.status === 'Resolved' ? styles.resolved : styles.pending}>{item.status}</Text></Text>
                    </View>
                )}
            />
        </View>
    );
};

export default IncidentReport;
