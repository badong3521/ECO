import React from 'react';
import { View } from 'react-native';
import i18n from 'i18next';
import Text from '../../../../components/Text';
import PopupBottomModal from '../../../../components/PopupBottomModal';
import IconButton from '../../../../components/IconButton';
import Button from '../../../../components/Button';
import TrashImage from '../../../../assets/images/trash.svg';

import styles from './style.css';
import { applicationColors } from '../../../../../style.css';

interface Props {
  visible: boolean;
  onClose: () => any;
  onDelete: (code?: string) => any;
  code?: string;
}

export default function DeletingCustomerCodeModal(props: Props) {
  const { visible, onClose, onDelete, code } = props;

  return (
    <PopupBottomModal visible={visible}>
      <View style={styles.container}>
        <View style={styles.headers}>
          <View style={styles.title}>
            <Text bold="bold">
              {i18n.t('features.electricBill.deleteCodeModal.title')}
            </Text>
          </View>
          <View style={styles.closeButton}>
            <IconButton
              type="clear"
              iconName="close"
              onPress={onClose}
              iconColor={applicationColors.neutral.shade900}
            />
          </View>
        </View>

        <View style={styles.divider} />

        <TrashImage style={styles.image} />

        <Text bold="bold" style={styles.header}>
          {i18n.t('features.electricBill.deleteCodeModal.header', { code })}
        </Text>
        <Text style={styles.details} color="grey">
          {i18n.t('features.electricBill.deleteCodeModal.details')}
        </Text>

        <View style={styles.actions}>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              title={i18n.t('actions.cancel')}
              type="secondary"
              onPress={onClose}
              uppercase={false}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              title={i18n.t('features.electricBill.deleteCodeModal.delete')}
              type="primary"
              onPress={() => onDelete(code)}
              uppercase={false}
            />
          </View>
        </View>
      </View>
    </PopupBottomModal>
  );
}
