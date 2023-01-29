import { Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const DEVICE_RING_SIZE = Math.min(550, Math.round(SCREEN_WIDTH * 0.79));

const theme = {
  primary: '#3BAFFE',
  primaryLight: 'rgba(59, 175, 254, 0.2)',
  primaryLighter: 'rgba(59, 175, 254, 0.2)',
  primaryLightest: 'rgba(59, 175, 254, 0.1)',
  primaryAlt: '#0AD1E7',
  primaryGradient: ['#3BAFFE', '#0AD1E7'],
  secondaryGradient: ['#EFE9E7', '#DAE0F2', '#F9CFF2', '#52154E', '#111344'],
  black: '#000',
  onyx: '#3F4045',
  seaGreenDark: '#567751',
  seaGreen: '#8CC084',
  seaGreenLight: '#C1D7AE',
  background: '#F9FBFF',
  darkBlue: '#172A56',
  gray: '#EEF5FF',
  lightGray: '#F9FBFF',
  border: '#75715e',
  text: '#172A56',
  textlight: '#47779F',
  white: '#fff',
  success: '#53DD6C',
  failure: '#5A0001',
  warning: '#FFB140',
  textInputBackground: '#EEF5FF',
  switch: {
    active: '#172A56',
    inactive: '#47779F',
  },
  buttonHeight: 56,
  buttonHeightSmall: 40,
  buttonActiveOpacity: 0.8,

  screenHeight: SCREEN_HEIGHT,
  screenWidth: SCREEN_WIDTH,
  ringSize: `${DEVICE_RING_SIZE}px`,

  shadow: {
    main: '0 5px 5px #EDF2F9',
    card: '0 5px 5px #EDF2F9',
    bottom: '0px 15px 25px rgba(0,0,0,.05)',
    top: '0px -15px 25px rgba(0,0,0,.05)',
    outer: '0 2px 4px #E1EDFF',
  },
};

export type DefaultTheme = typeof theme;

export default theme;
