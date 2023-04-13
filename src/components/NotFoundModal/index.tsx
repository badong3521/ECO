import React from 'react';
import { View } from 'react-native';
import PopupBottomModal from '../PopupBottomModal';
import Text from '../Text';
import IconButton from '../IconButton';
import Button from '../Button';
import NotFoundImage from '../../assets/images/search_not_found_v1.svg';

import styles from './style.css';
import { applicationColors } from '../../../style.css';

interface Props {
  visible: boolean;
  title: string;
  header: string;
  details: string;
  buttonText: string;
  onClose: () => void;
}

export default function NotFoundModal(props: Props) {
  const { visible, title, header, details, onClose, buttonText } = props;

  return (
    <PopupBottomModal visible={visible}>
      <View style={styles.container}>
        <View style={styles.headers}>
          <View style={styles.title}>
            <Text bold="bold">{title}</Text>
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

        <NotFoundImage style={styles.image} />
        <Text bold="bold" style={styles.header}>
          {header}
        </Text>
        <Text style={styles.details} color="grey">
          {details}
        </Text>

        <Button
          style={styles.button}
          title={buttonText}
          type="primary"
          onPress={onClose}
          uppercase={false}
        />
      </View>
    </PopupBottomModal>
  );
}
