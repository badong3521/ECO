import React from 'react';
import { View } from 'react-native';
import styles from './style.css';
import Text from '../Text';
import IconButton from '../IconButton';
import { applicationColors } from '../../../style.css';

interface AppBarProps {
  leadingIcon?: string;
  leadingColor?: string;
  title: string;
  onLeadingPressed?: () => void;
  onClosePressed?: () => void; // if set, will have the close button in the right
}

// Use this component when need a left action and a title in the center
export default function AppBar(props: AppBarProps) {
  const {
    leadingIcon,
    leadingColor,
    title,
    onLeadingPressed,
    onClosePressed,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText} bold="bold" fontSize="large">
          {title}
        </Text>
      </View>
      {leadingIcon && (
        <View style={styles.iconPadding}>
          <IconButton
            iconName={leadingIcon}
            onPress={onLeadingPressed}
            iconColor={leadingColor}
          />
        </View>
      )}
      {onClosePressed && (
        <View style={styles.closeButton}>
          <IconButton
            iconName="close"
            iconColor="white"
            padding={5}
            iconSize={14}
            onPress={onClosePressed}
          />
        </View>
      )}
    </View>
  );
}

AppBar.defaultProps = {
  leadingColor: applicationColors.neutral.shade700,
};
