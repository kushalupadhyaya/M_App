import { Audio } from 'expo-av';

let soundObject = null;
let lastPlayingUri = null;

export async function playSound(uri) {
  if (lastPlayingUri !== uri) {
    if (soundObject) {
      await soundObject.unloadAsync();
    }

    soundObject = new Audio.Sound();
    lastPlayingUri = uri;
  }

  try {
    let status = await soundObject.getStatusAsync();
    if(!status.isLoaded){
      await soundObject.loadAsync({ uri });
    }
    await soundObject.playAsync();
  } catch (error) {
    console.error(error);
  }

  return soundObject;
}



export async function resumeSound() {
  if (soundObject) {
    try {
      await soundObject.playAsync();
    } catch (error) {
      console.error(error);
    }
  }
}

export async function pauseSound() {
  if (soundObject) {
    try {
      await soundObject.pauseAsync();
    } catch (error) {
      console.error(error);
    }
  }
}

export async function loadAudio(uri, position = 0) {
  if (!uri) return;

  if (!soundObject || lastPlayingUri !== uri) {
    soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(
        { uri },
        { shouldPlay: false, positionMillis: position },
        false
      );
      lastPlayingUri = uri;
    } catch (error) {
      console.error(error);
    }
  }

  return soundObject;
}

export async function setAudioPosition(positionMillis) {
  if (soundObject) {
    try {
      await soundObject.setPositionAsync(positionMillis);
    } catch (error) {
      console.error(error);
    }
  }
}

export async function getAudioStatus() {
  if (soundObject) {
    try {
      return await soundObject.getStatusAsync();
    } catch (error) {
      console.error(error);
    }
  }
  return {};
}

export async function unloadAudio() {
  if (soundObject) {
    try {
      await soundObject.stopAsync();
      await soundObject.unloadAsync();
    } catch (error) {
      console.error(error);
    } finally {
      soundObject = null; // Ensure soundObject is reset
    }
  }
}

