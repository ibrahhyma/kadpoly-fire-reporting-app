// mockDatabase.js

const mockDatabase = {
    personnel: [
        { id: 1, name: 'Alice Johnson', role: 'Firefighter' },
        { id: 2, name: 'Bob Smith', role: 'Safety Officer' },
        { id: 3, name: 'Charlie Brown', role: 'Emergency Response Coordinator' },
        { id: 4, name: 'Diana Prince', role: 'Fire Safety Inspector' },
        { id: 5, name: 'Ethan Hunt', role: 'Logistics Coordinator' },
    ],
    users: [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', incidentReports: 2 },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', incidentReports: 1 },
        { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', incidentReports: 0 },
        { id: 4, name: 'Sarah Connor', email: 'sarah.connor@example.com', incidentReports: 3 },
        { id: 5, name: 'Bruce Wayne', email: 'bruce.wayne@example.com', incidentReports: 4 },
    ],
    incidents: [
        {
            id: 1,
            fullName: 'John Doe',
            location: 'Science Building',
            status: 'Unresolved',
            assignedTo: null,
            reportDetails: 'Flames visible from the windows.',
            incidentDetails: 'The fire started in the chemistry lab.',
        },
        {
            id: 2,
            fullName: 'Jane Smith',
            location: 'Main Cafeteria',
            status: 'Resolved',
            assignedTo: 'Alice Johnson',
            reportDetails: 'Heavy smoke detected.',
            incidentDetails: 'False alarm, smoke from cooking.',
        },
        {
            id: 3,
            fullName: 'Mike Johnson',
            location: 'Chemistry Building',
            status: 'Unresolved',
            assignedTo: null,
            reportDetails: 'Spilled chemicals, potential hazards.',
            incidentDetails: 'Need to evacuate the area.',
        },
        {
            id: 4,
            fullName: 'Sarah Connor',
            location: 'Library',
            status: 'Unresolved',
            assignedTo: 'Bob Smith',
            reportDetails: 'Sparks coming from electrical panel.',
            incidentDetails: 'Evacuate immediately.',
        },
        {
            id: 5,
            fullName: 'Bruce Wayne',
            location: 'Gymnasium',
            status: 'Resolved',
            assignedTo: 'Charlie Brown',
            reportDetails: 'Alarm sounded due to faulty sensors.',
            incidentDetails: 'No fire detected.',
        },
        {
            id: 6,
            fullName: 'John Doe',
            location: 'Parking Lot',
            status: 'Unresolved',
            assignedTo: null,
            reportDetails: 'Car fire in the lot.',
            incidentDetails: 'Emergency response is on the way.',
        },
        {
            id: 7,
            fullName: 'Sarah Connor',
            location: 'Auditorium',
            status: 'Resolved',
            assignedTo: 'Diana Prince',
            reportDetails: 'Smoke alarm triggered during the event.',
            incidentDetails: 'No fire detected; malfunction confirmed.',
        },
    ],
    notifications: [
        { id: 1, message: 'Fire drill scheduled for 10 AM tomorrow.' },
        { id: 2, message: 'Emergency meeting at 3 PM in the admin office.' },
        { id: 3, message: 'New safety protocols have been implemented.' },
        { id: 4, message: 'All personnel must attend the safety briefing next week.' },
        { id: 5, message: 'Updated fire safety equipment has been installed in all buildings.' },
    ],
};

// Fetch function to get incident status by name
const fetchIncidentStatus = (name) => {
    return mockDatabase.incidents.find(incident => incident.fullName.toLowerCase() === name.toLowerCase());
};

export { mockDatabase, fetchIncidentStatus };
