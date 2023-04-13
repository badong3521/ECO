import React from 'react';
import { View } from 'react-native';
import styles from './styles.css';
import { applicationColors } from '../../../../../style.css';
import IconButton from '../../../../components/IconButton';

interface DeleteButton {
  onPress: () => void;
}

export default function DeleteButton(props: DeleteButton) {
  const { onPress } = props;
  return (
    <View style={styles.container}>
      <IconButton
        onPress={onPress}
        type="button"
        iconName="clear"
        iconColor={applicationColors.semantic.error.shade500}
        iconSize={17}
        padding={0}
        buttonBackgroundColor={applicationColors.primary.white}
      />
    </View>
  );
}
