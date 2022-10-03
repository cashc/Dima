import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
const Sound: any = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

export const SoundPlayer = () => {
  const [ding, setDing] = useState<any>(null);

  function start() {
    console.log('ding', ding);

    if (!ding) {
      return;
    }

    console.log(
      'duration in seconds: ' +
        ding.getDuration() +
        'number of channels: ' +
        ding.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    ding.play((success: any) => {
      if (success) {
        ding.setNumberOfLoops(-1);
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

  function pause() {
    console.log('volume: ' + ding.getVolume());
    console.log('pan: ' + ding.getPan());
    console.log('loops: ' + ding.getNumberOfLoops());

    // Get the current playback point in seconds
    ding.getCurrentTime((seconds: any) => console.log('at ' + seconds));

    ding.pause();
  }

  function stop() {
    // Stop the sound and rewind to the beginning
    ding.stop(() => {
      // Note: If you want to play a sound after stopping and rewinding it,
      // it is important to call play() in a callback.
      ding.play();
    });
  }

  useEffect(() => {
    const newDing = new Sound('ding.mp3', Sound.MAIN_BUNDLE, (error: any) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    setDing(newDing);
  }, []);

  if (!ding) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Button onPress={start} title="Play" />
      <Button onPress={() => ding.setVolume(0.5)} title="Half volume" />
      <Button onPress={pause} title="Pause" />
      <Button onPress={stop} title="Stop" />
    </View>
  );
};

// Position the sound to the full right in a stereo field
// ding.setPan(1);

// Pause the sound
// ding.pause();

// Release the audio player resource
// ding.release();
