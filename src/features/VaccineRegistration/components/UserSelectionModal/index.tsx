import React from 'react';
import { View } from 'react-native';
import { applicationColors } from '../../../../../style.css';
import Text from '../../../../components/Text';
import IconButton from '../../../../components/IconButton';
import PopupBottomModal from '../../../../components/PopupBottomModal';

import styles from './style.css';

interface Props {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function UserSelectionModal(props: Props) {
  const { visible, title, children, onClose } = props;

  return (
    <PopupBottomModal visible={visible}>
      <View style={styles.container}>
        <View style={styles.headers}>
          <Text bold="bold" fontSize="large" style={styles.title}>
            {title}
          </Text>
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

        {children}
      </View>
    </PopupBottomModal>
  );
}
