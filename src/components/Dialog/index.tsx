import { Dialog as RDialog, Portal as RPortal } from 'react-native-paper';

import React from 'react';
import { DialogPropTypes } from './types';
import styles from './style.css';

// Dialog components should follow this general hierarchy:
// <Dialog>
//  <DialogContent>
//      ...
//  </DialogContent>
//  <DialogActions>
//      ...
//  </DialogActions>
// </Dialog>

export default function Dialog(props: DialogPropTypes) {
  const { dismissible, visible, children, onDismiss } = props;
  return (
    <RPortal>
      <RDialog
        dismissable={dismissible}
        visible={visible}
        style={styles.container}
        onDismiss={onDismiss}
      >
        {children}
      </RDialog>
    </RPortal>
  );
}
