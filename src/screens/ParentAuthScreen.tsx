import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const correctPin = '1234'; // You can change this later or load from storage

const ParentAuthScreen = () => {
  const [pin, setPin] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    if (pin === correctPin) {
      setPin('');
      navigation.navigate('ParentTools');
    } else {
      Alert.alert('Access Denied', 'Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Parent Access</Text>
      <Text style={styles.label}>Enter 4-Digit PIN:</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        secureTextEntry
        maxLength={4}
        value={pin}
        onChangeText={setPin}
      />
      <Button title="Enter" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ParentAuthScreen;
