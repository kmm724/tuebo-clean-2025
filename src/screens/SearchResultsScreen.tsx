import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const SearchResultsScreen = () => {
  const route = useRoute();
  const { searchTerm } = route.params as { searchTerm: string };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for: {searchTerm}</Text>
      <Text>(Pretend results go here!)</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default SearchResultsScreen;
