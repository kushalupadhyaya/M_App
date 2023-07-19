import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function FreeScreen({ route, navigation }) {
  const { meditation } = route.params;
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  async function loadSound() {
    console.log('Loading Sound');
    console.log('Soundtrack URL: ', meditation.url);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    const { sound } = await Audio.Sound.createAsync(
      {uri: meditation.url},
      {
        shouldPlay: false, // Here the sound won't start playing automatically.
        rate: 1.0,
        shouldCorrectPitch: true,
        volume: 1.0,
        isMuted: false,
        isLooping: false // Here we disable the looping.
      }
    );

    setSound(sound);
  }

  async function playSound() {
    console.log('Playing Sound');
    if (sound) {
      await sound.playAsync(); 
      setIsPlaying(true);
    }
  }

  async function pauseSound() {
    console.log('Pausing Sound');
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function handleSliderValueChange(value) {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  }

  useEffect(() => {
    loadSound();
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, []);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(status => {
        setDuration(status.durationMillis);
        setPosition(status.positionMillis);
      });
    }
  }, [sound]);

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: meditation.imageUrl }} 
        style={styles.image}
      />
      <Text style={styles.title}>{meditation.name}</Text>

      <Slider
        style={{width: '80%', height: 40}}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={handleSliderValueChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />

      <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
        <MaterialIcons 
          name={isPlaying ? "pause" : "play-arrow"} 
          size={44} 
          color="black" 
        />
      </TouchableOpacity>

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
});
