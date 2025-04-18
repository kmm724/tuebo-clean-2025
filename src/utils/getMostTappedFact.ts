import AsyncStorage from '@react-native-async-storage/async-storage';

const COUNT_KEY = 'funFactCounts';

export const getMostTappedFact = async (): Promise<string | null> => {
  try {
    const stored = await AsyncStorage.getItem(COUNT_KEY);
    if (!stored) return null;

    const counts = JSON.parse(stored);
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    return sorted.length > 0 ? `${sorted[0][0]} (tapped ${sorted[0][1]} times)` : null;
  } catch (error) {
    console.error('❌ Error reading most tapped fun fact:', error);
    return null;
  }
};
