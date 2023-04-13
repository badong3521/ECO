import React, { useImperativeHandle, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import DialogContent from '../DialogContent';
import { applicationColors } from '../../../../../style.css';
import Text from '../../../Text';
import Button from '../../../Button';
import Dialog from '../../index';
import styles from './style.css';

export interface ConfirmDialogRef {
  toggle: () => void;
  show: (props: ConfirmDialogType) => void;
  dismiss: () => void;
}

export interface ConfirmDialogType {
  title?: string;
  confirmTitle?: string;
  confirmColor?: string;
  returnTitle?: string;
  onConfirmPress?: () => void;
  onDismiss?: () => void;
}

interface ConfirmDialogProps {
  dialogRef: React.RefObject<ConfirmDialogRef>;
}

// Confirm Dialog contains a title, a back button and a confirm button.
// To show this dialog, please call `DialogManager.showConfirmDialog(props)`
export default function ConfirmDialog(props: ConfirmDialogProps) {
  const { dialogRef } = props;
  const i18n = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<ConfirmDialogType>({});
  const {
    title,
    confirmTitle,
    onConfirmPress,
    returnTitle,
    confirmColor,
    onDismiss,
  } = data;

  function onBackButtonPress() {
    setVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  }

  function onConfirmButtonPress() {
    setVisible(false);
    onConfirmPress!();
  }

  useImperativeHandle(
    dialogRef,
    (): ConfirmDialogRef => ({
      toggle: () => setVisible(!visible),
      show: (prs: ConfirmDialogType) => {
        setVisible(true);
        setData(prs);
      },
      dismiss: () => {
        setVisible(false);
      },
    }),
  );

  return (
    <Dialog visible={visible} dismissible onDismiss={onBackButtonPress}>
      <DialogContent>
        <Text style={styles.title}>{title || ''}</Text>
      </DialogContent>
      <View style={styles.actions}>
        <Button
          containerStyle={styles.backButton}
          style={{ borderColor: applicationColors.primary.shade900 }}
          onPress={onBackButtonPress}
          title={returnTitle || i18n.t('actions.back')}
          type="secondary"
          uppercase={false}
        />
        <Button
          containerStyle={styles.confirmButton}
          onPress={onConfirmButtonPress}
          title={confirmTitle || ''}
          color={confirmColor || applicationColors.semantic.error.shade500}
          type="primary"
          uppercase={false}
        />
      </View>
    </Dialog>
  );
}

ConfirmDialog.defaultProps = {
  confirmColor: applicationColors.semantic.error.shade900,
};
