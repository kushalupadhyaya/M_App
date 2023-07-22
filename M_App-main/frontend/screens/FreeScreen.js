import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { loadAudio, unloadAudio, getAudioStatus, pauseSound, playSound, setAudioPosition, resumeSound } from '../components/audioState';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0)
  

  async function handlePlayPause() {
    const status = await getAudioStatus();
    if (status.isPlaying) {
      await pauseSound();
    } else {
      await resumeSound();
    }
  }

  async function handleSliderValueChange(value) {
    await setAudioPosition(value);
  }


  useEffect(() => {
    let interval;
    
    async function loadAudioAndSetInterval() {
      // Unload the current audio file before loading a new one.
      await unloadAudio();
      if (meditation.url) {
        await loadAudio(meditation.url);
        interval = setInterval(async () => {
          const status = await getAudioStatus();
          setIsPlaying(status.isPlaying);
          setDuration(status.durationMillis);
          setPosition(status.positionMillis);
        }, 1000);
      }
    }
    
    loadAudioAndSetInterval();
    
    return () => {
      clearInterval(interval);
      unloadAudio();
    };
  }, [meditation.url]);
  
  


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
          onSlidingComplete={handleSliderValueChange}
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
            color="white" 
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
    backgroundColor: '#f2f2f2',  // Added a calming and soothing background color
  },
  image: {
    width: '100%',
    height: '30%',
    borderRadius: 10,  // Added rounded corners for a softer appearance
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#344955',  // Used a muted and calming color for the title
  },
  description: {
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: '#4a6572',  // Used a muted and calming color for the description
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
    backgroundColor: 'rgba(197, 211, 217, 0.8)',  // Changed button color to a calming tone
    borderRadius: 50,  // Made the button round, which is aesthetically pleasing
    width: 60,
    height: 60,
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
