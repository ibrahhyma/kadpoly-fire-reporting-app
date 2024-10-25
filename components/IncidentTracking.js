import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { styles } from './Styles';
import { mockDatabase } from './mockDatabase'; // Adjusted import statement
import * as Linking from 'expo-linking';

const IncidentTracking = () => {
    const [location, setLocation] = useState('');
    const [incidents, setIncidents] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    // Get user's current location when the component mounts
    useEffect(() => {
        const getLocation = async () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                },
                (error) =>
                    Alert.alert("Error", "Unable to retrieve location. Please enable location services."),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        };
        getLocation();
    }, []);

    const handleTrack = () => {
        // Filter incidents based on the provided location
        const foundIncidents = mockDatabase.incidents.filter(
            (incident) => incident.location.toLowerCase() === location.toLowerCase()
        );
        setIncidents(foundIncidents);
    };

    const openGoogleMaps = (incidentLocation) => {
        const encodedLocation = encodeURIComponent(incidentLocation);
        const url =
            Platform.OS === 'ios' || Platform.OS === 'android'
                ? `geo:0,0?q=${encodedLocation}` // Opens Google Maps app if available
                : `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`; // Fallback to web URL
        Linking.openURL(url).catch(() => {
            Alert.alert("Error", "Failed to open Google Maps. Please try again.");
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Track Incidents by Location</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Enter Location:</Text>
                <TextInput
                    style={styles.input}
                    value={location}
                    onChangeText={setLocation}
                    placeholder="Location"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleTrack}>
                <Text style={styles.buttonText}>Track Incidents</Text>
            </TouchableOpacity>

            {incidents.length > 0 ? (
                incidents.map((incident) => (
                    <View key={incident.id} style={styles.incidentCard}>
                        <Text style={styles.incidentText}>Full Name: {incident.fullName}</Text>
                        <Text style={styles.incidentText}>Location: {incident.location}</Text>
                        <Text style={styles.incidentText}>Status: {incident.status}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => openGoogleMaps(incident.location)}
                        >
                            <Text style={styles.buttonText}>View on Google Maps</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text>No incidents found for this location.</Text>
            )}
        </View>
    );
};

export default IncidentTracking;
