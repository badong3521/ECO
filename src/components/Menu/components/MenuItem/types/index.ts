export interface MenuItemPropType {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}
