import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (!usuario.trim()) {
      return Alert.alert('Atenção', 'Digite o usuário');
    }
    if (!senha.trim()) {
      return Alert.alert('Atenção', 'Digite a senha');
    }

    try {
      const res = await fetch('https://projeto-arrais-api.onrender.com/usuario/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await res.json();

      if (data && data.usuario) {
        Alert.alert('Login realizado com sucesso!');
        router.replace('/');
      } else {
        Alert.alert('Falha', 'Login inválido.');
      }
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder="Digite seu usuário"
          placeholderTextColor="#888"
          style={styles.input}
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#888"
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <ThemedText style={styles.primaryButtonText}>Entrar</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
          <ThemedText style={styles.secondaryButtonText}>Voltar</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  form: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d9d9d9',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },
  primaryButton: {
    backgroundColor: '#1890ff',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#595959',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
