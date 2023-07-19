import { Audio } from 'expo-av';

let audio = null;

export async function playSound(url) {
  if (audio) {
    console.log('Stopping current sound');
    await audio.stopAsync(); // stop current sound
    await audio.unloadAsync(); // unload it
  }

  console.log('Loading new sound');
  audio = new Audio.Sound();
  try {
    await audio.loadAsync({ uri: url });
    await audio.playAsync();
  } catch (err) {
    console.error('Failed to load sound', err);
  }
  return audio;
}

export async function stopSound() {
  if (audio) {
    await audio.stopAsync();
    audio = null;
  }
}
