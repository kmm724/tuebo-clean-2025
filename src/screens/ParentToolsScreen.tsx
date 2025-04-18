import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ParentToolsScreen = () => {
  const [recentTopics, setRecentTopics] = useState<string[]>([]);
  const [funFactCounts, setFunFactCounts] = useState<Record<string, number>>({});
  const [mostTappedFact, setMostTappedFact] = useState<string | null>(null);

  const navigation = useNavigation();

  const loadData = async () => {
    try {
      const recent = await AsyncStorage.getItem('recentTopics');
      const counts = await AsyncStorage.getItem('funFactCounts');

      if (recent) {
        setRecentTopics(JSON.parse(recent));
      } else {
        setRecentTopics([]);
      }

      if (counts) {
        const parsed = JSON.parse(counts);
        setFunFactCounts(parsed);

        const sorted = Object.entries(parsed).sort((a, b) => b[1] - a[1]);
        if (sorted.length > 0) {
          setMostTappedFact(`${sorted[0][0]} (tapped ${sorted[0][1]} times)`);
        } else {
          setMostTappedFact(null);
        }
      } else {
        setFunFactCounts({});
        setMostTappedFact(null);
      }
    } catch (error) {
      console.error('❌ Error loading parent data:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('recentTopics');
      await AsyncStorage.removeItem('funFactCounts');
      console.log('🧼 Cleared recent topics and fun fact counts');
      Alert.alert('History Cleared', 'All stored data has been removed.');
      loadData();
    } catch (error) {
      console.error('❌ Error clearing history:', error);
    }
  };

  const handleLogout = () => {
    navigation.navigate('ParentAuth'); // Go back to PIN screen
  };

  useEffect(() => {
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

      <View style={styles.buttonContainer}>
        <Button title="Clear History" onPress={clearHistory} color="#d62828" />
        <View style={styles.spacer} />
        <Button title="Log Out" onPress={handleLogout} color="#1d3557" />
      </View>
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
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  spacer: {
    height: 12,
  },
});

export default ParentToolsScreen;
