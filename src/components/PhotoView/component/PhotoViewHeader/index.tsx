import { Animated } from 'react-native';
import React from 'react';
import styles from '../../style.css';
import IconButton from '../../../IconButton';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../../../style.css';
import Text from '../../../Text';

interface PhotoViewHeaderProps {
  index?: number;
  imagesLength?: number;
  onClosed: () => void;
  backgroundColor: any;
}

export default function PhotoViewHeader(props: PhotoViewHeaderProps) {
  const { index, imagesLength, onClosed, backgroundColor } = props;
  return (
    <Animated.View style={[styles.backButton, { backgroundColor }]}>
      <IconButton
        type="clear"
        onPress={onClosed}
        iconName={applicationIcons.back}
        padding={applicationDimensions.smallPadding}
        iconColor={applicationColors.primary.white}
        iconSize={applicationDimensions.iconSizeBig}
      />
      {imagesLength && imagesLength > 1 && (
        <Text style={styles.index}>{`${(index || 0) +
          1}/${imagesLength}`}</Text>
      )}
    </Animated.View>
  );
}
