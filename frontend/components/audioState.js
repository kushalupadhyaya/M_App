import { Audio } from 'expo-av';

let audio = null;

export async function getAudio() {
  if (!audio) {
    audio = new Audio.Sound();
  }
  return audio;
}

export function resetAudio() {
  if (audio) {
    audio.unloadAsync();
    audio = null;
  }
}
