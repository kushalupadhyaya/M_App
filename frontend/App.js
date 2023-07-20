import React, { useEffect } from 'react';
import { Audio } from 'expo-av';
import { AuthProvider } from './AuthContext';
import AppNavigator from './AppNavigator';

export default function App() {
  useEffect(() => {
    const setAudio = async () => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        //interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        //interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    };
    setAudio();
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
