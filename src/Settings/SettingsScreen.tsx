import React from 'react';
import { Text } from 'react-native';

import { Screen } from '../shared-ui';

interface Props {}

export const SettingsScreen: React.FC<Props> = () => {
  return (
    <Screen>
      <Text>Settings</Text>
    </Screen>
  );
};
