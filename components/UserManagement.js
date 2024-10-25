import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { mockDatabase } from './mockDatabase'; // Ensure this path is correct
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icons

const UserManagement = () => {
    const [personnel, setPersonnel] = useState(mockDatabase.personnel); // Manage personnel state
    const [newPersonnelName, setNewPersonnelName] = useState('');
    const [newPersonnelRole, setNewPersonnelRole] = useState('');
    const [editingIndex, setEditingIndex] = useState(-1); // Track editing state

    const handleAddPersonnel = () => {
        if (newPersonnelName.trim() && newPersonnelRole.trim()) {
            const newPersonnel = {
                id: personnel.length + 1,
                name: newPersonnelName,
                role: newPersonnelRole
            };
            setPersonnel([...personnel, newPersonnel]); // Update personnel state
            mockDatabase.personnel.push(newPersonnel); // Update mock database
            setNewPersonnelName('');
            setNewPersonnelRole('');
            Alert.alert('Success', 'Personnel added successfully!');
        } else {
            Alert.alert('Error', 'Please enter both name and role.');
        }
    };

    const handleEditPersonnel = (index) => {
        const person = personnel[index];
        setNewPersonnelName(person.name);
        setNewPersonnelRole(person.role);
        setEditingIndex(index);
    };

    const handleUpdatePersonnel = () => {
        if (newPersonnelName.trim() && newPersonnelRole.trim() && editingIndex >= 0) {
            const updatedPersonnel = [...personnel];
            updatedPersonnel[editingIndex] = { 
                id: updatedPersonnel[editingIndex].id, 
                name: newPersonnelName, 
                role: newPersonnelRole 
            };
            setPersonnel(updatedPersonnel); // Update personnel state
            mockDatabase.personnel[editingIndex] = updatedPersonnel[editingIndex]; // Update mock database
            setNewPersonnelName('');
            setNewPersonnelRole('');
            setEditingIndex(-1);
            Alert.alert('Success', 'Personnel updated successfully!');
        } else {
            Alert.alert('Error', 'Please enter both name and role.');
        }
    };

    const handleDeletePersonnel = (index) => {
        const updatedPersonnel = personnel.filter((_, i) => i !== index);
        setPersonnel(updatedPersonnel); // Update personnel state
        mockDatabase.personnel = updatedPersonnel; // Update mock database
        Alert.alert('Success', 'Personnel deleted successfully!');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Personnel Management</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newPersonnelName}
                    onChangeText={setNewPersonnelName}
                    placeholder="Enter personnel name"
                />
                <TextInput
                    style={styles.input}
                    value={newPersonnelRole}
                    onChangeText={setNewPersonnelRole}
                    placeholder="Enter personnel role"
                />
                <TouchableOpacity style={styles.button} onPress={editingIndex === -1 ? handleAddPersonnel : handleUpdatePersonnel}>
                    <Text style={styles.buttonText}>{editingIndex === -1 ? 'Add Personnel' : 'Update Personnel'}</Text>
                </TouchableOpacity>
            </View>

            {personnel.map((person, index) => (
                <View key={person.id} style={styles.userCard}>
                    <Text style={styles.userText}>Name: {person.name}</Text>
                    <Text style={styles.userText}>Role: {person.role}</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={() => handleEditPersonnel(index)}>
                            <Icon name="edit" size={24} color="#007bff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeletePersonnel(index)}>
                            <Icon name="delete" size={24} color="#ff0000" />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginVertical: 8,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    userCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        elevation: 2,
    },
    userText: {
        fontSize: 16,
        marginBottom: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
});

export default UserManagement;
