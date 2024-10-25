import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { mockDatabase } from './mockDatabase'; // Ensure this path is correct

const ManagePersonnel = () => {
    const [personnelName, setPersonnelName] = useState('');
    const [personnelRole, setPersonnelRole] = useState('');
    const [editingId, setEditingId] = useState(null); // Track the ID of the personnel being edited

    const handleAddPersonnel = () => {
        if (personnelName.trim() && personnelRole.trim()) {
            if (editingId) {
                // Update existing personnel
                const index = mockDatabase.personnel.findIndex(person => person.id === editingId);
                if (index !== -1) {
                    mockDatabase.personnel[index] = { id: editingId, name: personnelName, role: personnelRole };
                    Alert.alert('Success', 'Personnel updated successfully!');
                }
                setEditingId(null); // Reset editing state
            } else {
                // Create a new personnel object with an id based on the current length
                const newPersonnel = {
                    id: mockDatabase.personnel.length + 1, // Simple ID generation
                    name: personnelName,
                    role: personnelRole,
                };

                mockDatabase.personnel.push(newPersonnel);
                Alert.alert('Success', 'Personnel added successfully!');
            }

            setPersonnelName(''); // Clear input field
            setPersonnelRole(''); // Clear role field
        } else {
            Alert.alert('Error', 'Please enter both personnel name and role.');
        }
    };

    const handleEditPersonnel = (id) => {
        const personnelToEdit = mockDatabase.personnel.find(person => person.id === id);
        if (personnelToEdit) {
            setPersonnelName(personnelToEdit.name);
            setPersonnelRole(personnelToEdit.role); // Set the role for editing
            setEditingId(id); // Set the editing ID
        }
    };

    const handleDeletePersonnel = (id) => {
        mockDatabase.personnel = mockDatabase.personnel.filter(person => person.id !== id);
        Alert.alert('Success', 'Personnel deleted successfully!');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Manage Personnel</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Personnel Name:</Text>
                <TextInput
                    style={styles.input}
                    value={personnelName}
                    onChangeText={setPersonnelName}
                    placeholder="Enter personnel name"
                />
                <Text style={styles.label}>Role:</Text>
                <TextInput
                    style={styles.input}
                    value={personnelRole}
                    onChangeText={setPersonnelRole}
                    placeholder="Enter personnel role"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleAddPersonnel}>
                <Text style={styles.buttonText}>{editingId ? 'Update Personnel' : 'Add Personnel'}</Text>
            </TouchableOpacity>

            <View style={styles.listContainer}>
                <Text style={styles.listHeader}>Available Personnel</Text>
                {mockDatabase.personnel.map((personnel) => (
                    <View key={personnel.id} style={styles.listItemContainer}>
                        <Text style={styles.listItem}>{`${personnel.name} (${personnel.role})`}</Text>
                        <View style={styles.actionButtons}>
                            <TouchableOpacity onPress={() => handleEditPersonnel(personnel.id)} style={styles.editButton}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDeletePersonnel(personnel.id)} style={styles.deleteButton}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
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
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    listContainer: {
        marginTop: 20,
    },
    listHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    listItem: {
        fontSize: 16,
    },
    actionButtons: {
        flexDirection: 'row',
    },
    editButton: {
        backgroundColor: '#ffc107',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        borderRadius: 5,
        padding: 5,
    },
});

export default ManagePersonnel;
