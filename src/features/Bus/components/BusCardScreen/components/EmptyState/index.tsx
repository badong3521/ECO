import React from 'react';
import { View } from 'react-native';
import EmptyIcon from '../../../../../../assets/bus/bus_card/empty.svg';
import Text from '../../../../../../components/Text';
import Button from '../../../../../../components/Button';
import styles from './style.css';
import { applicationColors } from '../../../../../../../style.css';

interface EmptyStateProps {
  buttonTitle?: string;
  message?: string;
  buttonPress?: () => void;
  secondButtonTitle?: string;
  secondButtonPress?: () => void;
}
export default function EmptyState(props: EmptyStateProps) {
  const {
    buttonPress,
    buttonTitle,
    message,
    secondButtonTitle,
    secondButtonPress,
  } = props;
  return (
    <View style={styles.container}>
      <EmptyIcon />
      <Text style={styles.message}>{message || ''}</Text>
      <View style={styles.buttonGroup}>
        {!!buttonTitle && buttonPress && (
          <Button
            type="primary"
            uppercase={false}
            style={styles.button}
            title={buttonTitle}
            onPress={buttonPress}
          />
        )}
        {secondButtonTitle && secondButtonPress && (
          <Button
            type="primary"
            uppercase={false}
            style={styles.button}
            color={applicationColors.secondary.shade500}
            title={secondButtonTitle}
            onPress={secondButtonPress}
          />
        )}
      </View>
    </View>
  );
}
