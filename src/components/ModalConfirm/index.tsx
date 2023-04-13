import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { View, Text } from 'react-native';
import Button from 'components/Button';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style.css';

interface ModalConfirmProps {
  title: string;
  onPressAction: () => void;
  message: string;
  ImageComponent: any;
  buttonLeftTitle?: string;
  buttonRightTitle?: string;
}

const ModalConfirm: ForwardRefRenderFunction<Modalize, ModalConfirmProps> = (
  props: ModalConfirmProps,
  ref,
) => {
  const insets = useSafeAreaInsets();
  const {
    title,
    onPressAction,
    message,
    ImageComponent,
    buttonLeftTitle,
    buttonRightTitle,
  } = props;
  return (
    <Portal>
      <Modalize
        ref={ref}
        modalHeight={380}
        handlePosition="inside"
        disableScrollIfPossible
        tapGestureEnabled={false}
        modalStyle={styles.modalStyle}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
        HeaderComponent={
          <>
            <Text style={styles.headerModal}>{title}</Text>
            <View style={styles.line} />
          </>
        }
        FooterComponent={
          <View
            style={[styles.buttonsContainer, { marginBottom: insets.bottom }]}
          >
            <Button
              title={buttonLeftTitle ?? 'Hủy'}
              type="secondary2"
              uppercase={false}
              style={styles.backButton}
              containerStyle={styles.backButtonContainer}
              onPress={() => {
                ref.current?.close();
              }}
            />
            <Button
              style={styles.backButton}
              title={buttonRightTitle ?? 'Đồng ý'}
              type="primary"
              uppercase={false}
              containerStyle={styles.saveButtonContainer}
              onPress={() => {
                ref.current?.close();
                onPressAction();
              }}
            />
          </View>
        }
      >
        <ImageComponent style={styles.image} />
        <Text style={styles.message}>{message}</Text>
      </Modalize>
    </Portal>
  );
};

export default forwardRef<Modalize, ModalConfirmProps>(ModalConfirm);
