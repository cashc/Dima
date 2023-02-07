import React, { Component, useRef } from 'react';
import { Animated } from 'react-native';
const Sound: any = require('react-native-sound');
// Enable playback in silence mode
Sound.setCategory('Playback');

import styled from '../styled';
import { Button, BodyText, Screen, Turtle } from '../shared-ui';
import { NavigationScreenProps } from '../types';
import SOUNDS from './sounds';
import { Settings } from './Settings';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-bottom: 80px;
`;

const RingContainer = styled.View`
  width: ${({ theme }) => theme.ringSize};
  height: ${({ theme }) => theme.ringSize};
  margin-bottom: 40px;
  border: 1px solid ${({ theme }) => theme.primaryLighter};
  border-radius: ${({ theme }) => theme.ringSize};
  box-shadow: 0px 2px 9px ${({ theme }) => theme.seaGreenDark};
`;

const Ring = styled.View`
  position: absolute;
  top: 0;
  width: ${({ theme }) => theme.ringSize};
  height: ${({ theme }) => theme.ringSize};
  border-radius: ${({ theme }) => theme.ringSize};
  background-color: ${({ theme }) => theme.seaGreen};
  padding: 10px 0 20px;
`;

const AnimalTouchable = styled(Button).attrs({ type: 'transparent' })`
  width: 100%;
  height: 100%;
`;

interface Props extends NavigationScreenProps {}

interface State {
  dingEnabled: boolean;
  singingEnabled: boolean;
  error: string;
  timeoutId?: number;
}

export class HomeScreen extends Component<Props, State> {
  soundInhale: any = null;
  soundExhale: any = null;
  soundDing: any = null;

  constructor(props: Props) {
    super(props);
    this.state = {
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
    if (this.state.error) {
      this.setState({ error: '' });
    }

    const handleErr = (err: null | Error) => {
      if (err) {
        this.setState({ error: 'failed to load sound file(s)' });
      }
    };

    this.soundInhale = new Sound(SOUNDS.INHALE, Sound.MAIN_BUNDLE, handleErr);
    this.soundExhale = new Sound(SOUNDS.EXHALE, Sound.MAIN_BUNDLE, handleErr);
    this.soundDing = new Sound(SOUNDS.DING, Sound.MAIN_BUNDLE, handleErr);
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

  toggleDing = () => {
    this.setState({ dingEnabled: !this.state.dingEnabled });
  };

  toggleSinging = () => {
    this.setState({ singingEnabled: !this.state.singingEnabled });
  };

  render() {
    if (this.state.error) {
      return (
        <Screen scrollEnabled={false}>
          <BodyText>{this.state.error}</BodyText>
          <Button onPress={this.initializeSounds} label="Re-initialize" />
        </Screen>
      );
    }

    const { timeoutId, dingEnabled, singingEnabled } = this.state;
    const isPlaying = !!timeoutId;

    return (
      <Screen scrollEnabled={false}>
        <Settings
          isPlaying={isPlaying}
          dingEnabled={dingEnabled}
          toggleDing={this.toggleDing}
          singingEnabled={singingEnabled}
          toggleSinging={this.toggleSinging}
        />
        <Container>
          <RingContainer>
            <Ring>
              <AnimalTouchable onPress={isPlaying ? this.stop : this.start}>
                <Turtle fill={'white'} />
              </AnimalTouchable>
            </Ring>
          </RingContainer>
          {isPlaying ? (
            <BodyText>Tap to stop</BodyText>
          ) : (
            <BodyText>Tap to begin...</BodyText>
          )}
        </Container>
      </Screen>
    );
  }
}

// Loop endlessly
// sound.setNumberOfLoops(-1);

// Position the sound to the full right in a stereo field
// sound.setPan(1);
