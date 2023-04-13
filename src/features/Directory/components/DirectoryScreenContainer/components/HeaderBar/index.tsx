import {
  Animated,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, { ReactNode } from 'react';
import { getStatusBarHeight } from 'utils/statusBar';
import styles, { HEADER_BAR_HEIGHT } from '../../style.css';
import {
  applicationColors,
  applicationIcons,
} from '../../../../../../../style.css';
import IconButton from '../../../../../../components/IconButton';
import Text from '../../../../../../components/Text';
import navigationService from '../../../../../../services/navigationService';

const TAB_BAR_HEIGHT = 50;
interface HeaderBarProps {
  scrollValueRef: React.MutableRefObject<Animated.Value>;
  backgroundHeight: number;
  backgroundColor?: string;
  title?: string;
  textColor?: string;
  rightHeader?: ReactNode;
  floatingRightHeader?: (color: string | any) => ReactNode;
  bottomHeader?: ReactNode;
  fromOffset?: number; // from this position, the header bar will start to shown
  toOffset?: number; // to this position, the header bar will be shown absolutely
  showTabViewAt?: number; // at this position, the tabBar will start to show
  onPress?: () => void;
}

// Contain title and right actions components
export default function HeaderBar(props: HeaderBarProps) {
  const {
    scrollValueRef,
    backgroundColor,
    backgroundHeight,
    title,
    textColor = applicationColors.neutral.shade900,
    rightHeader,
    floatingRightHeader,
    onPress,
    bottomHeader,
    fromOffset = backgroundHeight / 2,
    toOffset = backgroundHeight,
    showTabViewAt,
  } = props;

  const showTabViewAtPosition = showTabViewAt || fromOffset;
  const hideTabViewAtPosition = showTabViewAt
    ? showTabViewAt + TAB_BAR_HEIGHT
    : toOffset;
  const diffClamp =
    Platform.OS === 'android'
      ? Animated.diffClamp(scrollValueRef?.current, 0, TAB_BAR_HEIGHT)
      : Animated.diffClamp(scrollValueRef?.current, -TAB_BAR_HEIGHT, 0);

  function renderBottomBar() {
    return bottomHeader ? (
      <Animated.View
        style={{
          position: Platform.OS === 'ios' ? 'absolute' : undefined,
          top: 0,
          zIndex: Platform.OS === 'android' ? 4 : undefined,
          opacity: scrollValueRef?.current.interpolate({
            inputRange: [showTabViewAtPosition, hideTabViewAtPosition],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }),
          transform: [
            {
              translateY: Animated.multiply(diffClamp, -1),
            },
          ],
        }}
      >
        {bottomHeader}
      </Animated.View>
    ) : (
      undefined
    );
  }

  function renderTitleContainer() {
    return (
      <View
        style={[
          styles.stickHeaderContainer,
          {
            backgroundColor,
          },
        ]}
      >
        {title && (
          <View style={styles.title}>
            <Text>{title}</Text>
          </View>
        )}
        <View style={styles.rightHeader}>{rightHeader}</View>
      </View>
    );
  }
  return (
    <View style={styles.appBar}>
      <Animated.View
        style={[
          {
            height: HEADER_BAR_HEIGHT + getStatusBarHeight(),
            zIndex: Platform.OS === 'android' ? 5 : undefined,
            opacity: scrollValueRef?.current.interpolate({
              inputRange: [fromOffset, toOffset],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: scrollValueRef?.current.interpolate({
                  inputRange: [0, backgroundHeight],
                  outputRange: [0, getStatusBarHeight()],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        {Platform.OS === 'ios' && renderBottomBar()}
        {onPress ? (
          <TouchableWithoutFeedback onPress={onPress}>
            {renderTitleContainer()}
          </TouchableWithoutFeedback>
        ) : (
          renderTitleContainer()
        )}
      </Animated.View>
      <View style={styles.backButton}>
        <IconButton
          type="clear"
          iconSize={24}
          iconName={applicationIcons.back}
          iconPack="feather"
          iconColor={scrollValueRef?.current.interpolate({
            inputRange: [fromOffset, toOffset],
            outputRange: [textColor, applicationColors.neutral.shade900],
            extrapolate: 'clamp',
          })}
          onPress={() => {
            navigationService.back();
          }}
        />
      </View>
      <View style={styles.floatingRightHeader}>
        {floatingRightHeader &&
          floatingRightHeader(
            scrollValueRef?.current.interpolate({
              inputRange: [fromOffset, toOffset],
              outputRange: [textColor, applicationColors.neutral.shade900],
              extrapolate: 'clamp',
            }),
          )}
      </View>
      {Platform.OS === 'android' && renderBottomBar()}
    </View>
  );
}
