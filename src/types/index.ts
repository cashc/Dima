import { NavigationProp, RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Settings: undefined;
};

export type ScreenName = keyof RootStackParamList;

export interface NavigationScreenProps<S extends ScreenName = 'Home'> {
  navigation: NavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList, S>;
}
