import React from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './Styles';

const UserDashboard = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Render User Dashboard within a Text component */}
            <Text style={styles.headerText}>User Dashboard</Text>

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ReportIncident')}>
                    <Icon name="report-problem" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Report Incident</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('TrackIncidentStatus')}>
                    <Icon name="track-changes" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Track Incident Status</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EmergencyContacts')}>
                    <Icon name="contacts" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Emergency Contacts</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Help')}>
                    <Icon name="help-outline" size={30} color="#003300" />
                    <Text style={styles.cardTitle}>Help</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default UserDashboard;
