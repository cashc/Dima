import React from 'react';
import { StatusBar } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from '../styled';
import dimaTheme from '../theme';

export const ScrollScreen = styled(KeyboardAwareScrollView).attrs({
  keyboardShouldPersistTaps: 'handled',
  enableOnAndroid: false,
})`
  background-color: ${({ theme }) => theme.darkBlue};
`;

export const NativeStatusBar = () => (
  <StatusBar barStyle="dark-content" backgroundColor={dimaTheme.background} />
);

interface Props extends KeyboardAwareScrollViewProps {}

export const Screen: React.FC<Props> = ({ ...props }) => {
  const { top, right, bottom, left } = useSafeAreaInsets();
  return (
    <>
      <NativeStatusBar />
      <ScrollScreen
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: dimaTheme.background,
          paddingTop: top,
          paddingRight: right,
          paddingBottom: bottom,
          paddingLeft: left,
        }}
        {...props}
      />
    </>
  );
};
