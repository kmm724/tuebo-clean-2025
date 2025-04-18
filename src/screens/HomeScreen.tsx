import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (trimmed.length > 0) {
      navigation.navigate('SearchResults', { searchTerm: trimmed });
      setSearchTerm('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What do you want to learn about?</Text>
      <TextInput
        style={styles.input}
        placeholder="Type a topic..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default HomeScreen;
