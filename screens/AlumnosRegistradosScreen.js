import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';

export default function AlumnosRegistrados({ route, navigation }) {
  // Obtener la función addObservacion pasada por parámetros
  const { addObservacion } = route.params || {}; 

  const [nombre, setNombre] = useState('');
  const [observacion, setObservacion] = useState('');

  // Lista de alumnos (en un caso real esto podría ser cargado desde una API o base de datos)
  const [alumnos, setAlumnos] = useState([
    { id: '1', nombre: 'Juan Pérez', grado: '10°' },
    { id: '2', nombre: 'María González', grado: '11°' },
    { id: '3', nombre: 'Carlos López', grado: '12°' },
  ]);

  // Función para agregar la observación
  const handleAddObservacion = () => {
    if (!nombre || !observacion) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (addObservacion) {
      const newObservacion = {
        nombre,
        observacion,
        estado: 'Pendiente', // Estado inicial de la observación
      };
      addObservacion(newObservacion); // Llamar a la función recibida para agregar la observación
      setNombre(''); // Limpiar el campo nombre
      setObservacion(''); // Limpiar el campo observación
    } else {
      Alert.alert('Error', 'No se pudo registrar la observación. Verifica la función de agregar observación.');
    }
  };

  // Renderizado de la lista de alumnos
  const renderItem = ({ item }) => (
    <View style={styles.alumnoContainer}>
      <Text style={styles.alumnoText}>{item.nombre} - {item.grado}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Registro', { alumno: item, addObservacion })}
      >
        <Text style={styles.addButtonText}>Agregar Observación</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alumnos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del alumno"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Observación"
        value={observacion}
        onChangeText={setObservacion}
      />
      <Button title="Guardar Observación" onPress={handleAddObservacion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  alumnoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  alumnoText: {
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },
});
