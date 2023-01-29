import 'styled-components';
import 'styled-components/native';
import React from 'react';
import { SvgProps } from 'react-native-svg';

import { DefaultTheme as Theme } from '../theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}

declare module '*.svg' {
  const content: React.FC<SvgProps>;
  export default content;
}
