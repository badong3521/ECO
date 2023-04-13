import React, { RefObject, useImperativeHandle, useState } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Portal } from 'react-native-paper';
import TextLink from '../../../TextLink';
import Button from '../../../Button';
import styles from './style.css';
import MessageIcon from '../../../../assets/dialog/icon_message.svg';
import Text from '../../../Text';
import { applicationColors } from '../../../../../style.css';

export interface MessageDialogRef {
  toggle: () => void;
  show: (props: MessageDialogType) => void;
  dismiss: () => void;
}

export interface MessageDialogType {
  title?: string;
  message?: string;
  confirmTitle?: string;
  confirmColor?: string;
  onConfirmPress?: () => void;
  onDismiss?: () => void;
}

interface MessageDialogProps {
  dialogRef: RefObject<MessageDialogRef>;
}

// Custom message dialog for app.
// Message dialog contains a title, message and a button to confirm.
// To show this dialog, please call `DialogManager.showMessageDialog(props)`
export default function MessageDialog(props: MessageDialogProps) {
  const { dialogRef } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<MessageDialogType>({});
  const { title, message, confirmTitle, onConfirmPress, confirmColor } = data;

  function onConfirmButtonPress() {
    setVisible(false);
    if (onConfirmPress) {
      onConfirmPress();
    }
  }

  useImperativeHandle(
    dialogRef,
    (): MessageDialogRef => ({
      toggle: () => {
        setVisible(!visible);
      },
      show: (prs: MessageDialogType) => {
        setData(prs);
        setVisible(true);
      },
      dismiss: () => {
        setVisible(false);
      },
    }),
  );

  return visible ? (
    <Portal>
      <TouchableWithoutFeedback
        onPress={() => {
          dialogRef?.current?.toggle();
        }}
      >
        <View style={styles.container}>
          <MessageIcon style={styles.icon} />
          <View style={styles.content}>
            {title && (
              <Text fontSize="large" bold="bold" style={styles.title}>
                {title}
              </Text>
            )}
            {message && (
              <TextLink
                linkColor={applicationColors.primary.black}
                fontSize="small"
                style={styles.message}
              >
                {message}
              </TextLink>
            )}
            <Button
              style={styles.confirm}
              containerStyle={styles.confirmContainer}
              onPress={onConfirmButtonPress}
              title={confirmTitle || ''}
              color={confirmColor}
              type="primary"
              uppercase={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Portal>
  ) : (
    <View />
  );
}
