import React from 'react';
import { Animated } from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import styles from './style.css';
import IconButton from '../../../IconButton';
import { applicationColors } from '../../../../../style.css';
import Text from '../../../Text';

interface PropTypes {
  onBackPress: () => void;
  interpolateColor: any;
  interpolateElevation: any;
  interpolateOpacity: any;
  interpolatePaddingTop: any;
  title?: string;
  leftHeaderButtons?: React.ReactNode | React.ReactNode[]; // right icon button or some action
  rightHeaderButtons?: React.ReactNode | React.ReactNode[];
}

// The AppBar contains back button and favorite action for CardScreen
export default function StickyHeader(props: PropTypes) {
  const {
    onBackPress,
    interpolateColor,
    title,
    interpolateElevation,
    interpolateOpacity,
    interpolatePaddingTop,
    leftHeaderButtons,
    rightHeaderButtons,
  } = props;

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: interpolateColor,
            elevation: interpolateElevation,
            paddingTop: getStatusBarHeight(),
            opacity: interpolateOpacity,
          },
        ]}
      >
        <Text style={styles.title} fontSize="large">
          {title || ' '}
        </Text>
      </Animated.View>
      <Animated.View
        style={[styles.backButton, { paddingTop: interpolatePaddingTop }]}
      >
        {leftHeaderButtons || (
          <IconButton
            iconName="chevron-left"
            iconSize={23}
            iconColor={applicationColors.primary.black}
            type="button"
            onPress={onBackPress}
            padding={0}
          />
        )}
      </Animated.View>
      {rightHeaderButtons && (
        <Animated.View
          style={[styles.trailingButton, { paddingTop: interpolatePaddingTop }]}
        >
          {rightHeaderButtons}
        </Animated.View>
      )}
    </>
  );
}
