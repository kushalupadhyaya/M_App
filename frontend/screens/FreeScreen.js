import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const [position, setPosition] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    if (!loading && meditation.url) {
      setLoading(true);
      loadAudio(meditation.url).then(() => {
        if (!isCancelled) {
          const interval = setInterval(async () => {
            const status = await getAudioStatus();
            setIsPlaying(status.isPlaying);
            setDuration(status.durationMillis);
            setPosition(status.positionMillis);
          }, 1000);

          setLoading(false);

          return () => clearInterval(interval);
        }
      }).catch(error => {
        console.log(error);
        setLoading(false);
      });
    }
    console.log("Loading audio from URL:", meditation.url);

    return () => {
      isCancelled = true;
      unloadAudio();
    };
  }, [meditation.url]);

  

  async function handlePlayPause() {
    if (!isPlaying) {
      setLoading(true);
      await resumeSound()
      .then(() => {
        setLoading(false);
        setIsPlaying(true);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
    } else {
      await pauseSound();
      setIsPlaying(false);
    }
  }  

  async function handleSliderValueChange(value) {
    await setAudioPosition(value);
  }


  useEffect(() => {
    loadAudio();
    return () => {
      if (isPlaying) {
        pauseSound();
      }
    };
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
      onSlidingComplete={handleSliderValueChange}
      minimumTrackTintColor="#1EB1FC"
      maximumTrackTintColor="#000000"
    />
    <View style={styles.timerContainer}>
      <Text>{formatTime(position)}</Text>
      <Text>{formatTime(duration)}</Text>
    </View>
    <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> 
      ) : (
        <MaterialIcons 
          name={isPlaying ? "pause" : "play-arrow"} 
          size={44} 
          color="black" 
        />
      )}
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
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '30%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#344955',
  },
  description: {
    fontSize: 14,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: '#4a6572',
  },
  playerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  trackName: {
    color: '#344955',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b3c4cb',
    borderRadius: 50,
    width: 60,
    height: 60,
    marginTop: 10,
    elevation: 0, // Add this
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});