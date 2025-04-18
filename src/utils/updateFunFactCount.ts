import AsyncStorage from '@react-native-async-storage/async-storage';

const COUNT_KEY = 'funFactCounts';

export const updateFunFactCount = async (fact: string) => {
  try {
    const stored = await AsyncStorage.getItem(COUNT_KEY);
    const counts = stored ? JSON.parse(stored) : {};

    // Increase count
    counts[fact] = (counts[fact] || 0) + 1;

    await AsyncStorage.setItem(COUNT_KEY, JSON.stringify(counts));
    console.log(`🔢 Updated count for: "${fact}" → ${counts[fact]}`);
  } catch (error) {
    console.error('❌ Error updating fun fact count:', error);
  }
};
