import React from 'react'; 
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './Styles';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/snack-icon.png')} 
                style={styles.logo} 
            />
            <Text style={styles.headerText}>Welcome to KadPoly Fire App</Text>
            <View style={styles.formContainer}>
                <TouchableOpacity 
                    style={styles.homeButton} 
                    onPress={() => navigation.navigate('UserDashboard')}
                >
                    <Text style={styles.homeButtonText}>Go to User Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.homeButton} 
                    onPress={() => navigation.navigate('AdminLogin')}
                >
                    <Text style={styles.homeButtonText}>Go to Admin Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Home;
