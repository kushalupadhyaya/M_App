import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

function formatTime(millis = 0) {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(seconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}

export default function FreeScreen({ route, navigation }) {
  const { meditation } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  async function loadAudio() {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true, // This option is important
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false
    });

    const { sound } = await Audio.Sound.createAsync(
      { uri: meditation.url },
      { shouldPlay: isPlaying, isLooping: false },
      updateState
    );
    setSound(sound);
  }

  async function updateState(newState) {
    setDuration(newState.durationMillis);
    setPosition(newState.positionMillis);
    setIsPlaying(newState.isPlaying);
  }

  async function handlePlayPause() {
    isPlaying ? await sound.pauseAsync() : await sound.playAsync();
  }

  async function handleSliderValueChange(value) {
    await sound.setPositionAsync(value);
  }

  useEffect(() => {
    loadAudio();
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: meditation.imageUrl }} 
        style={styles.image}
      />
      <Text style={styles.title}>{meditation.name}</Text>
      
      <View style={styles.playerContainer}>
        <Slider
          style={{ width: '80%', height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={handleSliderValueChange}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#000000"
        />
        <View style={styles.timerContainer}>
          <Text>{formatTime(position)}</Text>
          <Text>{formatTime(duration)}</Text>
        </View>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          <MaterialIcons 
            name={isPlaying ? "pause" : "play-arrow"} 
            size={44} 
            color="black" 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{meditation.brief_description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '30%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  playerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  trackName: {
    color: '#000',
    fontSize: 16,
    marginBottom: 10,
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1ab0a3',
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
