import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Styles';

const AdminLogout = ({ navigation }) => {
    const handleLogout = () => {
        navigation.navigate('Home'); // Redirect to Home instead of AdminLogin
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Are you sure you want to log out?</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AdminLogout;
