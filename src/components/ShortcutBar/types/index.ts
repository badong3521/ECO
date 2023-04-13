import { ViewStyle } from 'react-native';

export type ShortcutBarPropTypes = {
  canEdit: boolean;
  buttons: ShortcutButtonTypes[];
  onEditPress: () => any;
  style?: ViewStyle | ViewStyle[];
};

export type ShortcutButtonTypes = {
  title: string;
  icon: string;
  onPress: () => any;
};
