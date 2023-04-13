import { Dialog as RDialog } from 'react-native-paper';
import React from 'react';
import { DialogContentPropTypes } from './types';
import styles from './style.css';

export default function DialogContent(props: DialogContentPropTypes) {
  const { children } = props;
  return (
    <RDialog.Content style={styles.dialogContent}>{children}</RDialog.Content>
  );
}
