import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function RegistroScreen({ navigation, route }) {
  const [nombre, setNombre] = useState('');
  const [grado, setGrado] = useState('');
  const [observacion, setObservacion] = useState('');
  const [estado, setEstado] = useState('Pendiente');

  const handleSubmit = useCallback(() => {
    if (!nombre || !grado || !observacion) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (route.params && route.params.addObservacion) {
      const newObservacion = { nombre, grado, observacion, estado };
      route.params.addObservacion(newObservacion); 
      navigation.goBack(); 
    } else {
      Alert.alert("Error", "No se pudo registrar la observación.");
    }
  }, [nombre, grado, observacion, estado, route, navigation]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput 
          style={styles.input} 
          value={nombre} 
          onChangeText={setNombre} 
          placeholder="Ingrese el nombre" 
        />

        <Text style={styles.label}>Grado:</Text>
        <TextInput 
          style={styles.input} 
          value={grado} 
          onChangeText={setGrado} 
          placeholder="Ingrese el grado" 
        />

        <Text style={styles.label}>Observación:</Text>
        <TextInput 
          style={styles.input} 
          value={observacion} 
          onChangeText={setObservacion} 
          placeholder="Escribe la observación" 
        />

        <Text style={styles.label}>Estado de la Observación:</Text>
        <Picker
          selectedValue={estado}
          style={styles.picker}
          onValueChange={(itemValue) => setEstado(itemValue)}
        >
          <Picker.Item label="Pendiente" value="Pendiente" />
          <Picker.Item label="Finalizada" value="Finalizada" />
        </Picker>

        <Button title="Enviar" onPress={handleSubmit} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});
