import React from 'react';
import { ViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from '../styled';

export const ScreenContainer = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.darkBlue};
`;

export const ScrollScreen = styled(KeyboardAwareScrollView).attrs(
  ({ theme }) => ({
    contentContainerStyle: {
      backgroundColor: theme.darkBlue,
      minHeight: '100%',
    },
    keyboardShouldPersistTaps: 'handled',
    enableOnAndroid: false,
  }),
)``;

interface Props extends ViewProps {
  scroll?: boolean;
}

export const Screen: React.FC<Props> = ({ scroll = false, ...props }) => {
  const Container = scroll ? ScrollScreen : SafeAreaView;

  return <Container {...props} />;
};
