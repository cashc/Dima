import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NavigationScreenProps } from '../types';
import dimaTheme from '../theme';
import styled from '../styled';
import { SoundPlayer } from './Sound';

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.darkBlue};
`;

interface Props extends NavigationScreenProps {}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <ScreenContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? dimaTheme.darkBlue : dimaTheme.gray}
      />
      <SoundPlayer />
    </ScreenContainer>
  );
};
