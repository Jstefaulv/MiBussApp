import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface InputMicroProps {
  texto: string;
  onChangeTexto: (text: string) => void;
  onPressEnviar: () => void;
}

export default function InputMicro({ texto, onChangeTexto, onPressEnviar }: InputMicroProps) {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Escribe aquí la micro"
        placeholderTextColor="#999"
        value={texto}
        onChangeText={onChangeTexto}
        selectionColor="#000"
      />
      <TouchableOpacity style={styles.boton} onPress={onPressEnviar}>
        <Text style={styles.textoBoton}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});