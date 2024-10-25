// src/screens/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BarChart } from 'react-native-chart-kit';
import ScrollContainer from '../components/ScrollContainer'; // Import ScrollContainer
import { styles } from './Styles';
import { mockDatabase } from './mockDatabase'; 
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {
    const navigation = useNavigation();
    const [totalIncidents, setTotalIncidents] = useState(0);
    const [resolvedIncidents, setResolvedIncidents] = useState(0);
    const [unresolvedIncidents, setUnresolvedIncidents] = useState(0);
    const [totalPersonnel, setTotalPersonnel] = useState(0);

    useEffect(() => {
        if (mockDatabase && mockDatabase.incidents && mockDatabase.personnel) {
            const incidents = mockDatabase.incidents;
            const personnel = mockDatabase.personnel;

            setTotalIncidents(incidents.length);
            setResolvedIncidents(incidents.filter(incident => incident.status === 'Resolved').length);
            setUnresolvedIncidents(incidents.filter(incident => incident.status === 'Unresolved').length);
            setTotalPersonnel(personnel.length);
        } else {
            console.error('mockDatabase or its properties are undefined');
        }
    }, []);

    const screenWidth = Dimensions.get('window').width;

    const handleLogout = () => {
        navigation.navigate('AdminLogout');
    };

    const handleSettings = () => {
        navigation.navigate('Settings');
    };

    return (
        <ScrollContainer>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Admin Dashboard</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={handleSettings} style={styles.iconButton}>
                        <Icon name="settings" size={24} color="#003300" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
                        <Icon name="logout" size={24} color="#ff6347" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ManageIncidents')}>
                    <Icon name="fire-extinguisher" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Manage Incidents</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('IncidentTracking')}>
                    <Icon name="track-changes" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Track Incidents</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ManagePersonnel')}>
                    <Icon name="people" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Manage Personnel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AssignPersonnel')}>
                    <Icon name="assignment-ind" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Assign Personnel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UserManagement')}>
                    <Icon name="supervisor-account" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>User Management</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Notifications')}>
                    <Icon name="notifications" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Manage Notifications</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.nonClickableCard}>
                    <Icon name="format-list-numbered" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Total Incidents</Text>
                    <Text style={styles.cardValue}>{totalIncidents}</Text>
                </View>

                <View style={styles.nonClickableCard}>
                    <Icon name="check-circle" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Resolved Incidents</Text>
                    <Text style={styles.cardValue}>{resolvedIncidents}</Text>
                </View>

                <View style={styles.nonClickableCard}>
                    <Icon name="error" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Unresolved Incidents</Text>
                    <Text style={styles.cardValue}>{unresolvedIncidents}</Text>
                </View>

                <View style={styles.nonClickableCard}>
                    <Icon name="people" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Total Personnel</Text>
                    <Text style={styles.cardValue}>{totalPersonnel}</Text>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Incident Statistics</Text>
                <BarChart
                    data={{
                        labels: ['Total', 'Resolved', 'Unresolved'],
                        datasets: [{ data: [totalIncidents, resolvedIncidents, unresolvedIncidents] }]
                    }}
                    width={screenWidth * 0.9}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#fff',
                        backgroundGradientFrom: '#006400',
                        backgroundGradientTo: '#006400',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 16 },
                    }}
                    style={{ marginVertical: 20 }}
                />
            </View>
        </ScrollContainer>
    );
};

export default AdminDashboard;
