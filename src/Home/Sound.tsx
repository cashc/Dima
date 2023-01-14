import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styled from '../styled';
import { Button } from '../shared-ui';
const Sound: any = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Ring = styled.View`
  width: ${({ theme }) => theme.ringSize};
  height: ${({ theme }) => theme.ringSize};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: ${({ theme }) => theme.ringSize};
  background-color: ${({ theme }) => theme.primary};
`;

const SoundSettingsRow = styled.View<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const SoundSettings = styled.View<{ isOpen: boolean }>`
  width: 100%;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: space-around;
  border: 0 solid ${({ theme }) => theme.border};
  border-bottom-width: 1px;
  box-shadow: ${({ theme }) => theme.shadow.bottom};
  height: ${({ isOpen }) => (isOpen ? 100 : 0)}px;
`;

interface SoundPlayerProps {}

interface SoundPlayerState {
  soundSettingsVisible: boolean;
  dingEnabled: boolean;
  singingEnabled: boolean;
  error: string;
  timeoutId?: number;
}

const SOUND_INHALE = 'angels-10s-in.mp3';
const SOUND_EXHALE = 'angels-10s-out.mp3';
const SOUND_DING = 'ding.mp3';

export class SoundPlayer extends Component<SoundPlayerProps, SoundPlayerState> {
  soundInhale: any = null;
  soundExhale: any = null;
  soundDing: any = null;

  constructor(props: SoundPlayerProps) {
    super(props);
    this.state = {
      soundSettingsVisible: false,
      dingEnabled: true,
      singingEnabled: true,
      error: '',
    };

    this.initializeSounds();
  }

  componentWillUnmount() {
    this.soundInhale.release();
    this.soundExhale.release();
    this.soundDing.release();
  }

  initializeSounds = () => {
    this.setState({ error: '' });

    const handleErr = (err: null | Error) => {
      if (err) {
        this.setState({ error: 'failed to load sound file(s)' });
      }
    };
    this.soundInhale = new Sound(SOUND_INHALE, Sound.MAIN_BUNDLE, handleErr);
    this.soundExhale = new Sound(SOUND_EXHALE, Sound.MAIN_BUNDLE, handleErr);
    this.soundDing = new Sound(SOUND_DING, Sound.MAIN_BUNDLE, handleErr);
  };

  start = () => {
    this.soundInhale.play();

    const timeoutId = setTimeout(() => {
      this.soundDing.play();
      this.soundExhale.play((exhaleSuccess: boolean) => {
        if (exhaleSuccess) {
          this.soundDing.play();
          this.start();
        }
      });
    }, -100 + this.soundInhale._duration * 1000);

    this.setState({ timeoutId });
  };

  debug = () => {
    console.log('inhale duration', this.soundInhale._duration);
    console.log('exhale duration', this.soundExhale._duration);
    console.log('ding duration', this.soundDing._duration);
  };

  stop = () => {
    const { timeoutId } = this.state;
    if (timeoutId) clearTimeout(timeoutId);
    this.soundInhale.stop();
    this.soundExhale.stop();
    this.soundDing.stop();

    this.setState({ timeoutId: undefined });
  };

  toggleSoundSettingsVisible = () => {
    this.setState({ soundSettingsVisible: !this.state.soundSettingsVisible });
  };

  toggleDing = () => {
    this.setState({ dingEnabled: !this.state.dingEnabled });
  };

  toggleSinging = () => {
    this.setState({ singingEnabled: !this.state.singingEnabled });
  };

  render() {
    if (this.state.error) {
      return (
        <View>
          <Text>{this.state.error}</Text>
          <Button onPress={this.initializeSounds} title="Re-initialize" />
        </View>
      );
    }
    const { timeoutId, soundSettingsVisible, dingEnabled, singingEnabled } =
      this.state;
    const isPlaying = !!timeoutId;
    return (
      <Container>
        <SoundSettingsRow isOpen={soundSettingsVisible}>
          <Button
            width={120}
            type="transparent"
            onPress={this.toggleSoundSettingsVisible}>
            <Text>{soundSettingsVisible ? '▷ sound' : '▽ sound'}</Text>
          </Button>
          <SoundSettings isOpen={soundSettingsVisible}>
            <Button
              onPress={this.toggleDing}
              type="transparent"
              label={dingEnabled ? 'ding' : 'ding off'}
            />
            <Button
              onPress={this.toggleSinging}
              type="transparent"
              label={singingEnabled ? 'singing' : 'singing off'}
            />
          </SoundSettings>
        </SoundSettingsRow>
        <Ring>
          <Button label="Turtle" type="transparent" />
        </Ring>
        {isPlaying ? (
          <Button onPress={this.stop} width={200} label="Stop" />
        ) : (
          <Button onPress={this.start} width={200} label="Play" />
        )}
      </Container>
    );
  }
}

// Loop endlessly
// sound.setNumberOfLoops(-1);

// Position the sound to the full right in a stereo field
// sound.setPan(1);
