import React from 'react';
import { Menu as RMenu } from 'react-native-paper';
import { MenuItemPropType } from './types';

// Display a singular Menu Item. Use this inside Menu component.
export default function Menu(props: MenuItemPropType) {
  const { title, onPress, icon, disabled } = props;

  return (
    <RMenu.Item
      title={title}
      onPress={onPress}
      icon={icon}
      disabled={disabled}
    />
  );
}
