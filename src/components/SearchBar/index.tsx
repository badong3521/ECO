import { TextInput, View, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './style.css';
import { IconPackType } from '../Icon';
import IconButton from '../IconButton';
import {
  applicationColors,
  applicationDimensions,
  applicationIcons,
} from '../../../style.css';

export interface SearchBarProps {
  onFocusChange?: (focus: boolean) => void;
  style?: ViewStyle;
  onSubmitEditing?: (e: string) => void;
  leadingIcon?: string;
  leadingIconPack?: IconPackType;
  leadingSize?: number;
  leadingColor?: string;
  hintText?: string; // Placeholder
  hintColor?: string; // Placeholder color
  text?: string; // Prefilled text
  autoFocus?: boolean;
  onChangeText?: (t: string) => void;
  onClearText?: () => void;
  searchInputRef?: React.RefObject<TextInput>;
}

// Search bar that has an icon that clears input on the right hand side
export default function SearchBar(props: SearchBarProps) {
  const {
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
    searchInputRef,
    leadingColor,
    leadingSize,
    leadingIconPack,
  } = props;
  const [showClearText, setShowClearText] = useState(false);
  const [textValue, setTextValue] = useState(text);

  const onClearPress = () => {
    if (onChangeText) {
      onChangeText('');
    }
    if (onClearText) {
      onClearText();
    }
  };

  // update newest `text` value
  useEffect(() => {
    setTextValue(text);
  }, [text]);

  // handle to show/hide `clearText` button
  useEffect(() => {
    setShowClearText(!!textValue && textValue.length > 0);
  }, [textValue]);

  return (
    <View style={[styles.inputContainer, style]}>
      <IconButton
        iconSize={leadingSize || applicationDimensions.iconSize}
        iconName={leadingIcon!}
        iconColor={leadingColor || applicationColors.primary.shade900}
        iconPack={leadingIconPack || 'material'}
        padding={0}
        onPress={() => {
          searchInputRef?.current?.focus();
        }}
      />
      <TextInput
        ref={searchInputRef}
        style={styles.input}
        placeholder={hintText}
        value={textValue}
        inlineImageLeft={leadingIcon}
        autoFocus={autoFocus}
        returnKeyType="search"
        placeholderTextColor={hintColor}
        onChangeText={e => {
          if (onChangeText) {
            onChangeText(e);
          }
          setTextValue(e);
        }}
        onSubmitEditing={e => {
          if (onSubmitEditing) onSubmitEditing(e.nativeEvent.text.trim());
        }}
        onBlur={() => {
          if (onFocusChange !== undefined) onFocusChange(false);
        }}
        onFocus={() => {
          if (onFocusChange !== undefined) onFocusChange(true);
        }}
      />
      {showClearText && (
        <IconButton
          iconName={applicationIcons.close}
          onPress={onClearPress}
          padding={0}
          iconColor={applicationColors.neutral.shade900}
        />
      )}
    </View>
  );
}

SearchBar.defaultProps = {
  leadingIcon: applicationIcons.search,
  hintColor: applicationColors.neutral.shade300,
  hintText: '',
  searchInputRef: React.createRef<TextInput>(),
};
