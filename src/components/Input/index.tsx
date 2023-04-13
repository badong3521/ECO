import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { TextInput as RInput } from 'react-native-paper';
import { ValidationRules } from 'react-hook-form';
import Text from '../Text';
import IconButton, { IconButtonTypes } from '../IconButton';
import styles from './style.css';
import {
  applicationColors,
  applicationMaxFontSizeMultiplier,
} from '../../../style.css';
import { IconPackType } from '../Icon';

interface Button {
  iconName: string;
  iconPack?: IconPackType;
  onPress?: () => void;
  type?: IconButtonTypes;
  iconColor?: string;
  padding?: number;
}

interface InputProps {
  value?: string;
  label?: string;
  name?: string; // use for Form
  errorMessage?: 'required' | string; // use for Form
  rules?: ValidationRules; // use for Form
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  mode?: 'outlined' | 'flat';
  flatOutlined?: boolean; // outline for flat mode
  inputRef?: any;
  maxLength?: number;
  onPress?: () => void;
  // If withButtons is set it will display the buttons set in "buttons"
  // in the right corner.
  withButtons?: boolean;
  buttons?: Button[];
  // will display buttons in the left of the input
  leadingButtons?: Button[];

  disabled?: boolean;

  keyboardType?: KeyboardTypeOptions;
  caretHidden?: boolean;
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  onChangeText?: (value: string) => void;
  onSubmitEditing?: () => void;
  returnKeyType?: ReturnKeyTypeOptions;
  editable?: boolean;
  multiline?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  maxFontSizeMultiplier?: number;
  placeholderTextColor?: string;
  styleRow?: ViewStyle;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

// High level button component to force same look throughout app
// Note: Because of a bug with Android we have to do some hacky stuff to
// remove the bottom border. See: https://github.com/callstack/react-native-paper/issues/688
export default function Input(props: InputProps) {
  const {
    value,
    label,
    secureTextEntry,
    errorMessage,
    containerStyle,
    inputStyle,
    inputRef,
    mode,
    flatOutlined,
    onPress,
    caretHidden,
    keyboardType,
    autoFocus,
    onChangeText,
    onSubmitEditing,
    returnKeyType,
    editable,
    maxLength,
    multiline,
    withButtons,
    buttons,
    disabled,
    textAlignVertical,
    leadingButtons,
    maxFontSizeMultiplier,
    placeholderTextColor,
    styleRow,
    autoCapitalize,
  } = props;
  const hasErrorMessage = errorMessage && errorMessage !== 'required';
  const [showPassword, setShowPassword] = useState<boolean>(true);

  function renderButton(button: Button) {
    return (
      <IconButton
        iconName={button.iconName}
        iconPack={button.iconPack}
        iconSize={20}
        type={button.type || 'clear'}
        iconColor={
          button.iconColor ||
          (editable ? styles.buttonIconColor : styles.buttonIconDisabledColor)
        }
        onPress={button.onPress}
        key={button.iconName}
        padding={button.padding || 5}
      />
    );
  }
  return (
    <View style={containerStyle} onTouchStart={onPress}>
      <View style={[styles.row, styleRow]}>
        {leadingButtons &&
          leadingButtons.map((button: Button) => renderButton(button))}
        {mode === 'flat' ? (
          <TextInput
            ref={inputRef}
            value={value}
            secureTextEntry={secureTextEntry && showPassword}
            placeholder={label}
            placeholderTextColor={
              placeholderTextColor || applicationColors.neutral.shade300
            }
            caretHidden={caretHidden}
            textAlignVertical={textAlignVertical}
            keyboardType={keyboardType}
            autoFocus={autoFocus}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize={secureTextEntry ? 'none' : autoCapitalize}
            editable={!disabled && editable}
            maxLength={maxLength}
            multiline={multiline}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
            style={[
              styles.fontStyle,
              styles.input,
              inputStyle,
              flatOutlined && styles.outlinedInput,
              errorMessage && styles.inputError,
              disabled && styles.disabled,
            ]}
          />
        ) : (
          <RInput
            error={!!errorMessage}
            style={[styles.fontStyle, styles.outlinedInput, inputStyle]}
            dense
            caretHidden={caretHidden}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoFocus={autoFocus}
            onChangeText={onChangeText}
            returnKeyType={returnKeyType}
            textAlignVertical={textAlignVertical}
            onSubmitEditing={onSubmitEditing}
            autoCapitalize={secureTextEntry ? 'none' : autoCapitalize}
            editable={editable}
            maxLength={maxLength}
            multiline={multiline}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
            theme={{
              roundness: 5,
              colors: {
                placeholder: applicationColors.neutral.shade300,
                text: applicationColors.neutral.shade900,
                primary: applicationColors.primary.shade500,
                error: applicationColors.semantic.error.shade500,
              },
            }}
          />
        )}
        {secureTextEntry && (
          <View style={styles.rightButtons}>
            <IconButton
              type="clear"
              iconName={showPassword ? 'visibility' : 'visibility-off'}
              iconColor={applicationColors.neutral.shade300}
              iconSize={20}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>
        )}
        {withButtons && (
          <View style={styles.trailingButtons}>
            {buttons!.map((button: Button) => renderButton(button))}
          </View>
        )}
      </View>
      {hasErrorMessage && (
        <Text fontSize="tiny" style={styles.errorMessage}>
          {errorMessage!.length > 0 ? errorMessage! : ''}
        </Text>
      )}
    </View>
  );
}

Input.defaultProps = {
  mode: 'flat',
  placeHolderColor: applicationColors.neutral.shade300,
  primaryColor: applicationColors.primary.shade900,
  textColor: applicationColors.neutral.shade900,
  editable: true,
  maxFontSizeMultiplier: applicationMaxFontSizeMultiplier,
};
