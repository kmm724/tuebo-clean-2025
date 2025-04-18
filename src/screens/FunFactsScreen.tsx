import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Speech from 'expo-speech';
import { funFacts } from '../funFactsData';
import { updateFunFactCount } from '../utils/updateFunFactCount';
import { getMostTappedFact } from '../utils/getMostTappedFact';

const FunFactsScreen = () => {
  const handlePress = (fact: string) => {
    updateFunFactCount(fact);
    console.log('🤓 Fun Fact tapped:', fact);

    const factWithoutEmoji = fact.replace(/^[^\w\s]*/, '').trim();
    Speech.speak(factWithoutEmoji);
  };

  useEffect(() => {
    const logMostTapped = async () => {
      const topFact = await getMostTappedFact();
      if (topFact) {
        console.log('🏆 Most tapped fun fact:', topFact);
      } else {
        console.log('📭 No fun fact taps yet.');
      }
    };

    logMostTapped();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fun Facts</Text>
      <FlatList
        data={funFacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={styles.factItem}
          >
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
