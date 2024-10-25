import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from './components/AdminDashboard';
import ManageIncidents from './components/ManageIncidents';
import IncidentTracking from './components/IncidentTracking';
import ManagePersonnel from './components/ManagePersonnel';
import AssignPersonnel from './components/AssignPersonnel';
import UserManagement from './components/UserManagement';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import AdminLogout from './components/AdminLogout';
import Home from './components/Home'; // Ensure Home is correctly imported
import UserDashboard from './components/UserDashboard'; // Import UserDashboard
import AdminLogin from './components/AdminLogin'; // Import AdminLogin
import ReportIncident from './components/IncidentReport'; // Import ReportIncident
import TrackIncidentStatus from './components/TrackIncidentStatus'; // Import TrackIncidentStatus
import EmergencyContacts from './components/EmergencyContacts'; // Import EmergencyContacts
import Help from './components/Help'; // Import Help

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="ManageIncidents" component={ManageIncidents} />
        <Stack.Screen name="IncidentTracking" component={IncidentTracking} />
        <Stack.Screen name="ManagePersonnel" component={ManagePersonnel} />
        <Stack.Screen name="AssignPersonnel" component={AssignPersonnel} />
        <Stack.Screen name="UserManagement" component={UserManagement} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="AdminLogout" component={AdminLogout} />
        <Stack.Screen name="ReportIncident" component={ReportIncident} />
        <Stack.Screen name="TrackIncidentStatus" component={TrackIncidentStatus} />
        <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
