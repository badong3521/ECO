import React from 'react';
import { View } from 'react-native';
import i18n from 'i18next';
import Text from '../../../../components/Text';
import PopupBottomModal from '../../../../components/PopupBottomModal';
import IconButton from '../../../../components/IconButton';
import SuccessImage from '../../../../assets/images/success.svg';

import styles from './style.css';
import { applicationColors } from '../../../../../style.css';

interface Props {
  visible: boolean;
  onClose: () => any;
  code?: string;
}

export default function DeletingCustomerCodeSuccessful(props: Props) {
  const { visible, onClose, code } = props;

  return (
    <PopupBottomModal visible={visible}>
      <View style={styles.container}>
        <View style={styles.headers}>
          <View style={styles.closeButton}>
            <IconButton
              type="clear"
              iconName="close"
              onPress={onClose}
              iconColor={applicationColors.neutral.shade900}
            />
          </View>
        </View>

        <SuccessImage style={styles.image} />

        <Text bold="bold" style={styles.header}>
          {i18n.t('features.electricBill.deleteCodeSuccessModal.header')}
        </Text>
        <Text style={styles.details} color="grey">
          {i18n.t('features.electricBill.deleteCodeSuccessModal.details', {
            code,
          })}
        </Text>
      </View>
    </PopupBottomModal>
  );
}
