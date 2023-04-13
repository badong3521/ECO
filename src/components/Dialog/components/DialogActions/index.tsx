import { Dialog as RDialog } from 'react-native-paper';
import React from 'react';
import { View } from 'react-native';
import { DialogActionsPropTypes } from './types';
import styles from './style.css';

export default function DialogActions(props: DialogActionsPropTypes) {
  const { children, style } = props;
  return (
    <RDialog.Actions>
      <View style={[styles.wrapper, style]}>{children}</View>
    </RDialog.Actions>
  );
}
