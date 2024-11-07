import { enableScreens } from 'react-native-screens';
enableScreens(); // Habilita react-native-screens

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlumnosRegistrados from './screens/AlumnosRegistradosScreen';
import RegistroScreen from './screens/RegistroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AlumnosRegistrados">
        <Stack.Screen 
          name="AlumnosRegistrados" 
          component={AlumnosRegistrados} 
          options={{ title: 'Alumnos que están registrados' }} 
        />
        <Stack.Screen 
          name="Registro" 
          component={RegistroScreen} 
          options={{ title: 'Registrar Observación' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
