import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
} from 'react-native';
import React, { ReactNode, useRef, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslation } from 'react-i18next';
import { getStatusBarHeight } from 'utils/statusBar';
import { CardType } from '../../../../components/Card/types';
import styles from './style.css';
import HeaderBackground from './components/HeaderBackground';
import HeaderBar from './components/HeaderBar';
import useStatusBar from '../../../../utils/hooks/useStatusBar';
import CardsList from './components/CardsList';
import DirectoryTabView, {
  TabData,
  TabRoutes,
} from './components/DirectoryTabView';

const SNAP_OFFSET = 100;
export const DEFAULT_BACKGROUND_HEIGHT = getStatusBarHeight() + 110;

interface PropTypes {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  textColor?: string;
  backgroundColor?: string;
  background?: ReactNode;
  backgroundAspectRatio?: number;
  rightHeader?: ReactNode;
  floatingRightHeader?: (color: string | any) => ReactNode;
  cards?: CardType[] | undefined;
  refreshing: boolean;
  onRefresh: () => void;
  loading: boolean;
  onEndReached: () => void;
  headerBackgroundColor?: string; // color of expanded headerBar when scrolling
  fromOffset?: number; // from this position, the headerBar starts to appear
  toOffset?: number; // at this position, the headerBar is appear completely
  showTabViewAt?: number; // at this position, the tabBar will start to show
  tabs?: TabRoutes<TabData>;
  onChangeTab?: (index: number) => void;
  emptyMessage?: string;
  emptySubtitle?: string;
}

let touching = false;

function DirectoryScreenContainer(props: PropTypes) {
  const {
    children,
    title,
    subtitle,
    textColor,
    backgroundColor,
    background,
    backgroundAspectRatio,
    rightHeader,
    floatingRightHeader,
    headerBackgroundColor,
    cards,
    refreshing,
    onRefresh,
    loading,
    onEndReached,
    tabs,
    fromOffset,
    toOffset,
    showTabViewAt,
    onChangeTab,
    emptyMessage,
    emptySubtitle,
  } = props;
  const [currentTab, setCurrentTab] = useState<number>(0);
  const BACKGROUND_HEIGHT = backgroundAspectRatio
    ? Dimensions.get('screen').width / backgroundAspectRatio
    : DEFAULT_BACKGROUND_HEIGHT;
  const i18n = useTranslation();
  const expandAtPosition = toOffset || BACKGROUND_HEIGHT + SNAP_OFFSET;
  const collapsePosition = fromOffset || BACKGROUND_HEIGHT - SNAP_OFFSET;
  const scrollValueRef = useRef(new Animated.Value(0));

  const flatListRef = React.useRef<FlatList>();
  const debounced = useDebouncedCallback(onScrollEnd, 200);

  function scrollToOffset(offset: number) {
    flatListRef?.current?.scrollToOffset({
      offset,
      animated: true,
    });
  }

  function animateToShowHeaderBar() {
    Animated.timing(scrollValueRef.current, {
      duration: 200,
      toValue: expandAtPosition,
    }).start();
  }

  function onScrollEnd(event: NativeScrollEvent) {
    const { contentOffset } = event;
    const scrollDistance =
      event.contentSize.height - Dimensions.get('screen').height; // calculate the distance between height screen and scrollHeight
    // not detect as onScrollEnd event if flatList have any touch and on top
    if (touching || contentOffset.y === 0 || scrollDistance < 0) return;
    if (
      contentOffset.y <= expandAtPosition &&
      contentOffset.y >= collapsePosition
    ) {
      scrollToOffset(expandAtPosition);
    } else if (contentOffset.y < expandAtPosition) {
      // if flatList is shorter than screenHeight, when scroll to bottom, need to animate the headerBar
      if (scrollDistance < contentOffset.y) {
        animateToShowHeaderBar();
        return;
      }
      scrollToOffset(0);
    }
  }

  function onScrollEvent(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset } = event.nativeEvent;
    scrollValueRef.current.setValue(contentOffset.y);
    if (Platform.OS === 'ios') {
      debounced.callback(event.nativeEvent);
    }
  }

  function onTouchStart() {
    touching = true;
  }

  function onTouchEnd() {
    touching = false;
  }

  function renderHeaderBackground(animate?: boolean) {
    return (
      <HeaderBackground
        background={background}
        title={title}
        subtitle={subtitle}
        textColor={textColor}
        height={BACKGROUND_HEIGHT}
        scrollValueRef={animate ? scrollValueRef : undefined}
      />
    );
  }

  function renderListHeader() {
    return (
      <View>
        {Platform.OS === 'android' && renderHeaderBackground(false)}
        {children}
        {tabs && (
          <DirectoryTabView
            currentTab={currentTab}
            tabs={tabs}
            onChangeTab={index => {
              setCurrentTab(index);
              if (onChangeTab) {
                onChangeTab(index);
              }
            }}
          />
        )}
      </View>
    );
  }

  useStatusBar('dark-content');

  return (
    <View style={styles.root}>
      {Platform.OS === 'ios' && renderHeaderBackground(true)}
      <CardsList
        flatListRef={flatListRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        refreshing={refreshing}
        loadingMore={loading}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        onScroll={onScrollEvent}
        onScrollEnd={event => onScrollEnd(event.nativeEvent)}
        backgroundHeight={Platform.OS === 'ios' ? BACKGROUND_HEIGHT : 0}
        i18n={i18n}
        header={renderListHeader()}
        cards={cards || []}
        emptyMessage={emptyMessage}
        emptySubtitle={emptySubtitle}
      />

      <HeaderBar
        textColor={textColor}
        backgroundColor={headerBackgroundColor || backgroundColor}
        backgroundHeight={BACKGROUND_HEIGHT}
        scrollValueRef={scrollValueRef}
        rightHeader={rightHeader}
        floatingRightHeader={floatingRightHeader}
        title={title}
        onPress={() => scrollToOffset(0)}
        fromOffset={fromOffset}
        toOffset={toOffset}
        showTabViewAt={showTabViewAt}
        bottomHeader={
          tabs && (
            <DirectoryTabView
              currentTab={currentTab}
              tabs={tabs}
              onChangeTab={index => {
                setCurrentTab(index);
                if (onChangeTab) {
                  onChangeTab(index);
                }
              }}
            />
          )
        }
      />
    </View>
  );
}

export default withNavigation(DirectoryScreenContainer);
