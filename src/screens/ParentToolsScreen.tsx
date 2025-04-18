import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParentToolsScreen = () => {
  const [recentTopics, setRecentTopics] = useState<string[]>([]);
  const [funFactCounts, setFunFactCounts] = useState<Record<string, number>>({});
  const [mostTappedFact, setMostTappedFact] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const recent = await AsyncStorage.getItem('recentTopics');
        const counts = await AsyncStorage.getItem('funFactCounts');

        if (recent) {
          setRecentTopics(JSON.parse(recent));
        }

        if (counts) {
          const parsed = JSON.parse(counts);
          setFunFactCounts(parsed);

          const sorted = Object.entries(parsed).sort((a, b) => b[1] - a[1]);
          if (sorted.length > 0) {
            setMostTappedFact(`${sorted[0][0]} (tapped ${sorted[0][1]} times)`);
          }
        }
      } catch (error) {
        console.error('❌ Error loading parent data:', error);
      }
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Parent Tools</Text>

      <Text style={styles.subheader}>🕵️‍♂️ Recent Topics Searched:</Text>
      {recentTopics.length > 0 ? (
        <FlatList
          data={recentTopics}
          keyExtractor={(item, index) => `recent-${index}`}
          renderItem={({ item }) => (
            <Text style={styles.item}>• {item}</Text>
          )}
        />
      ) : (
        <Text style={styles.item}>No searches yet.</Text>
      )}

      <Text style={styles.subheader}>🏆 Most Tapped Fun Fact:</Text>
      {mostTappedFact ? (
        <Text style={styles.item}>{mostTappedFact}</Text>
      ) : (
        <Text style={styles.item}>No fun fact taps yet.</Text>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
  },
});

export default ParentToolsScreen;
