import React from 'react';
import { Menu as RMenu } from 'react-native-paper';
import { MenuPropType } from './types';

// Display a menu. Can be used in conjuction with other components.
export default function Menu(props: MenuPropType) {
  const { children, anchor, visible, onDismiss } = props;

  return (
    <RMenu visible={visible} onDismiss={onDismiss} anchor={anchor}>
      {children}
    </RMenu>
  );
}
