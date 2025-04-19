import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const sampleVideos = [
  {
    id: '7y2C8Gq3Cgo',
    title: 'What Do Germs Look Like?',
  },
  {
    id: 'v9pzmYkN4jY',
    title: 'The Solar System',
  },
  {
    id: 'Yl4aT7ZvzKE',
    title: 'What Is Sound?',
  },
];

const VideoSearchScreen = () => {
  const [playing, setPlaying] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const playerRef = useRef(null);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const renderPlayer = () => {
    if (!selectedVideoId) {
      console.log('No video selected yet');
      return null;
    }

    console.log('Rendering player for:', selectedVideoId);

    return (
      <View style={styles.playerContainer}>
        <YoutubePlayer
          ref={playerRef}
          height={220}
          play={playing}
          videoId={selectedVideoId}
          onChangeState={(event) => {
            if (event === 'ended') {
              setPlaying(false);
            }
          }}
        />
      </View>
    );
  };

  const renderItem = ({ item }: { item: typeof sampleVideos[0] }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => {
        console.log('Playing:', item.id);
        setSelectedVideoId(item.id);
        setPlaying(true);
      }}
    >
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

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
  playerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default VideoSearchScreen;
