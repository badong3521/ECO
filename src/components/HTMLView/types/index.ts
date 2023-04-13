import { TextStyle, ViewStyle } from 'react-native';

export default interface HTMLViewPropTypes {
  html: string;
  scrollable?: boolean;
  fontStyle?: TextStyle;
  containerStyle?: ViewStyle;
}
