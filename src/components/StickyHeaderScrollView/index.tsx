import React, { ReactNode, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import { getStatusBarHeight } from 'utils/statusBar';
import StickyHeader from './components/StickyHeader';
import { applicationColors } from '../../../style.css';
import IconButton from '../IconButton';
import Loader from '../Loader';
import { ListRef } from '../../utils/card';

export interface StickyHeaderIconButtonProps {
  icon: string;
  onPress: () => void;
}

export type StickyHeaderButton =
  | StickyHeaderIconButtonProps
  | ReactNode
  | ReactNode[];

interface PropTypes {
  children: ReactNode;
  headerImage?: ReactNode;
  headerImageHeight: number;
  headerImageStyle?: ViewStyle;
  title?: string;
  maxScrollOffset: number;
  onBackPress: () => void;
  paddingTop?: number;
  trailingButton?: React.ReactNode;
  backButton?: React.ReactNode;
  style?: ViewStyle;
  loaderStyle?: ViewStyle;
  buttonInitialColor?: string;
  rightHeaderButtons?: StickyHeaderButton[];
  leftHeaderButtons?: StickyHeaderButton[];
  initialButtonColor?: string;
  scrolledButtonColor?: string;
  initialHeaderColor?: string;
  scrolledHeaderColor?: string;
  listRef?: React.RefObject<ListRef>;
  progressViewOffset?: number;
}

// Use this component when you have a scrollview but want the header to be visible at all time
// similar to header in CardScreen but more abstract
export default function StickyHeaderScrollView(props: PropTypes) {
  const {
    children,
    headerImage,
    headerImageHeight = 300,
    headerImageStyle,
    title,
    maxScrollOffset,
    onBackPress,
    paddingTop = 0,
    style,
    rightHeaderButtons,
    leftHeaderButtons,
    initialButtonColor = applicationColors.primary.white,
    scrolledButtonColor = applicationColors.primary.black,
    initialHeaderColor = 'rgba(255,255,255,0.5)',
    scrolledHeaderColor = applicationColors.primary.white,
    listRef,
    progressViewOffset = getStatusBarHeight(),
    loaderStyle,
  } = props;
  const backgroundHeaderHeight = headerImageHeight + getStatusBarHeight();
  const maxBackgroundScale =
    (backgroundHeaderHeight / Dimensions.get('screen').width) * 5;
  const scrollAnimatedValue = useRef(new Animated.Value(0)); // animated value when scrolling
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function onScrollEvent(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    scrollAnimatedValue.current.setValue(contentOffset.y);
    if (contentOffset.y >= maxScrollOffset) {
      StatusBar.setBarStyle('dark-content');
    } else {
      StatusBar.setBarStyle('light-content');
    }
    if (
      Math.round(contentOffset.y + layoutMeasurement.height) ===
        Math.round(contentSize.height) &&
      listRef &&
      listRef.current
    ) {
      setLoading(true);
      await listRef.current.onEndReached();
      setLoading(false);
    }
  }

  async function onRefreshHandler() {
    if (listRef && listRef.current) {
      setRefreshing(true);
      await listRef.current.onRefresh();
      setRefreshing(false);
    }
  }

  function renderHeaderButtons(
    buttons: StickyHeaderButton[],
    side: 'left' | 'right',
  ) {
    return buttons.map(button => {
      if (Object.prototype.hasOwnProperty.call(button, 'icon')) {
        return (
          <View
            key={Math.random()}
            style={{
              marginLeft: side === 'right' ? 10 : 0,
              marginRight: side === 'left' ? 10 : 0,
            }}
          >
            <IconButton
              type="clear"
              iconPack="feather"
              iconSize={23}
              iconColor={scrollAnimatedValue.current.interpolate({
                inputRange: [0, maxScrollOffset],
                outputRange: [initialButtonColor, scrolledButtonColor],
              })}
              // @ts-ignore
              iconName={button.icon}
              // @ts-ignore
              onPress={button.onPress}
              padding={0}
            />
          </View>
        );
      }
      return button;
    });
  }

  function renderBackgroundHeader() {
    if (!headerImage) return undefined;
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            left: 0,
            right: 0,
            height: backgroundHeaderHeight,
            marginTop: -getStatusBarHeight(),
            transform: [
              {
                translateY: scrollAnimatedValue.current.interpolate({
                  inputRange: [0, backgroundHeaderHeight],
                  outputRange: [0, -backgroundHeaderHeight],
                  extrapolate: 'clamp',
                }),
              },
              {
                scale: scrollAnimatedValue.current.interpolate({
                  inputRange: [-backgroundHeaderHeight, 0],
                  outputRange: [maxBackgroundScale, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
          headerImageStyle,
        ]}
      >
        {headerImage}
      </Animated.View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {Platform.OS === 'ios' && renderBackgroundHeader()}
      <ScrollView
        scrollEventThrottle={16}
        onScroll={onScrollEvent}
        overScrollMode="never"
        refreshControl={
          listRef && (
            <RefreshControl
              progressViewOffset={progressViewOffset}
              refreshing={refreshing}
              onRefresh={onRefreshHandler}
            />
          )
        }
        style={style}
      >
        {Platform.OS === 'android' && (
          <View
            style={{
              height: backgroundHeaderHeight,
              marginTop: -getStatusBarHeight(),
            }}
          >
            {headerImage}
          </View>
        )}
        <View
          style={{
            marginTop:
              Platform.OS === 'ios'
                ? backgroundHeaderHeight - getStatusBarHeight()
                : undefined,
          }}
        >
          {children}
        </View>
        {loading && <Loader style={loaderStyle} />}
      </ScrollView>
      <StickyHeader
        rightHeaderButtons={
          rightHeaderButtons && renderHeaderButtons(rightHeaderButtons, 'right')
        }
        title={title}
        onBackPress={onBackPress}
        leftHeaderButtons={
          leftHeaderButtons && renderHeaderButtons(leftHeaderButtons, 'left')
        }
        interpolateColor={scrollAnimatedValue.current.interpolate({
          inputRange: [0, maxScrollOffset],
          outputRange: [initialHeaderColor, scrolledHeaderColor],
          extrapolate: 'clamp',
        })}
        interpolateElevation={scrollAnimatedValue.current.interpolate({
          inputRange: [0, maxScrollOffset],
          outputRange: [0, 3],
          extrapolate: 'clamp',
        })}
        interpolateOpacity={scrollAnimatedValue.current.interpolate({
          inputRange: [0, maxScrollOffset],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })}
        interpolatePaddingTop={scrollAnimatedValue.current.interpolate({
          inputRange: [0, maxScrollOffset],
          outputRange: [
            getStatusBarHeight() + paddingTop,
            getStatusBarHeight(),
          ],
          extrapolate: 'clamp',
        })}
      />
    </View>
  );
}
