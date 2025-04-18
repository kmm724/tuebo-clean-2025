import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'recentTopics';

export const saveRecentTopic = async (term: string) => {
  try {
    const trimmed = term.trim();
    if (!trimmed) return;

    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const topics = stored ? JSON.parse(stored) : [];

    // Avoid duplicates
    if (!topics.includes(trimmed)) {
      topics.unshift(trimmed); // Add to beginning
      const limitedTopics = topics.slice(0, 10); // Limit to last 10
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(limitedTopics));
      console.log('✅ Saved recent topic:', trimmed);
    }
  } catch (error) {
    console.error('❌ Error saving recent topic:', error);
  }
};
