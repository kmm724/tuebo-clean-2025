import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { funFacts } from '../funFactsData';

const FunFactsScreen = () => {
  const handlePress = (fact: string) => {
    console.log('🤓 Fun Fact tapped:', fact);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fun Facts</Text>
      <FlatList
        data={funFacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.factItem}>
            <Text style={styles.factText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  factItem: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  factText: {
    fontSize: 16,
  },
});

export default FunFactsScreen;
