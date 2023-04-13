import { LayoutAnimation, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { applicationDimensions } from '../../../style.css';
import SearchBar, { SearchBarProps } from '../SearchBar';

interface SearchBarAnimatedProps extends SearchBarProps {
  expandedWith?: number;
  isExpand?: boolean;
  searchInputRef?: any;
}

// SearchBar can expand and collapse the width
export default function SearchBarAnimating(props: SearchBarAnimatedProps) {
  const {
    expandedWith,
    isExpand,
    searchInputRef,
    onFocusChange,
    style,
    onSubmitEditing,
    hintText,
    leadingIcon,
    text,
    autoFocus,
    onChangeText,
    onClearText,
    hintColor,
    leadingColor,
    leadingSize,
    leadingIconPack,
  } = props;
  const [expanded, setExpanded] = useState<boolean>();

  // animate the component when `isExpand` has changed
  useEffect(() => {
    LayoutAnimation.configureNext(CUSTOM_ANIMATE_SPRING);
    setExpanded(isExpand);
  }, [isExpand]);

  return (
    <View
      style={{
        marginRight: applicationDimensions.defaultPadding,
        width: expanded ? expandedWith : DEFAULT_HEIGHT,
        height: DEFAULT_HEIGHT,
        marginLeft: isExpand ? 0 : DEFAULT_MARGIN_LEFT,
      }}
    >
      <SearchBar
        searchInputRef={searchInputRef}
        onFocusChange={onFocusChange}
        style={style}
        onSubmitEditing={onSubmitEditing}
        hintText={hintText}
        leadingIcon={leadingIcon}
        text={text}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        onClearText={onClearText}
        hintColor={hintColor}
        leadingColor={leadingColor}
        leadingSize={leadingSize}
        leadingIconPack={leadingIconPack}
      />
    </View>
  );
}

const DEFAULT_HEIGHT = 36;
const DEFAULT_MARGIN_LEFT = -30;

// set custom spring animation for expanding the searchBar
const CUSTOM_ANIMATE_SPRING = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 1,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 1,
  },
};
