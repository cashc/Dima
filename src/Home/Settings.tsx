import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from '../styled';
import {
  Button,
  Icon,
  Singing,
  SingingOff,
  SoundBowl,
  SoundBowlOff,
} from '../shared-ui';
import dimaTheme from '../theme';
import debounce from 'lodash.debounce';

const Overlay = styled(Animated.View)<{ isOpen: boolean }>`
  position: absolute;
  top: 100px;
  width: 100%;
  height: 150%;
  background-color: ${({ theme }) => theme.overlay};
  z-index: 100;
  ${({ isOpen }) => (isOpen ? '' : 'display: none;')}
`;

const Touchable = styled.TouchableOpacity`
  flex: 1;
`;

const Container = styled.View`
  position: relative;
  z-index: 102;
  width: 100%;
`;

const TopAreaHide = styled.View`
  position: absolute;
  top: -100px;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.background};
`;

const TopRow = styled.View`
  z-index: 102;
  height: 70px;
  background-color: ${({ theme }) => theme.background};
`;

const ButtonAnimatedWrapper = styled(Animated.View)`
  width: 120px;
`;

const SoundSettings = styled(Animated.View)<{ isOpen: boolean }>`
  position: absolute;
  top: 20px;
  z-index: 101;
  width: 100%;
  height: 100px;
  padding-top: 20px;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${({ theme }) => theme.background};
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  ${({ isOpen, theme }) =>
    isOpen ? `box-shadow: 0px 0px 15px ${theme.border};` : ''}
`;

interface Props {
  isPlaying: boolean;
  dingEnabled: boolean;
  toggleDing: () => void;
  singingEnabled: boolean;
  toggleSinging: () => void;
}

export const Settings: React.FC<Props> = ({
  isPlaying,
  dingEnabled,
  toggleDing,
  singingEnabled,
  toggleSinging,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [delayedIsOpen, setDelayedIsOpen] = useState(false);
  const topPosAnimated = useRef(new Animated.Value(0)).current;
  const spinAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(topPosAnimated, {
      toValue: isOpen ? 70 : -10,
      duration: 180,
      useNativeDriver: false,
    }).start();
    Animated.timing(spinAnimated, {
      toValue: isOpen ? 1 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [topPosAnimated, spinAnimated, isOpen]);

  const spin = spinAnimated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '50deg'],
  });

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);

    if (isOpen) {
      debouncedClose();
    } else {
      setDelayedIsOpen(true);
      debouncedClose.cancel();
    }
  };

  const debouncedClose = debounce(() => setDelayedIsOpen(false), 150);

  if (isPlaying) {
    return <TopRow />;
  }

  return (
    <>
      <Overlay isOpen={isOpen} style={{ opacity: spinAnimated }}>
        <Touchable onPress={toggleIsOpen} />
      </Overlay>
      <Container>
        <TopRow>
          {/* HACK: prevent box-shadow showing behind */}
          <TopAreaHide />
          <ButtonAnimatedWrapper style={{ transform: [{ rotate: spin }] }}>
            <Button width={120} type="transparent" onPress={toggleIsOpen}>
              <Icon name="Settings" fill="none" stroke={dimaTheme.text} />
            </Button>
          </ButtonAnimatedWrapper>
        </TopRow>
        <SoundSettings style={{ top: topPosAnimated }} isOpen={delayedIsOpen}>
          <Button onPress={toggleDing} width={120} type="transparent">
            {dingEnabled ? <SoundBowl /> : <SoundBowlOff />}
          </Button>
          <Button onPress={toggleSinging} width={120} type="transparent">
            {singingEnabled ? <Singing /> : <SingingOff />}
          </Button>
        </SoundSettings>
      </Container>
    </>
  );
};
