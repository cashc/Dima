import 'styled-components';
import 'styled-components/native';
import { DefaultTheme as Theme } from './src/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {}
}
