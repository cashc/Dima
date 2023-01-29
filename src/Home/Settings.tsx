import React, { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import styled from '../styled';
import { Button, Icon, Singing, SoundBowl } from '../shared-ui';
import dimaTheme from '../theme';
import debounce from 'lodash.debounce';

const Container = styled(Animated.View)`
  position: relative;
  width: 100%;
  background-color: yellow;
`;

const TopRow = styled.View`
  z-index: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ButtonAnimatedWrapper = styled(Animated.View)`
  width: 120px;
`;

const SoundSettings = styled(Animated.View)<{ isOpen: boolean }>`
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: ${({ isOpen }) => (isOpen ? 70 : 0)}px;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${({ theme }) => '#73887153'};
  ${({ isOpen, theme }) =>
    isOpen ? `box-shadow: 0px 0px 0px ${theme.border};` : ''}
`;

interface Props {
  dingEnabled: boolean;
  toggleDing: () => void;
  singingEnabled: boolean;
  toggleSinging: () => void;
}

export const Settings: React.FC<Props> = ({
  dingEnabled,
  toggleDing,
  singingEnabled,
  toggleSinging,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [delayedIsOpen, setDelayedIsOpen] = useState(false);
  const heightAnimated = useRef(new Animated.Value(0)).current;
  const spinAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(heightAnimated, {
      toValue: isOpen ? 80 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(spinAnimated, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [heightAnimated, spinAnimated, isOpen]);

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

  return (
    <Container style={{ marginBottom: heightAnimated }}>
      <TopRow>
        <ButtonAnimatedWrapper style={{ transform: [{ rotate: spin }] }}>
          <Button width={120} type="transparent" onPress={toggleIsOpen}>
            <Icon name="Settings" fill="none" stroke={dimaTheme.text} />
          </Button>
        </ButtonAnimatedWrapper>
      </TopRow>
      <SoundSettings style={{ top: heightAnimated }} isOpen={delayedIsOpen}>
        <Button onPress={toggleDing} type="transparent">
          <SoundBowl stroke="white" fill="white" />
        </Button>
        <Button onPress={toggleSinging} type="transparent">
          <Singing stroke="white" fill="white" />
        </Button>
      </SoundSettings>
    </Container>
  );
};
