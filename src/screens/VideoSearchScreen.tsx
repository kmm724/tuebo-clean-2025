import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';

const sampleVideos = [
  {
    id: 'HGeuA4iJ8vI', // How big is the ocean?
    title: 'How Big is the Ocean?',
  },
  {
    id: 'dQw4w9WgXcQ', // Kid-safe video placeholder (replace this)
    title: 'Fun with Dinosaurs!',
  },
  {
    id: 'gBnvGSg2Ekk', // Why do we yawn?
    title: 'Why Do We Yawn?',
  },
];

const VideoSearchScreen = () => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: typeof sampleVideos[0] }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => setSelectedVideoId(item.id)}
    >
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderPlayer = () => {
    if (!selectedVideoId) return null;
    return (
      <View style={styles.webviewContainer}>
        <WebView
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: `https://www.youtube.com/embed/${selectedVideoId}?controls=1&modestbranding=1&rel=0` }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Video Search Results</Text>
      {renderPlayer()}
      <FlatList
        data={sampleVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  list: {
    padding: 20,
  },
  videoItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  webviewContainer: {
    height: (width * 9) / 16,
    width: '100%',
    marginBottom: 10,
  },
  webview: {
    flex: 1,
  },
});

export default VideoSearchScreen;
